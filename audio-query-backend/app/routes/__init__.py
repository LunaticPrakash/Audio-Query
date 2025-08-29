from .transcribe_routes import register_transcribe_routes

def register_routes(app):
    register_transcribe_routes(app)