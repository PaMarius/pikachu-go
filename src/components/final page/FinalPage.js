import React from "react";
import "./final-page.css";

export const FinalPage = ({ setPage }) => {
  return (
    <div className="backdrop">
      <div className="score-container">
        <img src="game-over.png"></img>
        <p className="nr-of-points">You earned # points</p>
        <button className="start-over-btn" onClick={() => setPage(0)}>
          Restart Game
        </button>
      </div>
    </div>
  );
};