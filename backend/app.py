import time
from flask import Flask, request

app = Flask(__name__)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/register', methods=['POST'])
def register_user():
    print(f"Got values: {request.json}")
    return {'success': False, "msg": "Keep up the good work :)"}
