from flask import Flask
import os
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)
@app.route('/')
def hello_world():
    return 'Hello, World!'
from routes import *
if __name__ == '__main__':
    app.run(port=os.getenv('PORT', 5000))