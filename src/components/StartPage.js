import React from "react";
import "./startPage.css";

function StartPage({ setPage }) {
  return (
    <div className="container">
      <button>Click me</button>
      <button onClick={() => setPage(1)} className="start-button">
        START GAME
      </button>
    </div>
  );
}

export default StartPage;
