from flask import Flask, request, jsonify
import jwt
from datetime import datetime
from flask_pymongo import PyMongo
# from bson.objectid import ObjectId

app = Flask(__name__)
app.config['SECRET_KEY'] = ''
app.config["MONGO_URL"] = "mongodb://localhost:27017/"
mongo = PyMongo(app)
mongo.db = mongo.cx['Pipes']

def gen_jwt_token(user_id):
    payload = {
        'iat': datetime.utcnow(),
        'sub': user_id
    }
    # encode - добавить модулем
    return jwt.encode(payload, app.config.get('SECRET_KEY'), algorithm='HS256')


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    existing_user = mongo.db.users_collection.find_one({"username": username, "password": password})
    if not existing_user:
        return jsonify({'error': 'Invalid cred'}), 401

    token = gen_jwt_token(existing_user['_id'])

    return jsonify({'token': token}), 200


# убрать все страницы после логина на фронте в протектед
@app.route('/protected', methods=['GET'])
def protected():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Token is missing'}), 401

    try:
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, app.config.get('SECRET_KEY'), algorithms=['HS256'])
        return jsonify({'message': {payload["sub"]}}), 200

    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

