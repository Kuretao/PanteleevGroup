from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('mongodb://localhost:27017')
db = client['Pipes']
collection = db['orders_test']


@app.route('/save', methods=['POST'])
def save_ttn():
    if request.method == 'POST':
        data = request.get_json()

        try:
            result = collection.insert_one(data)
            return jsonify({
                'message': 'ok',
                '_id': str(result.inserted_id)
            }), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500


@app.route('/get', methods=['GET'])
def get_ttn():
    documents = []
    for obj in collection.find():
        obj['_id'] = str(obj['_id'])
        documents.append(obj)

    return jsonify({'documents': documents})


if __name__ == '__main__':
    app.run(debug=True)
