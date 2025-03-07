import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/backgroundVideo.mp4";
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
      {/* Background video element */}
      <div className="background-video">
        <motion.video
          src={backgroundVideo} // Replace with your own video URL
          autoPlay
          loop
          muted
          className="background-video-element"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      </div>

      {/* Title Animation */}
      <motion.h1
        className="title"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2, type: "spring", stiffness: 100 }}
      >
        🎮 Welcome to Mini Game Hub 🎮
      </motion.h1>

      {/* Subtitle Animation */}
      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.2, type: "spring", stiffness: 150 }}
      >
        Play, Compete, and Have Fun!
      </motion.p>

      {/* Start Button Animation */}
      <motion.button
        className="start-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/signin")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, type: "spring", stiffness: 100 }}
      >
        Start
      </motion.button>

      {/* Animated Icons */}
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
