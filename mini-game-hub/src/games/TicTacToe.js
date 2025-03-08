import React, { useEffect, useState } from "react";
import { savePlayerScore } from "../firebase/config"; // Import Firebase function
import "../styles/tictactoe.css";

// AI Opponent (Simple AI with difficulty levels)
const getAIMove = (board, level) => {
  const emptyIndices = board.map((val, index) => val === null ? index : null).filter(val => val !== null);
  
  if (level === "easy") {
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  // Medium AI (random but smarter)
  if (level === "medium") {
    // Add more complex behavior (this is just a placeholder for now)
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  // Hard AI (Minimax algorithm placeholder)
  if (level === "hard") {
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)]; // Placeholder
  }
};

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Tracks which player's turn it is
  const [winner, setWinner] = useState(null);
  const [gameHistory, setGameHistory] = useState([]); // Game history for move undo
  const [score, setScore] = useState({ X: 0, O: 0 }); // Scoreboard
  const [isAI, setIsAI] = useState(false); // Toggle AI mode
  const [playerNames, setPlayerNames] = useState({ X: "Player X", O: "Player O" }); // Customizable player names
  const [aiLevel, setAiLevel] = useState("easy"); // AI difficulty level

  // Calculate the winner
  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
      [0, 4, 8], [2, 4, 6],            // Diagonal
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winner ('X' or 'O')
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore if cell is filled or if there's a winner

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setGameHistory([...gameHistory, newBoard]);

    const currentWinner = calculateWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
      setScore((prevScore) => ({
        ...prevScore,
        [currentWinner]: prevScore[currentWinner] + 1,
      }));
      savePlayerScore(playerNames[currentWinner], 1); // Save score in Firebase
    } else if (!newBoard.includes(null)) {
      setWinner("Draw");
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameHistory([]);
  };

  const handleUndo = () => {
    if (gameHistory.length > 0) {
      const lastBoard = gameHistory[gameHistory.length - 1];
      setBoard(lastBoard);
      setGameHistory(gameHistory.slice(0, -1));
      setIsXNext(!isXNext);
    }
  };

  useEffect(() => {
    if (isAI && !isXNext && !winner) {
      const aiMove = getAIMove(board, aiLevel);
      handleClick(aiMove); // Let AI play
    }
  }, [board, isXNext, isAI, winner, aiLevel]);

  const renderCell = (index) => {
    return (
      <button className={`cell ${board[index]}`} onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  return (
    <div className="tictactoe-game">
      <h1>Tic-Tac-Toe</h1>
      <div className="scoreboard">
        <div>{playerNames.X}: {score.X}</div>
        <div>{playerNames.O}: {score.O}</div>
      </div>
      <div className="board">
        {board.map((_, index) => renderCell(index))}
      </div>
      {winner && (
        <div className="result-message">
          
          {/* Celebration overlay */}
          <div className="celebration-overlay">
            <div className="celebration-message">🎉 Congratulations! 🎉</div>
          </div>
        </div>
      )}
      <div className="controls">
        <button className="reset-button" onClick={handleReset}>Reset Game</button>
        <button className="undo-button" onClick={handleUndo} disabled={gameHistory.length === 0}>Undo Move</button>
        <button className="toggle-ai-button" onClick={() => setIsAI(!isAI)}>
          {isAI ? "Play Player vs Player" : "Play vs AI"}
        </button>
        
      </div>
    </div>
  );
};

export default TicTacToe;
