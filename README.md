# AudioQuery

A full-stack application that allows users to **upload audio files** (like call recordings, meetings, or lectures) and **search for keywords or phrases** within them.The matching audio files will be displayed to user which he can directly listen or read the transcribed text. 

The app automatically transcribes audio into text using **OpenAI Whisper** and stores it into database for quick, future searches to avoid duplicate processing.

---

## Screenshots:
**i. Home Page** <br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/bb2eda49-e1e4-4fd2-8037-0ee941f46396" />

**ii. Model Selection** <br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/16d9e5e6-007d-4e85-acda-4423aa9a643b" />

**iii. All Audio** <br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/54f1af6f-cf9b-42dd-b2d1-c611fc63fe12" />

**iv. Search Audio** <br/> <br/>
<img width="270" height="600" alt="Image" src="https://github.com/user-attachments/assets/232f855b-3d5d-4f7e-9120-16df3084220e" />
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
