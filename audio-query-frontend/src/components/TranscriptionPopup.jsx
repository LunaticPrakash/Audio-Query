import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const HighlightedText = ({ text, highlight }) => {
  if (!highlight) {
    return <span>{text}</span>;
  }

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part.toLowerCase() === highlight.toLowerCase() ? (
            <span className="highlighted">{part}</span>
          ) : (
            part
          )}
        </React.Fragment>
      ))}
    </span>
  );
};

const TranscriptionPopup = ({ nameText, text, modelName, modelSize, onClose, searchQuery }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <div className="popup-header-row">
            <h3 className="popup-title">{nameText}</h3>
            <button onClick={onClose} className="popup-close-btn">
              <XMarkIcon className="icon-close" />
            </button>
          </div>
          <div className="model-text">({`Model Name: ${modelName}-${modelSize}`})</div>
        </div>
        <div className="popup-body">
          <p>
            <HighlightedText text={text} highlight={searchQuery} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionPopup;