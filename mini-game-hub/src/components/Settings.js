import { motion } from "framer-motion";
import React, { useState } from "react";
import "../styles/settings.css";

const Settings = ({ user, onUpdate, onDelete }) => {
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdate = () => {
    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }
    onUpdate({ email, password });
    alert("Account updated successfully!");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      onDelete();
      alert("Account deleted successfully!");
    }
  };

  return (
    <motion.div 
      className="settings-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="settings-title">⚙️ Settings</h2>

      <div className="settings-group">
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter new email"
        />
      </div>

      <div className="settings-group">
        <label>Password:</label>
        <input 
          type={showPassword ? "text" : "password"} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter new password"
        />
        <button className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "🙈 Hide" : "👁 Show"}
        </button>
      </div>

      <motion.button 
        className="update-btn"
        onClick={handleUpdate}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Save Changes
      </motion.button>

      <motion.button 
        className="delete-btn"
        onClick={handleDelete}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ❌ Delete Account
      </motion.button>
    </motion.div>
  );
};

export default Settings;
