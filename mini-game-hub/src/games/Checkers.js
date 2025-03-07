import React, { useEffect, useState } from "react";
import "../styles/checkers.css";

const BOARD_SIZE = 8; // 8x8 board
const DARK_SQUARE_COLOR = "#b58863";
const LIGHT_SQUARE_COLOR = "#f0d9b5";
const DARK_PIECE_COLOR = "#000";
const LIGHT_PIECE_COLOR = "#fff";

const Checkers = () => {
  const [board, setBoard] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [turn, setTurn] = useState("black");

  useEffect(() => {
    initializeBoard();
  }, []);

  // Initialize the board with checkers pieces
  const initializeBoard = () => {
    let newBoard = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null));

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if ((row + col) % 2 === 1) {
          if (row < 3) {
            newBoard[row][col] = { color: "black", king: false };
          } else if (row > 4) {
            newBoard[row][col] = { color: "white", king: false };
          }
        }
      }
    }
    setBoard(newBoard);
  };

  const handleSquareClick = (row, col) => {
    if (selectedPiece) {
      movePiece(selectedPiece.row, selectedPiece.col, row, col);
    } else if (board[row][col] && board[row][col].color === turn) {
      setSelectedPiece({ row, col });
    }
  };

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    let newBoard = [...board];

    if (isValidMove(fromRow, fromCol, toRow, toCol)) {
      newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
      newBoard[fromRow][fromCol] = null;

      // Handle king promotion
      if (toRow === 0 && newBoard[toRow][toCol].color === "white") {
        newBoard[toRow][toCol].king = true;
      } else if (toRow === BOARD_SIZE - 1 && newBoard[toRow][toCol].color === "black") {
        newBoard[toRow][toCol].king = true;
      }

      setBoard(newBoard);
      setSelectedPiece(null);
      setTurn(turn === "black" ? "white" : "black");
    }
  };

  const isValidMove = (fromRow, fromCol, toRow, toCol) => {
    if (board[toRow][toCol]) return false; // Destination must be empty

    let piece = board[fromRow][fromCol];
    if (!piece) return false;

    let rowDiff = toRow - fromRow;
    let colDiff = Math.abs(toCol - fromCol);

    if (piece.king) {
      return Math.abs(rowDiff) === 1 && colDiff === 1; // Kings move 1 diagonal
    } else {
      return rowDiff === (piece.color === "black" ? 1 : -1) && colDiff === 1;
    }
  };

  return (
    <div className="checkers">
      <h2>Checkers - {turn.charAt(0).toUpperCase() + turn.slice(1)}'s Turn</h2>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((square, colIndex) => (
              <div
                key={colIndex}
                className="square"
                style={{
                  backgroundColor:
                    (rowIndex + colIndex) % 2 === 0
                      ? LIGHT_SQUARE_COLOR
                      : DARK_SQUARE_COLOR,
                }}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {square && (
                  <div
                    className="piece"
                    style={{
                      backgroundColor:
                        square.color === "black"
                          ? DARK_PIECE_COLOR
                          : LIGHT_PIECE_COLOR,
                      border: square.king ? "2px solid gold" : "none",
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkers;
