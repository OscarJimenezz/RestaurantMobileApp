from flask import Flask, request
from controllers import getMenuItems, makeReservation, placeOrder
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(host=os.getenv('HOST', '127.0.0.1'), port=int(os.getenv('PORT', 5000)))