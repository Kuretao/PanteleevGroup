from flask import Flask, request, jsonify
import bcrypt
from pymongo import MongoClient
# from bson.objectid import ObjectId

app = Flask(__name__)


mongo_client = MongoClient('mongodb://localhost:27017')
db = mongo_client['Pipes']
users_collection = db['users_test']

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    first_name = data.get('firstName')
    last_name = data.get('lastName')
    username = data.get('username')
    password = data.get('password')

    if not all([first_name, last_name, username, password]):
        return jsonify({'error': 'заполните все поля'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    user_data = {
        'firstName': first_name,
        'lastName': last_name,
        'username': username,
        'password': hashed_password,
        'orders': []
    }

    try:
        result = users_collection.insert_one(user_data)
        return jsonify({'message': 'User created', 'User': str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
