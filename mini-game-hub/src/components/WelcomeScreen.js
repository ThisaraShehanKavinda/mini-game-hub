import { motion } from "framer-motion";
import React from "react";
import "../styles/welcome.css";

const WelcomeScreen = ({ onStart }) => {
  return (
    <motion.div className="welcome-screen"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
      <h1>🎮 Welcome to Mini Game Hub 🎮</h1>
      <motion.button className="start-button"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={onStart}>
        Start
      </motion.button>
    </motion.div>
  );
};

export default WelcomeScreen;
