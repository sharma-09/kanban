import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const DisplayOptions = ({ onGroupingChange, onSortingChange }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleDisplayClick = () => {
    setShowOptions(!showOptions);
  };

  const handleGroupingChange = (option) => {
    onGroupingChange(option);
    setShowOptions(false);
  };

  const handleSortingChange = (option) => {
    onSortingChange(option);
    setShowOptions(false);
  };

  return (
    <div className="display-options">
      <button id="buttonContainer"  onClick={handleDisplayClick}>
        <FontAwesomeIcon icon={faArrowDownShortWide} />
        <p id="buttonText">Display</p>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>

      {showOptions && (
        <div
          className="options-menu"
          style={{
            position: "absolute",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div>
            <span>Grouping</span>
            <select onChange={(e) => handleGroupingChange(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div>
            <span>Ordering</span>
            <select onChange={(e) => handleSortingChange(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOptions;
