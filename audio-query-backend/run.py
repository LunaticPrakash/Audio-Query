from app import create_app
import logging
import os

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%d-%b-%Y %H:%M:%S'
)

if __name__ == "__main__":
    app = create_app()

    BASE_DIR = app.config.get('BASE_DIR', 'app')
    UPLOAD_FOLDER = app.config.get('UPLOAD_FOLDER', 'uploads')
    os.makedirs(os.path.join(BASE_DIR, UPLOAD_FOLDER),  exist_ok=True)

    logging.info("Flask app starting on port 5000")
    app.run(host='0.0.0.0', port=5000)