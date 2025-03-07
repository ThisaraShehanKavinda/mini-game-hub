import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import GameSelection from "./GameSelection";
import Leaderboard from "./Leaderboard";
import Settings from "./Settings";

const MainScreen = ({ user, onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate(); // Use navigate for navigation

  // Create the games array
  const gamesArray = [
    { 
      name: "Pac-Man", 
      onSelect: (game) => console.log("Selected:", game.name) 
    },
    { 
      name: "Chess", 
      onSelect: (game) => console.log("Selected:", game.name) 
    },
    { 
      name: "Tic-Tac-Toe", 
      onSelect: (game) => console.log("Selected:", game.name) 
    },
    { 
      name: "Checkers", 
      onSelect: (game) => console.log("Selected:", game.name) 
    }
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      onLogout();
    }
  };

  // Handle game selection and navigate to the corresponding game page
  const handleGameSelect = (game) => {
    console.log("Game selected:", game.name);
    // Navigate to the corresponding game's page
    navigate(`/${game.name.toLowerCase()}`);
  };

  return (
    <div className={`main-screen ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="main-header">
        <h2>Welcome, {user?.displayName || user?.email || "Player"}!</h2>
        <p>Total Points: ⭐ {user?.points || 0}</p>
        <div className="header-buttons">
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
          <button className="logout-button" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Pass the games array to GameSelection */}
      <div className="main-content">
        <div className="settings-section">
          <Settings user={user} />
        </div>

        <div className="game-selection-section">
          <GameSelection games={gamesArray} onSelect={handleGameSelect} />
        </div>

        <div className="leaderboard-section">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
