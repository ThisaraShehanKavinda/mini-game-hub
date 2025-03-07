import Chess from "chess.js";
import Chessboard from "chessboardjs";
import "chessboardjs/dist/chessboard-1.0.0.min.css"; // Import Chessboard CSS
import React, { useEffect, useState } from "react";
import "../styles/chess.css"; // Custom CSS if needed

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardInstance = Chessboard("board1", {
      draggable: true,
      dropOffBoard: "trash",
      sparePieces: true,
      onDrop: handleMove,
      onMouseoutSquare: onMouseoutSquare,
      onMouseoverSquare: onMouseoverSquare,
      onDragStart: onDragStart,
    });

    setBoard(boardInstance);

    return () => {
      boardInstance.destroy();
    };
  }, []);

  // Handle move after a piece is dropped
  const handleMove = (from, to) => {
    const newGame = { ...game };
    const move = newGame.move({ from, to });
    if (move === null) return "snapback";
    setGame(newGame);
    return move;
  };

  // Handle dragging start - prevent moving pieces of the wrong color
  const onDragStart = (source, piece, position, orientation) => {
    if (game.in_checkmate() === true || game.in_stalemate() === true) {
      return false;
    }
    if (piece.search(/^b/) !== -1 && game.turn() === "w") {
      return false;
    }
    if (piece.search(/^w/) !== -1 && game.turn() === "b") {
      return false;
    }
  };

  // Highlight possible squares when a piece is hovered
  const onMouseoverSquare = (square) => {
    const moves = game.legal_moves();
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].startsWith(square)) {
        board.highlightSquare(moves[i].slice(1));
      }
    }
  };

  const onMouseoutSquare = (square) => {
    board.unhighlightSquare(square);
  };

  const handleReset = () => {
    game.reset();
    board.start();
    setGame(new Chess());
  };

  const renderGameStatus = () => {
    let status = "";
    if (game.game_over()) {
      status = "Game Over";
    } else {
      status = `Turn: ${game.turn() === "b" ? "Black" : "White"}`;
    }
    return status;
  };

  return (
    <div className="chess-game">
      <h2>Chess</h2>
      <div id="board1" className="chessboard-container"></div>
      <div className="game-status">
        <p>{renderGameStatus()}</p>
        <button onClick={handleReset}>Reset Game</button>
      </div>
    </div>
  );
};

export default ChessGame;
