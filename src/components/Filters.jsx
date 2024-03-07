import React from "react";

export default function Filters({ showLiked, setShowLiked }) {
  const full = {
    width: "620px",
  };

  return (
    <div>
      <div style={full}>
        <div className="filtersDiv">
          <input
            type="checkbox"
            name="Show Liked"
            onChange={() => setShowLiked(!showLiked)}
            checked={showLiked ? true : false}
          ></input>
          <span>Liked</span>
        </div>
      </div>
    </div>
  );
}
