from flask import Flask, request, jsonify
from controllers import getMenuItems, makeReservation, placeOrder
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

reviews = {}

@app.route('/menu-items', methods=['GET'])
def get_menu_items():
    return getMenuItems()

@app.route('/reservations', methods=['POST'])
def make_a_reservation():
    data = request.json
    return makeReservation(data)

@app.route('/orders', methods=['POST'])
def place_an_order():
    order_data = request.json
    return placeOrder(order_data)

@app.route('/menu-items/reviews', methods=['GET', 'POST'])
def menu_item_reviews():
    if request.method == 'POST':
        review = request.json
        item_id = review.get('item_id')
        user_review = review.get('review')
        
        if not item_id or not user_review:
            return jsonify({'error': 'Missing item_id or review'}), 400

        if item_id not in reviews:
            reviews[item_id] = []
        reviews[item_id].append(user_review)
        return jsonify({'message': 'Review added successfully'}), 201
        
    elif request.method == 'GET':
        item_id = request.args.get('item_id')
        if item_id and item_id in reviews:
            return jsonify(reviews[item_id])
        elif item_id:
            return jsonify([]) 
        return jsonify(reviews)  

if __name__ == '__main__':
    app.run(host=os.getenv('HOST', '127.0.0.1'), port=int(os.getenv('PORT', 5000)))