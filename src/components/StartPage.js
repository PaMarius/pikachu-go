import React, { useState } from "react";
import { RulesAndGuidelines } from "./rules and guidelines/RulesAndGuidelines";
import { NavBar } from "./NavBar";
import "./startPage.css";

function StartPage({ setPage }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const burgerHandler = () => {
    setModalIsOpen(true);
  };
  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container">
      <button onClick={burgerHandler}>Click me</button>
      {modalIsOpen && <RulesAndGuidelines onClick={closeModalHandler} />}
      <NavBar setPage={setPage} />
      <button onClick={() => setPage(1)} className="start-button">
        START GAME
      </button>
    </div>
  );
}

export default StartPage;
