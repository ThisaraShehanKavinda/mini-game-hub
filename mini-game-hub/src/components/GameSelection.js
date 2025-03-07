import { motion } from "framer-motion";
import React from "react";
import "../styles/gameSelection.css";

const GameSelection = ({ games, onSelect }) => {
  // Function to get a game icon based on the game name
  const getGameIcon = (name) => {
    switch (name.toLowerCase()) {
      case "pac-man":
        return "🟡";
      case "chess":
        return "♟️";
      case "sudoku":
        return "🔢";
      case "tic-tac-toe":
        return "❌⭕";
      case "checkers":
        return "🔴⚫";
      default:
        return "🎮"; // Default game icon
    }
  };

  return (
    <motion.div 
      className="game-selection-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="section-title">🎮 Choose a Game</h2>

      {games.length > 0 ? (
        <div className="game-grid">
          {games.map((game, index) => (
            <motion.div
              className="game-card"
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelect(game)}
            >
              <span className="game-icon">{getGameIcon(game.name)}</span>
              <h3 className="game-title">{game.name}</h3>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="no-games">No games available at the moment.</p>
      )}
    </motion.div>
  );
};

export default GameSelection;
