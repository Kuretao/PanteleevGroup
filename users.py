import uvicorn
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorClient
import jwt
from datetime import timedelta, datetime
from uuid import uuid4




user_router = APIRouter()

crypt_context = CryptContext(schemes=["bcrypt"])

client = AsyncIOMotorClient('mongodb://localhost:27017')
db = client.testing
users_collection = db.users_test


class User(BaseModel):
    firstName: str
    lastName: str
    username: str
    password: str
    orders: Optional[list] = []

class OrderInput(BaseModel):
    inn: str
    contact_person: str
    email: str
    phone_number: str
    order: dict

class OrderInDB(OrderInput):
    id: str = Field(default_factory=lambda: str(uuid4()))


class UserInDB(BaseModel):
    firstName: str
    lastName: str
    username: str
    hashed_password: str = Field(..., min_length=None)
    orders: Optional[list[OrderInDB]] = None

def hash_password(password: str):
    return crypt_context.hash(password)

def verify_password(plain_password, hashed_password):
    return crypt_context.verify(plain_password, hashed_password)

async def get_user(username: str):
    raw_user = await users_collection.find_one({"username": username})
    if raw_user:
        user_dict = {key: value for key, value in raw_user.items() if key != "_id"}
        return UserInDB(**user_dict)
    return None

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, "SECRET_KEY", algorithm="HS256")
    return encoded_jwt


@user_router.post('/register')
async def register_user(request: Request):
    data = await request.json()

    first_name = data.get('firstName')
    last_name = data.get('lastName')
    username = data.get('username')
    password = data.get('password')

    if not all([first_name, last_name, username, password]):
        raise HTTPException(status_code=400, detail='заполните все поля')

    if await users_collection.find_one({'username': username}):
        raise HTTPException(status_code=409, detail='имя пользователя уже занято')

    hashed_password = hash_password(password)

    user_data = {
        'firstName': first_name,
        'lastName': last_name,
        'username': username,
        'hashed_password': hashed_password,
        'orders': [],
    }

    try:
        result = await users_collection.insert_one(user_data)
        return {'message': 'пользователь создан', 'User': str(result.inserted_id), 'username': username}, 201
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@user_router.post('/login')
async def login(request: Request):
    data = await request.json()

    username = data.get('username')
    password = data.get('password')

    if not all([username, password]):
        raise HTTPException(status_code=400, detail='укажите имя пользователя и пароль')

    user = await get_user(username)

    if not user:
        raise HTTPException(status_code=404, detail='пользователь не найден')

    if not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail='неверный пароль')

    access_token = create_access_token(data={'sub': username})

    return {'access_token': access_token, 'token_type': 'bearer'}

@user_router.post('/init')
async def create_db_and_collection():
    db = client['testing']
    users_collection = db['users_test']
    try:
        await users_collection.create_index('username', unique=True)
        return {'message': 'ok'}, 201
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@user_router.post('/easycode')
async def drop_db():
    try:
        await client.drop_database('testing')
        return {'message': 'ok'}, 200
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))