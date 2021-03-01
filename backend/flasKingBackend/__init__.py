from flask import Flask


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # TODO: delete later
    from . import demos
    app.register_blueprint(demos.bp)

    from . import db
    db.init_app(app)

    from . import auth
    auth.init_app(app)
    app.register_blueprint(auth.bp)

    from . import register
    app.register_blueprint(register.bp)

    return app
