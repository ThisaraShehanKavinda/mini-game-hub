import React from "react";
import "../styles/main.css";

const Leaderboard = () => {
  const players = [
    { name: "Player1", points: 120 },
    { name: "Player2", points: 110 },
  ];
  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.name} - {player.points} pts</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
