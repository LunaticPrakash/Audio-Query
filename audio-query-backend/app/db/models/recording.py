from .. import db
import datetime

class Recording(db.Model):

    __tablename__ = "recordings"

    rec_id = db.Column(db.String, primary_key=True)
    file_name = db.Column(db.String, nullable=False)
    text_content = db.Column(db.String)
    model_name = db.Column(db.String)
    model_size = db.Column(db.String)
    language = db.Column(db.String)
    created_date = db.Column(db.DateTime)

    def __init__(self, rec_id, file_name, text_content, model_name, model_size, language):
        self.rec_id = rec_id
        self.file_name = file_name
        self.text_content = text_content
        self.model_name = model_name
        self.model_size = model_size
        self.language = language
        self.created_date = datetime.datetime.now()



    def to_dict(self):
        return {
            "rec_id": self.rec_id,
            "file_name": self.file_name,
            "text_content": self.text_content,
            "model_name": self.model_name,
            "model_size": self.model_size,
            "language": self.language,
            "created_date": self.created_date.isoformat()
        }