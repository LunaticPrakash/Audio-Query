import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const TranscriptionPopup = ({nameText, text, onClose}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h3 className="popup-title">{nameText}</h3>
          <button onClick={onClose} className="popup-close-btn">
            <XMarkIcon className="icon-close" />
          </button>
        </div>
        <div className="popup-body">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionPopup;
