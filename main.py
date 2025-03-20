import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from users import user_router
from orders import order_router

app = FastAPI()

app.include_router(user_router, prefix="/users")
app.include_router(order_router, prefix="/orders")

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)