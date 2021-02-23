import time

from flask import Blueprint

bp = Blueprint('demos', __name__)


@bp.route('/time', methods=['GET'])
def get_current_time():
    return {'time': time.time()}
