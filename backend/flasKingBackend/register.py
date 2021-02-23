from flask import Blueprint, request
from marshmallow import Schema, fields, validate
from pymongo.errors import WriteError
from webargs.flaskparser import use_kwargs

from flasKingBackend.db import get_db_client

bp = Blueprint('register', __name__)


class CreateRegistrationSchema(Schema):
    registrationType = fields.String(required=True, validate=validate.OneOf(['magánszemély', 'cég']))
    fullName = fields.String(required=True)
    email = fields.String(required=True, validate=validate.Email())
    address = fields.String(required=True)
    phone = fields.Number(required=True)
    password = fields.String(required=True, validate=validate.Length(min=8))
    birthDate = fields.DateTime(required=True)
    terms = fields.Boolean(required=True, validate=validate.Equal(True))


# TODO: DEBUG only
@bp.before_request
def log_post_body():
    if request.method == 'POST':
        print(f"Got POST body: {request.json}")


@bp.route('/register', methods=['POST'])
@use_kwargs(CreateRegistrationSchema())
def register_user(**kwargs):
    try:
        client = get_db_client()
        registrations = client.users.registrations
        reg_id = registrations.insert_one(kwargs).inserted_id
        print(f"ID of inserted object: {reg_id}")
        return {'success': True}
    except WriteError as err:
        return {'success': False, 'msg': err}


@bp.errorhandler(422)
def validation_error(err):
    """Handles 422 errors"""
    print(err.data)
    return err.data.get('messages').get('json')
