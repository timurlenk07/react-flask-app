from flask import Blueprint, request, current_app

from flasKingBackend.db import get_db_client

bp = Blueprint('register', __name__)


@bp.route('/register', methods=['POST'])
def register_user():
    print(f"Got values: {request.json}")

    client = get_db_client()
    registrations = client.users.registrations
    reg_id = registrations.insert_one(request.json).inserted_id
    print(f"ID of inserted object: {reg_id}")

    return {'success': False, "msg": "Keep up the good work :)"}
