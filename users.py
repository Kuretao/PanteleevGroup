from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from typing import Optional
from passlib.context import CryptContext
from fastapi.encoders import jsonable_encoder
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

crypt_context = CryptContext(schemes=["bcrypt"])

client = AsyncIOMotorClient('mongodb://localhost:27017')
db = client.Pipes
users_collection = db.users_test

class User(BaseModel):
    firstName: str
    lastName: str
    username: str
    password: str
    orders: Optional[list] = []

class UserInDB(User):
    hashed_password: str


def hash_password(password: str):
    return crypt_context.hash(password)

@app.post('/register')
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
        result = await users_collection.insert_one(jsonable_encoder(user_data))
        return {'message': 'пользователь создан', 'User': str(result.inserted_id)}, 201
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
