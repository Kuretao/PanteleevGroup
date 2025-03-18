import uvicorn
from fastapi import FastAPI
from users import user_router
from orders import order_router

app = FastAPI()

app.include_router(user_router, prefix="/users")
app.include_router(order_router, prefix="/orders")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)