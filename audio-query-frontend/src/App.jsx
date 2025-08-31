import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import "./App.css";
import TranscriptionPopup from "./components/TranscriptionPopup";
import RecordingsTable from "./components/RecordingsTable";
import DeleteConfirmPopup from "./components/DeleteConfirmPopup";

export default function App() {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [transcriptionResult, setTranscriptionResult] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [allRecordings, setAllRecordings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState("");
  const [uploadError, setUploadError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [allRecordingError, setAllRecordingError] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [popupText, setPopupText] = useState(null);
  const [nameText, setNameText] = useState(null);
  const [modelName, setModelName] = useState(null);
  const [modelSize, setModelSize] = useState(null);
  const [selectedModelSize, setSelectedModelSize] = useState("tiny");
  const [selectedLanguageCode, setSelectedLanguageCode] = useState("en");
  const [deleteError, setDeleteError] = useState(null);
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false);
  const [deletingRecordingId, setDeletingRecordingId] = useState(null);
  const [deletingRecordingName, setDeletingRecordingName] = useState(null);
  const [isBackendLive, setisBackendLive] = useState(true);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);

  const modelOptions = [
    { size: "tiny", speed: "(Speed ~10x)" },
    { size: "turbo", speed: "(Speed ~8x)" },
    { size: "base", speed: "(Speed ~7x)" },
    { size: "small", speed: "(Speed ~4x)" },
    { size: "medium", speed: "(Speed ~2x)" },
    { size: "large", speed: "(Speed 1x)" },
  ];

  const languageOptions = [
    { "lang": "English", "code": "en" },
    { "lang": "Hindi", "code": "hi" },
    { "lang": "Telugu", "code": "te" },
    { "lang": "Tamil", "code": "ta" },
    { "lang": "Japanese", "code": "ja" },
    { "lang": "Spanish", "code": "es" },
    { "lang": "French", "code": "fr" },
  ];

  const BASE_URL = "https://6dba75a56915.ngrok-free.app";

  setInterval(isBackendRunning, 5000);

  useEffect(() => {
    isBackendRunning();
    fetchAllRecordings();
  }, []);


  const isBackendRunning = async () => {
    try{
      const response = await fetch(`${BASE_URL}/status`);
      console.log(response);
      if (!response.ok)
        setisBackendLive(false);
    }
    catch{
      setisBackendLive(false);
    }
  }

  const fetchAllRecordings = async () => {
    try {
      const response = await fetch(`${BASE_URL}/list-all-recordings`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllRecordings(data);
    } catch (e) {
      console.error("Failed to fetch recordings:", e);
      setAllRecordingError("Failed to load recordings.");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadFiles(files);
    setUploadError(null);
    setTranscriptionResult(null);
  };

  const handleUpload = async () => {
    if (uploadFiles.length === 0) {
      setUploadError("Please select at least one file to upload.");
      return;
    }

    setIsProcessing(true);
    setSearchQuery("");
    setSearchError(null)
    setDeleteError(null)
    setUploadError(null);
    setTranscriptionResult(null);

    const formData = new FormData();
    uploadFiles.forEach((file, index) => {
      formData.append(`files`, file, file.name);
    });
    formData.append("model_size", selectedModelSize);
    formData.append("language", selectedLanguageCode);

    try {
      setProcessingMessage("Uploading and processing files...");
      const response = await fetch(`${BASE_URL}/transcribe-audio`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setTranscriptionResult(result);
      await fetchAllRecordings();
      setProcessingMessage("Transcription complete!");
    } catch (e) {
      console.error("Transcription failed:", e);
      setUploadError(
        "An error occurred during transcription. Please try again."
      );
    } finally {
      setIsProcessing(false);
      setProcessingMessage("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setUploadFiles([]);
    }
  };

  const handleSearch = async () => {
    setUploadError(null);
    setDeleteError(null)
    if (!searchQuery) {
      setSearchResults([]);
      setSearchError("No text provided for search.");
      return;
    }
    try {
      setIsSearched(true);
      setIsProcessing(true);
      setProcessingMessage("Searching...");
      setSearchError(null);
      const response = await fetch(
        BASE_URL + "/search-audio?q=" + `${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (e) {
      console.error("Search failed:", e);
      setSearchError("An error occurred during search.");
    } finally {
      setIsProcessing(false);
      setProcessingMessage("");
    }
  };

  const togglePlay = async (recording) => {
    if (playingAudio === recording.rec_id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingAudio(null);
    } else {
      try {
        setIsProcessing(true);
        setProcessingMessage("Loading audio...");
        const response = await fetch(
          `${BASE_URL}/uploads/${recording.rec_id + "_" + recording.file_name}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch audio file.");
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioRef.current) {
          audioRef.current.pause();
          URL.revokeObjectURL(audioRef.current.src);
        }

        audioRef.current = new Audio(audioUrl);
        audioRef.current.play();
        setPlayingAudio(recording.rec_id);

        audioRef.current.onended = () => {
          setPlayingAudio(null);
          URL.revokeObjectURL(audioUrl);
        };
      } catch (e) {
        console.error("Audio playback failed:", e);
        setAllRecordingError("An error occurred while playing the audio.");
        setPlayingAudio(null);
      } finally {
        setIsProcessing(false);
        setProcessingMessage("");
      }
    }
  };

  const showPopup = (name, text, modelName, modelSize) => {
    setNameText(name);
    setPopupText(text);
    setModelName(modelName);
    setModelSize(modelSize);
  };

  const closePopup = () => {
    setPopupText(null);
  };

  const handleDeleteClick = (recording) => {
    setDeletingRecordingId(recording.rec_id);
    setDeletingRecordingName(recording.file_name);
    setShowDeleteConfirmPopup(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingRecordingId) return;

    setShowDeleteConfirmPopup(false);
    setIsProcessing(true);
    setProcessingMessage("Deleting recording...");
    setDeleteError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/delete-recording/${deletingRecordingId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);
      await fetchAllRecordings();
    } catch (e) {
      console.error("Deletion failed:", e);
      setDeleteError("An error occurred during deletion. Please try again.");
    } finally {
      setIsProcessing(false);
      setProcessingMessage("");
      setDeletingRecordingId(null);
      setDeletingRecordingName(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmPopup(false);
    setDeletingRecordingId(null);
    setDeletingRecordingName(null);
  };

  return (
    <div className="app__container">
      <div className="app__card">
      {!isBackendLive && <div className="error-text">Backend Server is currently off. Try later!</div>}
        <div className="app__container__h2">Audio Query</div>
        <p className="help-text" style={{marginTop:"0.8rem"}}>
          Tired of replaying multiple call recordings or audios to search for a phrase? Not anymore, Try AudioQuery!
        </p>
        <div className="app__container__normal_text">
          Upload new recordings or search existing ones.
        </div>
        <div className="app__section_divider"></div>
        <div className="app__container__h3">Upload new recording(s)</div>
        <div className="input-group">
          <label className="input-field flex-1">
            <ArrowUpTrayIcon
              style={{
                width: "1.25rem",
                height: "1.25rem",
                marginRight: "0.5rem",
              }}
            />
            <span className="placeholder__text">
              {uploadFiles.length > 0
                ? `${uploadFiles.length} file(s) selected`
                : "Choose Audio File(s)"}
            </span>
            <input
              type="file"
              ref={fileInputRef}
              accept="audio/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              multiple
            />
          </label>
        </div>
        <div className="select-container">
          <label className="select-label" htmlFor="model-size">
            Select Model Size:
          </label>
          <p className="help-text">
            Model with high speed will have low accuracy.
          </p>
          <select
            id="model-size"
            className="input-field"
            value={selectedModelSize}
            onChange={(e) => setSelectedModelSize(e.target.value)}
            disabled={isProcessing}
          >
            {modelOptions.map((option) => (
              <option key={option.size} value={option.size}>
                {`${option.size} ${option.speed}`}
              </option>
            ))}
          </select>
        </div>
        <div className="select-container">
          <label className="select-label" htmlFor="audio-language">
            Select Audio Language:
          </label>
          <p className="help-text">
            Languages other than English would have lower accuracy.
          </p>
          <select
            id="audio-language"
            className="input-field"
            value={selectedLanguageCode}
            onChange={(e) => setSelectedLanguageCode(e.target.value)}
            disabled={isProcessing}
          >
            {languageOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.lang}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleUpload}
          className="btn btn-green"
          disabled={isProcessing}
          style={{ width: "100%", marginTop: "1.5rem" }}
        >
          Upload
        </button>
        {uploadError && (
          <p className="message-text error-text">{uploadError}</p>
        )}
        {transcriptionResult && (
          <div className="message-text success-message">
            {transcriptionResult.message}
          </div>
        )}

        <div className="app__section_divider"></div>
        <div className="app__container__h3">Search existing recordings</div>
        <div className="input-group">
          <input
            type="text"
            className="input-field"
            placeholder="Search for keywords or phrases..."
            value={searchQuery}
            onChange={(e) => {
              setIsSearched(false);
              setSearchQuery(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            disabled={isProcessing}
          />
          <button
            onClick={handleSearch}
            className="btn btn-blue"
            disabled={isProcessing}
          >
            <MagnifyingGlassIcon
              style={{ width: "1.25rem", height: "1.25rem" }}
            />
          </button>
        </div>

        {searchError ? (
          <p className="message-text error-text">{searchError}</p>
        ) : searchResults.length > 0 ? (
          <RecordingsTable
            title="Search Results"
            recordings={searchResults}
            playingAudio={playingAudio}
            togglePlay={togglePlay}
            showPopup={showPopup}
            onDeleteClick={handleDeleteClick}
            showDeleteConfirmPopup={showDeleteConfirmPopup}
            searchQuery={searchQuery}
          />
        ) : (
          isSearched && (
            <p className="help-text m-1p-1">
              No recordings matched the search.
            </p>
          )
        )}

        <div className="app__section_divider"></div>
        <RecordingsTable
          title="All Available Recordings"
          recordings={allRecordings}
          playingAudio={playingAudio}
          togglePlay={togglePlay}
          showPopup={showPopup}
          error={allRecordingError}
          onDeleteClick={handleDeleteClick}
          showDeleteConfirmPopup={showDeleteConfirmPopup}
          searchQuery={null}
        />
      </div>
      {popupText && (
        <TranscriptionPopup
          nameText={nameText}
          text={popupText}
          modelName={modelName}
          modelSize={modelSize}
          onClose={closePopup}
          searchQuery={searchQuery}
        />
      )}
      {showDeleteConfirmPopup && (
        <DeleteConfirmPopup
          recordingName={deletingRecordingName}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
      {isProcessing && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-message">{processingMessage}</div>
        </div>
      )}
      <div
        style={{
          padding: "1rem",
          marginTop: "3rem",
          borderRadius: "0 0 1.5rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width:'100em !important'
        }}
      >
        <div
          style={{
            fontSize: "0.875rem",
            color: "#64748b",
            marginTop: "0.25rem",
          }}
        >
          Technologies Used: Python(Flask, PyDub, SQLAlchemy), ReactJs, SQLite,
          and OpenAI-Whisper
        </div>
        <div
          style={{
            marginTop: "1rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#1e293b",
          }}
        >
          Developer: Prakash Gupta
        </div>
        <div style={{ marginTop: "0.25rem", display: "flex", gap: "1rem" }}>
          <a
            href="https://www.linkedin.com/in/prakashgupta-/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#3b82f6",
              fontWeight: "bold",
              transition: "color 0.2s",
            }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/LunaticPrakash"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#3b82f6",
              fontWeight: "bold",
              transition: "color 0.2s",
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}