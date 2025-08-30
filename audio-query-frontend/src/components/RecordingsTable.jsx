import { PlayIcon, PauseIcon, TrashIcon } from "@heroicons/react/24/solid";

const RecordingsTable = ({
  title,
  recordings,
  playingAudio,
  togglePlay,
  showPopup,
  error,
  onDeleteClick,
  showDeleteConfirmPopup,
}) => (
  <div className="list-section">
    <div className="app__container__h3">{title}</div>
    {recordings.length > 0 ? (
      <div className="table-container">
        <table className="results-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Text</th>
              <th>Model</th>
              <th className="action-column">Play</th>
              <th className="action-column">Delete</th>
            </tr>
          </thead>
          <tbody>
            {recordings.map((recording) => (
              <tr
                key={recording.rec_id}
                onClick={() =>
                  !showDeleteConfirmPopup &&
                  showPopup(recording.file_name, recording.text_content, recording.model_name, recording.model_size)
                }
              >
                <td className="filename-text">{recording.file_name}</td>
                <td className="transcription-text">{recording.text_content}</td>
                <td className="transcription-text">{`${recording.model_name}-${recording.model_size}`}</td>
                <td className="action-column">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(recording);
                    }}
                    className="play-btn"
                    aria-label={
                      playingAudio === recording.rec_id ? "Pause" : "Play"
                    }
                  >
                    {playingAudio === recording.rec_id ? (
                      <PauseIcon className="icon-play-pause" />
                    ) : (
                      <PlayIcon className="icon-play-pause" />
                    )}
                  </button>
                </td>
                <td className="action-column">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteClick(recording);
                    }}
                    className="delete-btn"
                  >
                    <TrashIcon className="icon-delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : error ? (
      <p className="message-text error-text">{error}</p>
    ) : (
      <p className="list-empty-state">No recordings to display.</p>
    )}
  </div>
);

export default RecordingsTable;
