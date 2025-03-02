from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

client = AsyncIOMotorClient('mongodb://localhost:27017')
db = client.Pipes
collection = db.orders_test

class Order(BaseModel):
    _id: str
    ownerId: str


@app.post('/save')
async def save_ttn(request: Request):
    data = await request.json()
    # отдать на фронт?
    user_id = request.headers.get('X-User-ID')

    if not user_id:
        raise HTTPException(status_code=400, detail="user id is required")

    data['ownerId'] = user_id

    try:
        result = await collection.insert_one(data)
        return {
            'message': 'Заказ создан',
            '_id': str(result.inserted_id),
            'ownerId': user_id
        }, 201
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get('/get')
async def get_ttn():
    cursor = collection.find({})
    orders = []
    async for doc in cursor:
        order = Order(_id=str(doc['_id']), ownerId=str(doc['ownerId']))
        orders.append(order.model_dump())

    return {'documents': orders}
