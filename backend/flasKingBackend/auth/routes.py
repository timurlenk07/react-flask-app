import flask_praetorian
from flask import Blueprint, request, current_app

from .auth import guard

bp = Blueprint('auth', __name__, url_prefix='/admin')


@bp.route('/login', methods=['POST'])
def login():
    req = request.get_json(force=True)
    email = req.get('email', None)
    password = req.get('password', None)
    current_app.logger.debug(f"email: {email}, psw: {password}")
    user = guard.authenticate(email, password)
    current_app.logger.debug(f"hashed psw: {guard.hash_password(password)}")
    ret = {'access_token': guard.encode_jwt_token(user)}
    return ret, 200


@bp.route('/refresh', methods=['POST'])
def refresh():
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200


@bp.route('/api/whoAmI')
@flask_praetorian.auth_required
def protected():
    return {
        "email": flask_praetorian.current_user().properties["email"],
        "roles": flask_praetorian.current_user().rolenames
    }
