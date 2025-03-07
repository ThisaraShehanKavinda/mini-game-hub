import React from "react";
import "../styles/game.css";

const GameFrame = ({ game, onExit }) => {
  return (
    <div className="game-frame">
      <button className="exit-button" onClick={onExit}>Exit</button>
      <h2>{game.name}</h2>
      <game.component />
    </div>
  );
};

export default GameFrame;
