# AudioQuery

A full-stack application that allows users to **upload audio files** (like call recordings, meetings, or lectures) and **search for keywords or phrases** within them. The matching audio files will be displayed to user which he can directly listen or read the transcribed text with highlighted matching phrase. 

The app automatically transcribes audio into text using **OpenAI Whisper** and stores it into database for quick, future searches to avoid duplicate processing.

---
## Status:

Deployed at: <a href="https://audio-query-frontend.onrender.com/">Audio Query</a>

---
## Screenshots:
**i. Home Page** <br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/a94ed338-7dc3-4b0f-a314-ae6403050e16" />

**ii. Model Selection** <br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/8ad06d96-dab5-4c5a-b8f3-b16eaf0858eb" />

**iii. Language Selection** <br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/78cc2fe0-af8e-4e9d-ae39-859449a74b85" />

**iv. All uploaded audio files and matching searched audio** <br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/50d0ed9b-905a-4c8c-a2f8-259673ddca9c" />

**v. Popup View for details** (Transcription is not very accurate as used the base model)<br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/eef55506-e0b3-4157-9d5e-81eb51ce6bb4" />

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
- **Multi Language Support** – Provided support for multiple languages like English, Hindi, Telugu, French, etc.  
- **Highlighted Phrase/Keyword** – The matching keywords/phrases will be highlighted in the text transcription for easy finding.

---

## Real-life Use Cases:
- **Call centers** – Quickly locate calls mentioning “refund,” “complaint,” or “policy.”  
- **Meetings & lectures** – Upload long recordings and search for important discussions later.  
- **Legal & compliance** – Easily review sensitive phrases across large volumes of audio logs.  
- **Personal productivity** – Search through voice notes or interviews without replaying them fully.  

---


## Dev:
**Prakash Gupta**
