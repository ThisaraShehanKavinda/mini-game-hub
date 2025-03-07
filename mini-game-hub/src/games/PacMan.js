import React, { useEffect, useState } from "react";
import "../styles/pacman.css";

// Define Pac-Man grid size and movement parameters
const gridSize = 15; // Grid dimensions (15x15)
const initialPosition = { x: 7, y: 7 };

const PacmanGame = () => {
  const [pacman, setPacman] = useState(initialPosition);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [ghosts, setGhosts] = useState([
    { x: 3, y: 3 },
    { x: 10, y: 10 },
  ]);

  const handleKeyPress = (e) => {
    if (gameOver) return;

    const newPacman = { ...pacman };

    switch (e.key) {
      case "ArrowUp":
        newPacman.y = Math.max(newPacman.y - 1, 0);
        break;
      case "ArrowDown":
        newPacman.y = Math.min(newPacman.y + 1, gridSize - 1);
        break;
      case "ArrowLeft":
        newPacman.x = Math.max(newPacman.x - 1, 0);
        break;
      case "ArrowRight":
        newPacman.x = Math.min(newPacman.x + 1, gridSize - 1);
        break;
      default:
        return;
    }

    // Check for collisions with ghosts
    for (let ghost of ghosts) {
      if (newPacman.x === ghost.x && newPacman.y === ghost.y) {
        setGameOver(true);
        alert("Game Over! You were caught by a ghost.");
        return;
      }
    }

    // Update Pac-Man position
    setPacman(newPacman);
    setScore(score + 1);
  };

  useEffect(() => {
    if (gameOver) return;

    const handleMovement = (e) => handleKeyPress(e);

    window.addEventListener("keydown", handleMovement);
    return () => window.removeEventListener("keydown", handleMovement);
  }, [pacman, gameOver, ghosts]);

  const resetGame = () => {
    setPacman(initialPosition);
    setScore(0);
    setGhosts([
      { x: 3, y: 3 },
      { x: 10, y: 10 },
    ]);
    setGameOver(false);
  };

  const renderGrid = () => {
    const grid = [];

    // Render grid
    for (let y = 0; y < gridSize; y++) {
      const row = [];
      for (let x = 0; x < gridSize; x++) {
        let cellClass = "empty";
        if (pacman.x === x && pacman.y === y) {
          cellClass = "pacman";
        }

        // Check if the position matches any ghost's position
        for (let ghost of ghosts) {
          if (ghost.x === x && ghost.y === y) {
            cellClass = "ghost";
          }
        }

        row.push(<div key={`${x}-${y}`} className={`cell ${cellClass}`} />);
      }
      grid.push(
        <div key={`row-${y}`} className="row">
          {row}
        </div>
      );
    }
    return grid;
  };

  return (
    <div className="pacman-game">
      <h1>Pac-Man Game</h1>
      <div className="score">Score: {score}</div>
      <div className="grid">{renderGrid()}</div>
      {gameOver && (
        <div className="game-over">
          <p>Game Over!</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default PacmanGame;
