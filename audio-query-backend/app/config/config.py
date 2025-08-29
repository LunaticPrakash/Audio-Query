class Config:
    BASE_DIR = "app"
    UPLOAD_FOLDER = 'uploads'
    
    # Database
    SQLALCHEMY_DATABASE_URI = "sqlite:///audio_query_db.sqlite3"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
