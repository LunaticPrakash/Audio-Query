import os
import hashlib
import whisper
from ..db import db
from ..db.models import Recording
import logging
from sqlalchemy import text
from pydub import AudioSegment


def transcribe_audio_service(audio_files: list, model_name: str, model_size: str, language: str, app):
    with app.app_context():
        base_dir = app.config.get('BASE_DIR', 'app')
        upload_folder = app.config.get('UPLOAD_FOLDER', 'uploads')
        recordings_data = []
        has_new_recording = False
        for file in audio_files:
            source_filename_with_ext = os.path.basename(
                file.filename).replace(' ', '_')
            source_file_hash = calculate_hash(file.stream)
            processed_file_path = None
            existing_rec = Recording.query.filter_by(
                rec_id=source_file_hash).first()
            logging.info(existing_rec)
            logging.info(model_name)
            logging.info(model_size)
            if existing_rec and existing_rec.model_name == model_name and existing_rec.model_size == model_size:
                logging.info(
                    f"Transcription for file '{source_filename_with_ext}' with model '{model_name}-{model_size}' already exists."
                )
            else:
                has_new_recording = True
                dest_file_path = os.path.join(
                    base_dir, upload_folder, f"{source_file_hash}_{source_filename_with_ext}")
                file.save(dest_file_path)
                processed_file_path = preprocess_audio_for_transcription(
                    dest_file_path)
            recordings_data.append({"path": processed_file_path, "hash": source_file_hash,
                                    "name": source_filename_with_ext, "existing_rec":  existing_rec})

        if has_new_recording:
            model = whisper if model_name == "whisper" else None
            model = model.load_model(model_size)
            logging.info(f"Successfully loaded the whisper-{model_size} model")

            for rec in recordings_data:
                if not rec['existing_rec']:
                    rec['text_content'] = transcribe_audio_with_whisper(
                        rec['path'], model, language, app)
                    rec['model_name'] = model_name
                    rec['model_size'] = model_size
                    rec['language'] = language

        return upsert_recording(recordings_data)


def calculate_hash(file_data):
    sha256 = hashlib.sha256()
    file_data.seek(0)
    while chunk := file_data.read(4096):
        sha256.update(chunk)
    file_data.seek(0)
    return sha256.hexdigest()


def preprocess_audio_for_transcription(audio_file_path):
    logging.info(f"Started pre-processing of {audio_file_path}")
    audio = AudioSegment.from_file(audio_file_path)
    audio = audio.set_channels(1).set_frame_rate(16000)

    preprocessed_file_path = f"{audio_file_path}.wav"
    audio.export(preprocessed_file_path, format="wav")
    logging.info("Completed pre-processing successfully")
    return preprocessed_file_path


def upsert_recording(data: list):
    records_to_return = {'new_recording':[], 'existing_recording':[]}
    for d in data:
        existing_rec = d.get('existing_rec')        
        if existing_rec:
            logging.info(f"upsert_recording > if exi")
            records_to_return['existing_recording'].append(existing_rec.to_dict())
        else:
            logging.info(f"upsert_recording > else exi")
            new_recording = Recording(
                d.get('hash'),
                d.get('name'),
                d.get('text_content'),
                d.get('model_name'),
                d.get('model_size'),
                d.get('language')
            )
            db.session.add(new_recording)
            records_to_return['new_recording'].append(new_recording.to_dict())
    db.session.commit()
    logging.info(records_to_return)
    return records_to_return


def transcribe_audio_with_whisper(audio_file_path: str, model: whisper, language: str, app):
    logging.info(f"Transcription started for {audio_file_path}")
    result = model.transcribe(audio_file_path, language=language)
    logging.info(f"Transcription completed successfully")
    return result["text"]


def search_recordings(query: str):
    query_pattern = f"%{query}%"
    recordings = Recording.query.filter(
        Recording.text_content.like(query_pattern)).limit(3).all()
    results = [
        {
            "rec_id": rec.rec_id,
            "file_name": rec.file_name,
            "text_content": rec.text_content,
            "model_name": rec.model_name,
            "model_size": rec.model_size,
            "language": rec.language,
            "created_date": rec.created_date.isoformat()
        }
        for rec in recordings
    ]
    return results


def list_all_recordings():
    recordings = Recording.query.order_by(text('created_date DESC')).all()
    results = [
        {
            "rec_id": rec.rec_id,
            "file_name": rec.file_name,
            "text_content": rec.text_content,
            "model_name": rec.model_name,
            "model_size": rec.model_size,
            "language": rec.language,
            "created_date": rec.created_date.isoformat()
        }
        for rec in recordings
    ]
    return results


def delete_recording_by_id(rec_id):
    recording = db.get_or_404(Recording, rec_id)
    db.session.delete(recording)
    db.session.commit()
    return True
