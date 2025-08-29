# AudioQuery

A full-stack application that allows users to **upload audio files** (like call recordings, meetings, or lectures) and **search for keywords or phrases** within them.The matching audio files will be displayed to user which he can directly listen or read the transcribed text. 

The app automatically transcribes audio into text using **OpenAI Whisper** and stores it into database for quick, future searches to avoid duplicate processing.

---

## Status:
**Deployed**

---

## Technologies Used:
- **Backend:** Python, Flask, SQLAlchemy, OpenAI-Whisper, Pydub  
- **Frontend:** ReactJS, Vite
- **Database:** SQLite
 

---

## Features:
- **Upload recordings** – Supports multiple audio files in one go.  
- **Automatic transcription** – Converts speech to searchable text using Whisper.  
- **Smart search** – Find specific keywords or phrases across all transcribed recordings.  
- **Audio playback** – Play back uploaded recordings directly in the browser.  
- **Manage recordings** – View all recordings and delete unwanted ones.  
- **Duplicate check** – Avoids reprocessing if the same file already exists.  
- **Preprocessing** – Ensures audio is standardized before transcription (mono, 16kHz).  

---

## Real-life Use Cases:
- **Call centers** – Quickly locate calls mentioning “refund,” “complaint,” or “policy.”  
- **Meetings & lectures** – Upload long recordings and search for important discussions later.  
- **Legal & compliance** – Easily review sensitive phrases across large volumes of audio logs.  
- **Personal productivity** – Search through voice notes or interviews without replaying them fully.  

---


## Dev:
**Prakash Gupta**