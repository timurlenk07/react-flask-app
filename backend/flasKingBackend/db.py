from urllib.parse import quote

from flask import current_app, g
from pymongo import MongoClient


def get_db(default_db_name: str = 'db'):
    return MongoClient("mongodb+srv://" +
                       quote(current_app.config['DB_USER']) +
                       ":" +
                       quote(current_app.config['DB_PASSWORD']) +
                       "@cluster0.1plba.mongodb.net/" +
                       quote(default_db_name) +
                       "?retryWrites=true&w=majority")


def get_db_client():
    if 'client' not in g:
        g.client = get_db()

    return g.client


def close_db_client(e=None):
    client = g.pop('client', None)

    if client is not None:
        client.close()


def init_app(app):
    app.teardown_appcontext(close_db_client)
