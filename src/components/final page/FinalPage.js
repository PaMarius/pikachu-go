import React from "react";
import "./final-page.css";

export const FinalPage = ({ setPage, points, setPoints }) => {
  return (
    <div className="backdrop">
      <div className="score-container">
        <img src="game-over.png"></img>
        <p className="nr-of-points">You earned {points.userPoints} points</p>
        <button
          className="start-over-btn"
          onClick={() => {
            setPage(1);
            setPoints({ userPoints: 0, computerPoints: 0 });
          }}
        >
          Restart Game
        </button>
        <button
          className="start-over-btn"
          onClick={() => {
            setPage(0);
            setPoints({ userPoints: 0, computerPoints: 0 });
          }}
        >
          Menu
        </button>
      </div>
    </div>
  );
};
