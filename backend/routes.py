from flask import Flask, request, jsonify
from controllers import fetchMenuItems, createReservation, submitOrder
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

menu_item_reviews = {}

@app.route('/menu-items', methods=['GET'])
def get_menu_items():
    return fetchMenuItems()

@app.route('/reservations', methods=['POST'])
def create_reservation():
    reservation_details = request.json
    return createReservation(reservation_details)

@app.route('/orders', methods=['POST'])
def submit_order():
    order_details = request.json
    return submitOrder(order_details)

@app.route('/menu-items/reviews', methods=['GET', 'POST'])
def handle_menu_item_reviews():
    if request.method == 'POST':
        review_data = request.json
        menu_item_id = review_data.get('item_id')
        user_review_text = review_data.get('review')
        
        if not menu_item_id or not user_review_text:
            return jsonify({'error': 'Missing item_id or review text'}), 400

        if menu_item_id not in menu_item_reviews:
            menu_item_reviews[menu_item_id] = []
        menu_item_reviews[menu_item_id].append(user_review_text)
        return jsonify({'message': 'Review added successfully'}), 201
        
    elif request.method == 'GET':
        menu_item_id = request.args.get('item_id')
        if menu_item_id and menu_item_id in menu_item_array:
            return jsonify(menu_item_reviews[menu_item_id])
        elif menu_item_id:
            return jsonify([]) 
        return jsonify(menu_item_reviews)  

if __name__ == '__main__':
    app.run(host=os.getenv('HOST', '127.0.0.1'), port=int(os.getenv('PORT', 5000)))