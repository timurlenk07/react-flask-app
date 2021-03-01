import flask_praetorian
from bson import ObjectId
from flask import current_app

from flasKingBackend.db import get_db_client, get_db

guard = flask_praetorian.Praetorian()


class User:
    def __init__(self, properties: dict = None):
        self.properties = properties if properties else {
            "_id": 0,
            "roles": 'admin',
            "password": "0",
            "email": 'a@a.a'
        }

    @property
    def rolenames(self):
        try:
            return self.properties['roles'].split(',')
        except Exception:
            return []

    @property
    def identity(self):
        return str(self.properties['_id'])

    @property
    def password(self):
        return self.properties['password']

    @classmethod
    def lookup(cls, username):
        user = get_db_client().users.admins.find_one({
            u'email': username
        })
        return cls(user) if user else None

    @classmethod
    def identify(cls, id):
        user = get_db_client().users.admins.find_one({
            u'_id': ObjectId(id)
        })
        return cls(user) if user else None


def add_admin(app):
    from os import environ
    email = environ.get('DEFAULT_ADMIN_EMAIL')
    psw = environ.get('DEFAULT_ADMIN_PSW')
    if email and psw:
        with app.app_context():
            res = get_db().users.admins.update_one({
                "email": email,
            }, {
                "$set": {
                    "email": email,
                    "password": guard.hash_password(psw),
                    "roles": 'admin'
                }
            }, upsert=True)
            current_app.logger.debug(f"Adding admin user successful: {res.modified_count > 0}.")
    else:
        app.logger.info("Adding admin user failed.")
        app.logger.debug("DEFAULT_ADMIN_EMAIL and DEFAULT_ADMIN_PSW must be defined as environment variables!")


def init_app(app):
    guard.init_app(app, user_class=User)
    add_admin(app)
