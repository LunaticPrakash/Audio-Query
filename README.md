# AudioQuery

A full-stack application that allows users to **upload audio files** (like call recordings, meetings, or lectures) and **search for keywords or phrases** within them. The matching audio files will be displayed to user which he can directly listen or read the transcribed text. 

The app automatically transcribes audio into text using **OpenAI Whisper** and stores it into database for quick, future searches to avoid duplicate processing.

---

## Screenshots:
**i. Home Page** <br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/c786a93f-4c22-444b-b827-9ba085819c31" />

**ii. Model Selection** <br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/8ad06d96-dab5-4c5a-b8f3-b16eaf0858eb" />

**iii. Language Selection** <br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/78cc2fe0-af8e-4e9d-ae39-859449a74b85" />

**iv. All uploaded audio files and matching searched audio** <br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/e6b76caf-6dc5-4402-9650-ac520a6b84f7" />

**v. Popup View for details** <br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/d31c37da-7029-4bd8-9fe4-553f61e2a44f" />

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

---

## Real-life Use Cases:
- **Call centers** – Quickly locate calls mentioning “refund,” “complaint,” or “policy.”  
- **Meetings & lectures** – Upload long recordings and search for important discussions later.  
- **Legal & compliance** – Easily review sensitive phrases across large volumes of audio logs.  
- **Personal productivity** – Search through voice notes or interviews without replaying them fully.  

---


## Dev:
**Prakash Gupta**
