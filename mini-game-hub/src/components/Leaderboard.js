import { motion } from "framer-motion";
import React from "react";
import "../styles/leaderboard.css";

const Leaderboard = ({ players }) => {
  // Default leaderboard in case no data is passed
  const defaultPlayers = [
    { name: "Player1", points: 120 },
    { name: "Player2", points: 110 },
    { name: "Player3", points: 95 },
    { name: "Player4", points: 85 },
    { name: "Player5", points: 70 }
  ];

  // Sort players by points (highest first)
  const sortedPlayers = (players || defaultPlayers).sort((a, b) => b.points - a.points);

  // Assign rank emojis 🏆🥈🥉 for the top 3
  const getRankEmoji = (index) => {
    if (index === 0) return "🏆"; // Gold
    if (index === 1) return "🥈"; // Silver
    if (index === 2) return "🥉"; // Bronze
    return "🎮"; // Others
  };

  return (
    <motion.div 
      className="leaderboard-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="leaderboard-title">🏅 Leaderboard</h2>

      {sortedPlayers.length > 0 ? (
        <ul className="leaderboard-list">
          {sortedPlayers.map((player, index) => (
            <motion.li 
              key={index}
              className={`leaderboard-item rank-${index + 1}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {getRankEmoji(index)} <strong>{player.name}</strong> - {player.points} pts
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="no-players">No players yet. Start playing to rank up! 🎮</p>
      )}
    </motion.div>
  );
};

export default Leaderboard;
