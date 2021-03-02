import flask_praetorian
from flask import Blueprint, current_app

from flasKingBackend.db import get_db_client

bp = Blueprint('adminOps', __name__, url_prefix='/admin')


@bp.route('/api/getAuthorizedUsers', methods=['GET'])
@flask_praetorian.auth_required
def getAuthorizedUsers():
    db = get_db_client()
    admins = list(db.users.admins.find({}, {"_id": 0, "password": 0}))
    current_app.logger.debug(f"found admins: {len(admins)}")
    current_app.logger.debug(f"type of admins: {type(admins[0])}")
    current_app.logger.debug(f"admins: {admins}")
    return {"admins": admins}
