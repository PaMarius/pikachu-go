import React from "react";
import { NavBar } from "./NavBar";
import "./startPage.css";

function StartPage({ setPage }) {
  return (
    <div className="container">
      <NavBar setPage={setPage} />
      <button onClick={() => setPage(1)} className="start-button">
        START GAME
      </button>
    </div>
  );
}

export default StartPage;
