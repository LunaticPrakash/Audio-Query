from flask import Flask
from .config import Config
from .db import db
from .db.models import *
from flask_migrate import Migrate
from .routes import register_routes
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)
    migrate = Migrate(app,db)
    register_routes(app)
    return app