import React from "react";
import "../styles/main.css";
import GameSelection from "./GameSelection";
import Leaderboard from "./Leaderboard";
import Settings from "./Settings";

const MainScreen = ({ user, games }) => {
  return (
    <div className="main-screen">
      <header>
        <h2>Welcome, {user.displayName || user.email}!</h2>
        <p>Total Points: ⭐ {user.points || 0}</p>
      </header>
      <Settings user={user} />
      <GameSelection games={games} />
      <Leaderboard />
    </div>
  );
};

export default MainScreen;
