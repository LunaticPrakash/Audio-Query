import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const DeleteConfirmPopup = ({ recordingName, onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h3 className="popup-title">Confirm Deletion</h3>
          <button onClick={onCancel} className="popup-close-btn">
            <XMarkIcon className="icon-close" />
          </button>
        </div>
        <div className="popup-body">
          <p>
            Are you sure you want to permanently delete the recording{" "}
            <span style={{ fontWeight: "bold" }}>{recordingName}</span>? This
            action cannot be undone.
          </p>
        </div>
        <div className="popup-footer">
          <button onClick={onCancel} className="btn btn-gray btn-popup" style={{ width: '48%' }}>
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-red btn-popup" style={{ width: '48%' }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmPopup;
