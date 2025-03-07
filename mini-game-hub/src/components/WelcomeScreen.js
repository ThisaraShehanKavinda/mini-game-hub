import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/welcome.css";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="welcome-screen"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.h1
        className="title"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        🎮 Welcome to Mini Game Hub 🎮
      </motion.h1>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.2 }}
      >
        Play, Compete, and Have Fun!
      </motion.p>

      <motion.button
        className="start-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/signin")}
      >
        Start
      </motion.button>

      <motion.div
        className="animated-icons"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      >
        🕹️ 🎲 ♟️ 🎯
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
