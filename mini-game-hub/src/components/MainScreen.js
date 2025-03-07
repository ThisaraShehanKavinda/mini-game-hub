import { motion } from "framer-motion";
import React, { useState } from "react";
import "../styles/main.css";
import GameSelection from "./GameSelection";
import Leaderboard from "./Leaderboard";
import Settings from "./Settings";

const MainScreen = ({ user, games, onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      onLogout();
    }
  };

  return (
    <motion.div
      className={`main-screen ${isDarkMode ? "dark-mode" : "light-mode"}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header Section */}
      <motion.header
        className="main-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2>Welcome, {user?.displayName || user?.email || "Player"}!</h2>
        <p>Total Points: ⭐ {user?.points || 0}</p>

        <div className="header-buttons">
          <motion.button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </motion.button>

          <motion.button
            className="logout-button"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚪 Logout
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content Sections */}
      <div className="main-content">
        <motion.div
          className="settings-section"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Settings user={user} />
        </motion.div>

        <motion.div
          className="game-selection-section"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <GameSelection games={games} />
        </motion.div>

        <motion.div
          className="leaderboard-section"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Leaderboard />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MainScreen;
