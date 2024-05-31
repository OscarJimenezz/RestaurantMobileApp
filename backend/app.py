from flask import Flask
import os
from dotenv import load_dotenv
from routes import *

load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return home_route()

if __name__ == '__main__':
    app.run(port=int(os.getenv('PORT', 5000)))