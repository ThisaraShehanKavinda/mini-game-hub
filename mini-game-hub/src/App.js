import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GameSelection from "./components/GameSelection";
import MainScreen from "./components/MainScreen";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import WelcomeScreen from "./components/WelcomeScreen";
import Checkers from "./games/Checkers";
import Chess from "./games/Chess";
import PacMan from "./games/PacMan";
import Sudoku from "./games/Sudoku";
import TicTacToe from "./games/TicTacToe";

const App = () => {
  const [user, setUser] = useState(null); // Track user login state

  // Handle user login
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Handle user logout and redirect
  const handleLogout = () => {
    setUser(null); // Clear user state
    window.location.href = "/signin"; // Redirect to sign-in
  };

  // Function to navigate to a selected game
  const handleGameSelect = (game) => {
    window.location.href = `/${game.name.toLowerCase()}`;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/main" 
          element={<MainScreen user={user} onLogout={handleLogout} />} 
        />
        <Route 
          path="/game-selection" 
          element={<GameSelection onSelect={handleGameSelect} />} 
        />
        <Route path="/chess" element={<Chess />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/sudoku" element={<Sudoku />} />
        <Route path="/pac-man" element={<PacMan />} />
        <Route path="/checkers" element={<Checkers />} />
      </Routes>
    </Router>
  );
};

export default App;
