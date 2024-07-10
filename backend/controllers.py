from flask import Flask, request, jsonify
import os
import sqlite3

app = Flask(__name__)

from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL", "database.db")

def get_db_connection():
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/menu', methods=['GET', 'POST'])
def menu_items():
    if request.method == 'POST':
        data = request.json
        conn = get_db_connection()
        conn.execute('INSERT INTO menu (name, price) VALUES (?, ?)',
                     (data['name'], data['price']))
        conn.commit()
        conn.close()
        return jsonify({"success": True}), 201
    else:
        conn = get_db_connection()
        items = conn.execute('SELECT * FROM menu').fetchall()
        return jsonify([{"id": x["id"], "name": x["name"], "price": x["price"]} for x in items])

@app.route('/reservations', methods=['GET', 'POST'])
def reservations():
    if request.method == 'POST':
        data = request.json
        conn = get_db_connection()
        conn.execute('INSERT INTO reservations (name, datetime) VALUES (?, ?)',
                     (data['name'], data['datetime']))
        conn.commit()
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
        conn = get_db_connection()
        conn.execute('INSERT INTO orders (menu_id, quantity, status) VALUES (?, ?, ?)',
                     (data['menu_id'], data['quantity'], 'pending'))
        conn.commit()
        conn.close()
        return jsonify({"success": True}), 201
    else:
        conn = get_db_connection()
        orders = conn.execute('SELECT * FROM orders').fetchall()
        conn.close()
        return jsonify([{"id": x["id"], "menu_id": x["menu_id"], "quantity": x["quantity"], "status": x["status"]} for x in orders])

if __name__ == '__main__':
    app.run(debug=True)