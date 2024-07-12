from flask import Flask, request, jsonify
import os
import sqlite3
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL", "database.db")

def get_db_connection():
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

def validate_menu_item(data):
    if 'name' not in data or 'price' not in data:
        return 'Missing name or price in request data.', False
    try:
        price = float(data['price'])
        if price < 0:
            return 'Price must be a positive number.', False
    except ValueError:
        return 'Price must be a valid number.', False
    
    return '', True

def validate_reservation(data):
    if 'name' not in data or 'datetime' not in data:
        return 'Missing name or datetime in request data.', False
    return '', True

def validate_order(data):
    if 'menu_id' not in data or 'quantity' not in data:
        return 'Missing menu_id or quantity in request data.', False
    try:
        quantity = int(data['quantity'])
        if quantity <= 0:
            return 'Quantity must be a positive integer.', False
    except ValueError:
        return 'Quantity must be a valid integer.', False
        
    return '', True

@app.route('/menu', methods=['GET', 'POST'])
def menu_items():
    if request.method == 'POST':
        data = request.json
        error_message, valid = validate_menu_item(data)
        if not valid:
            return jsonify({'error': error_message}), 400
        
        try:
            conn = get_db_connection()
            conn.execute('INSERT INTO menu (name, price) VALUES (?, ?)',
                         (data['name'], data['price']))
            conn.commit()
        except sqlite3.DatabaseError as e:
            conn.rollback()
            return jsonify({'error': str(e)}), 500
        finally:
            conn.close()
        
        return jsonify({"success": True}), 201
    else:
        conn = get_db_connection()
        items = conn.execute('SELECT * FROM menu').fetchall()
        conn.close()
        return jsonify([{"id": x["id"], "name": x["name"], "price": x["price"]} for x in items])

@app.route('/reservations', methods=['GET', 'POST'])
def reservations():
    if request.method == 'POST':
        data = request.json
        error_message, valid = validate_reservation(data)
        if not valid:
            return jsonify({'error': error_message}), 400
        
        try:
            conn = get_db_connection()
            conn.execute('INSERT INTO reservations (name, datetime) VALUES (?, ?)',
                         (data['name'], data['datetime']))
            conn.commit()
        except sqlite3.DatabaseError as e:
            conn.rollback()
            return jsonify({'error': str(e)}), 500
        finally:
            conn.close()
        
        return jsonify({"success": True}), 201
    else:
        conn = get_db_connection()
        reservations = conn.execute('SELECT * FROM reservations').fetchall()
        conn.close()
        return jsonify([{"id": x["id"], "name": x["name"], "datetime": x["datetime"]} for x in reservations])

@app.route('/orders', methods=['GET', 'POST'])
def orders():
    if request.method == 'POST':
        data = request.json
        error_message, valid = validate_order(data)
        if not valid:
            return jsonify({'error': error_message}), 400
        
        try:
            conn = get_db_connection()
            conn.execute('INSERT INTO orders (menu_id, quantity, status) VALUES (?, ?, ?)',
                         (data['menu_id'], data['quantity'], 'pending'))
            conn.commit()
        except sqlite3.DatabaseError as e:
            conn.rollback()
            return jsonify({'error': str(e)}), 500
        finally:
            conn.close()
        
        return jsonify({"success": True}), 201
    else:
        conn = get_db_connection()
        orders = conn.execute('SELECT * FROM orders').fetchall()
        conn.close()
        return jsonify([{"id": x["id"], "menu_id": x["menu_id"], "quantity": x["quantity"], "x["status"]} for x in orders])

if __name__ == '__main__':
    app.run(debug=True)