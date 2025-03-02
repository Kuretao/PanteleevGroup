from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
from bson.errors import InvalidId

app = FastAPI()

client = AsyncIOMotorClient('mongodb://localhost:27017')
db = client.Pipes
collection = db.orders_test

class Order(BaseModel):
    _id: str
    ownerId: str

@app.get('/orders/{user_id}')
async def get_user_orders(user_id: str):
    try:
        object_id = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="invalid id")

    cursor = collection.find({'ownerId': object_id})
    orders = []
    async for doc in cursor:
        order = Order(_id=str(doc['_id']), ownerId=str(doc['ownerId']))
        orders.append(order.dict())

    return {'orders': orders}
