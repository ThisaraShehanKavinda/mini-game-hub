import React, { useEffect, useState } from "react";
import "../styles/tictactoe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Calculate the winner
  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return; // If the cell is already filled or there's a winner, don't allow the move.

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setWinner(winner);
    }
  }, [board]); // This effect will run whenever the board state changes

  const renderCell = (index) => {
    return (
      <button className="cell" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="tictactoe-game">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((_, index) => renderCell(index))}
      </div>
      {winner ? (
        <div className="winner-message">
          <h2>Player {winner} wins!</h2>
        </div>
      ) : (
        <div className="turn-message">
          <h2>Next Player: {isXNext ? "X" : "O"}</h2>
        </div>
      )}
      <button className="reset-button" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
