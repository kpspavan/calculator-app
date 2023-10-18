import React from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import "./History.css";

const HistoryComponent = ({
  showHistory,
  history,
  handleToggleHistory,
  handleClearHistory,
}) => {
  return (
    <div>
      <div className="tabs">
        <div
          className={`tab ${showHistory ? "active" : ""}`}
          onClick={() => handleToggleHistory(true)}
        >
          History
        </div>
        <div
          className={`tab memory ${!showHistory ? "active" : ""}`}
          onClick={() => handleToggleHistory(false)}
        >
          Memory
        </div>
      </div>
      {showHistory ? (
        <div>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
          <button onClick={() => handleClearHistory()}>
            <MdOutlineDeleteForever className="MdOutlineDeleteForever" />
          </button>
        </div>
      ) : (
        <div>
          <div className="history">
            <p>No memory</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryComponent;
