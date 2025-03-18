import uvicorn
from fastapi import FastAPI, APIRouter, Depends, Body, HTTPException
from starlette.status import HTTP_200_OK, HTTP_403_FORBIDDEN, HTTP_404_NOT_FOUND
from users import UserInDB, users_collection, get_user
from pydantic import BaseModel, Field
from uuid import uuid4

order_router = APIRouter()

class OrderResponse(BaseModel):
    id: str
    inn: str
    contact_person: str
    email: str
    phone_number: str
    order: dict

class OrderInput(BaseModel):
    inn: str
    contact_person: str
    email: str
    phone_number: str
    order: dict

class OrderInDB(OrderInput):
    id: str = Field(default_factory=lambda: str(uuid4()))


@order_router.get("/{username}/{order_id}", response_model=OrderResponse, status_code=HTTP_200_OK)
async def get_order_by_id(username: str, order_id: str):

    user = await get_user(username)

    if not user:
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail=f"{username} not found.")

    order = next((order for order in user.orders if order.id == order_id), None)

    if not order:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail=f"order '{order_id}' not found. Богдан привет xD")

    return order

@order_router.post("/{username}", response_model=OrderInDB, status_code=HTTP_200_OK)
async def create_order(username: str, order_input: OrderInput):

    current_user = await get_user(username)

    if not current_user:
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail=f"{username}' not found.")
    #пошел ты нафиг со своим деприкейтед, я дед
    order_in_db = OrderInDB(**order_input.dict(), id=str(uuid4()))

    updated_result = await users_collection.update_one(
        {"username": username},
        {"$push": {"orders": order_in_db.dict(exclude_unset=True)}}
    )

    if updated_result.modified_count == 0:
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail=f"failed to update '{username}'.")

    return order_in_db

@order_router.get("/{username}", response_model=list[OrderResponse], status_code=HTTP_200_OK)
async def get_orders(username: str):
    user = await get_user(username)

    if not user:
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail=f"{username} not found.")

    return user.orders