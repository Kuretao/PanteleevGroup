from bson.errors import InvalidId
from flask import Flask, jsonify
from pymongo import MongoClient
# from bson.objectid import ObjectId

app = Flask(__name__)

mongo_client = MongoClient('mongodb://localhost:27017')
db = mongo_client['Pipes']
collection = db['orders_test']


@app.route('/orders/<user_id>', methods=['GET'])
def get_user_orders(user_id):
    from bson.objectid import ObjectId
    try:
        user_id = ObjectId(user_id)
    except InvalidId:
        return jsonify({'error': 'Invalid User ID'}), 400

    orders = list(collection.find({'ownerId': user_id}))

    for order in orders:
        order['_id'] = str(order['_id'])

    return jsonify({'orders': orders}), 200


if __name__ == '__main__':
    app.run(debug=True)