import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GameSelection from "./components/GameSelection"; // Import GameSelection
import MainFrame from "./components/MainScreen"; // Create this file later
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import WelcomeScreen from "./components/WelcomeScreen";
import Checkers from "./games/Checkers"; // Add Checkers Component
import Chess from "./games/Chess"; // Add Chess Component
import PacMan from "./games/PacMan"; // Add PacMan Component
import Sudoku from "./games/Sudoku"; // Add Sudoku Component
import TicTacToe from "./games/TicTacToe"; // Add TicTacToe Component

const App = () => {
  // Define the onSelect function to navigate to the correct game page
  const handleGameSelect = (game) => {
    // Navigate to the corresponding game page based on the selected game
    window.location.href = `/${game.name.toLowerCase()}`;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainFrame />} />
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
