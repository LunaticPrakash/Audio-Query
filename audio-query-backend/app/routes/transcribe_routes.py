from app.services.transcribe_services import transcribe_audio_service, search_recordings, list_all_recordings, delete_recording_by_id
from flask import request, jsonify, send_from_directory
import logging
import os

def register_transcribe_routes(app):
    
    BASE_DIR = app.config.get('BASE_DIR', 'app')
    UPLOAD_FOLDER = app.config.get('UPLOAD_FOLDER', 'uploads')

    @app.route(rule="/status", methods=["GET"])
    def status():
        logging.info("Backend is live")
        return {"message":"Live"}, 200

    @app.route(rule="/transcribe-audio", methods=["POST"])
    def transcribe_audio():
        files = request.files.getlist('files')
        model_name = request.form.get('model_name', 'whisper')
        model_size = request.form.get('model_size', 'tiny')
        language = request.form.get('language', 'en')

        try:
            transcription_results = transcribe_audio_service(files, model_name, model_size, language, app)
            transcribed_files = transcription_results["new_recording"]
            existing_files = transcription_results["existing_recording"]

            message = ""
            if transcribed_files  and existing_files:
                message = f"Successfully transcribed {len(transcribed_files)} file(s). {len(existing_files)} file(s) already existed."
            elif transcribed_files:
                message = f"Successfully transcribed {len(transcribed_files)} file(s)."
            elif existing_files:
                message = f"All {len(existing_files)} file(s) already existed."
            else:
                message = "No files were processed."

            return jsonify({
                "message": message,
                "results": {
                    "transcribed": transcribed_files,
                    "existing": existing_files
                }
            }), 200
                
        except Exception as e:
            logging.error(f"Transcription failed: {str(e)}")
            return jsonify({"error": str(e)}), 500

    @app.route(rule="/search-audio", methods=["GET"])
    def search_audio():
        query = request.args.get('q', '').strip()
        if not query:
            return jsonify([]), 200

        try:
            results = search_recordings(query=query)
            return jsonify(results), 200
        except Exception as e:
            logging.error(f"Search failed: {str(e)}")
            return jsonify({"error": "Search failed."}), 500

    @app.route(rule="/list-all-recordings", methods=["GET"])
    def list_all():
        try:
            recordings = list_all_recordings()
            return jsonify(recordings), 200
        except Exception as e:
            logging.error(f"Failed to list all recordings: {str(e)}")
            return jsonify({"error": "Failed to list recordings."}), 500

    @app.route('/uploads/<filename>')
    def serve_audio(filename):
        filename = filename.replace(" ", "_")
        folder_path = os.path.join(app.root_path, UPLOAD_FOLDER)
        print("folder - ", folder_path , "file - ",filename)
        return send_from_directory(folder_path, filename)

    @app.route(rule="/delete-recording/<rec_id>", methods=["DELETE"])
    def delete_recording(rec_id):
        try:
            is_deleted = delete_recording_by_id(rec_id)
            if is_deleted:
                return jsonify({"message": f"Successfully deleted recording"}), 200
        except Exception as e:
            logging.error(f"Failed to delete recording: {str(e)}")
            return jsonify({"error": "Failed to delete recording."}), 500