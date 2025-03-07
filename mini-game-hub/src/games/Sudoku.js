import React, { useState } from "react";
import "../styles/sudoku.css";

// Define the size of the board
const BOARD_SIZE = 9;
const SUBGRIDSIZE = 3;

const Sudoku = () => {
  // Initial empty grid setup for a Sudoku board
  const initialBoard = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
  
  const [board, setBoard] = useState(initialBoard);
  const [message, setMessage] = useState("");

  const handleChange = (row, col, value) => {
    // Update the board with a new value entered by the user
    const newBoard = [...board];
    newBoard[row][col] = value === "" ? 0 : parseInt(value, 10);
    setBoard(newBoard);
  };

  const isValid = (board) => {
    // Check rows, columns, and 3x3 subgrids for validity
    for (let i = 0; i < BOARD_SIZE; i++) {
      const rowSet = new Set();
      const colSet = new Set();
      for (let j = 0; j < BOARD_SIZE; j++) {
        // Check row
        if (board[i][j] !== 0 && rowSet.has(board[i][j])) return false;
        rowSet.add(board[i][j]);

        // Check column
        if (board[j][i] !== 0 && colSet.has(board[j][i])) return false;
        colSet.add(board[j][i]);
      }
    }

    // Check 3x3 subgrids
    for (let row = 0; row < BOARD_SIZE; row += SUBGRIDSIZE) {
      for (let col = 0; col < BOARD_SIZE; col += SUBGRIDSIZE) {
        const subgridSet = new Set();
        for (let r = row; r < row + SUBGRIDSIZE; r++) {
          for (let c = col; c < col + SUBGRIDSIZE; c++) {
            if (board[r][c] !== 0 && subgridSet.has(board[r][c])) return false;
            subgridSet.add(board[r][c]);
          }
        }
      }
    }

    return true;
  };

  const handleSubmit = () => {
    if (isValid(board)) {
      setMessage("Congratulations! You solved the Sudoku.");
    } else {
      setMessage("Invalid Sudoku solution. Please try again.");
    }
  };

  const renderCell = (row, col) => {
    return (
      <input
        type="number"
        min="1"
        max="9"
        value={board[row][col] === 0 ? "" : board[row][col]}
        onChange={(e) => handleChange(row, col, e.target.value)}
        className="cell"
      />
    );
  };

  const renderBoard = () => {
    const boardElements = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      const rowElements = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        rowElements.push(renderCell(row, col));
      }
      boardElements.push(
        <div key={row} className="row">
          {rowElements}
        </div>
      );
    }
    return boardElements;
  };

  return (
    <div className="sudoku-game">
      <h1>Sudoku Game</h1>
      <div className="board">{renderBoard()}</div>
      <button className="submit-button" onClick={handleSubmit}>Submit Solution</button>
      <div className="message">{message}</div>
    </div>
  );
};

export default Sudoku;
