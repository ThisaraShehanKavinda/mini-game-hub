import { motion } from "framer-motion";
import React from "react";
import "../styles/main.css";

const GameSelection = ({ games, onSelect }) => {
  return (
    <div className="game-selection">
      {games.map((game, index) => (
        <motion.div className="game-card"
          key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => onSelect(game)}>
          <h3>{game.name}</h3>
        </motion.div>
      ))}
    </div>
  );
};

export default GameSelection;
