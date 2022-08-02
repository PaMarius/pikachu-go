import React from "react";

function EndGamePage({ points, setPage, setPoints }) {
  return (
    <>
      <p>Your points:{points.userPoints}</p>
      <button
        onClick={() => {
          setPoints({ userPoints: 0, computerPoints: 0 });
          setPage(0);
        }}
      >
        reset
      </button>
    </>
  );
}
export default EndGamePage;
