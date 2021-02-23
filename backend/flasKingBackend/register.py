from flask import Blueprint, request

bp = Blueprint('register', __name__)


@bp.route('/register', methods=['POST'])
def register_user():
    print(f"Got values: {request.json}")
    return {'success': False, "msg": "Keep up the good work :)"}
