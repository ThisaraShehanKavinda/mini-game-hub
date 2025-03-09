import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import GameSelection from "./GameSelection";
import Leaderboard from "./Leaderboard";
import Settings from "./Settings";

const MainScreen = ({ user, onLogout }) => {
  const [isDarkMode] = useState(true);
  const navigate = useNavigate(); // React Router navigation function

  // Game list with navigation
  const gamesArray = [
    { name: "Pac-Man", onSelect: (game) => navigate(`/${game.name.toLowerCase()}`) },
    { name: "Chess", onSelect: (game) => navigate(`/${game.name.toLowerCase()}`) },
    { name: "Tic-Tac-Toe", onSelect: (game) => navigate(`/${game.name.toLowerCase()}`) },
    { name: "Checkers", onSelect: (game) => navigate(`/${game.name.toLowerCase()}`) }
  ];

  // Logout function
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      if (onLogout) {
        onLogout(); // Call logout function from parent
        navigate("/signin", { replace: true }); // Redirect to sign-in page
      } else {
        console.error("onLogout function is missing.");
      }
    }
  };

  return (
    <div className={`main-screen ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="main-header">
        <h2>Welcome, {user?.displayName || user?.email || "Player"}!</h2>
        <p>Total Points: ⭐ {user?.points || 0}</p>
        <div className="header-buttons">
          <button className="logout-button" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </header>

      <div className="main-content">
        <div className="settings-section">
          <Settings user={user} />
        </div>

        <div className="game-selection-section">
          <GameSelection games={gamesArray} onSelect={(game) => navigate(`/${game.name.toLowerCase()}`)} />
        </div>

        <div className="leaderboard-section">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
