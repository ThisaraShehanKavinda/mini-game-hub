import { Chess } from 'chess.js'; // Corrected import for Chess
import Chessboard from 'chessboardjs';
import React, { useCallback, useEffect, useState } from 'react';
import '../styles/chess.css'; // Custom CSS if needed

const ChessGame = () => {
  const [game, setGame] = useState(new Chess()); // Initializing the Chess game
  const [board, setBoard] = useState(null);

  // Define all functions outside useEffect to ensure they are stable and available for useEffect dependency array
  const handleMove = useCallback((from, to) => {
    const newGame = game; // Use the existing instance
    const move = newGame.move({ from, to });
    if (move === null) return 'snapback'; // Prevent invalid move
    setGame(newGame); // Update the game state
    return move;
  }, [game]);

  const onDragStart = useCallback((source, piece, position, orientation) => {
    // Block moves if the game is over or if it's not the player's turn
    if (game.game_over() || game.in_checkmate() || game.in_stalemate()) {
      return false;
    }
    if (piece.search(/^b/) !== -1 && game.turn() === 'w') {
      return false;
    }
    if (piece.search(/^w/) !== -1 && game.turn() === 'b') {
      return false;
    }
  }, [game]);

  const onMouseoverSquare = useCallback((square) => {
    const moves = game.legal_moves(); // Get all legal moves
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].startsWith(square)) {
        board.highlightSquare(moves[i].slice(1)); // Highlight valid moves
      }
    }
  }, [game, board]);

  const onMouseoutSquare = useCallback((square) => {
    board.unhighlightSquare(square); // Remove highlighting
  }, [board]);

  useEffect(() => {
    // Initialize the Chessboard.js instance
    const boardInstance = Chessboard('board1', {
      draggable: true,
      dropOffBoard: 'trash',
      sparePieces: true,
      onDrop: handleMove,
      onMouseoutSquare: onMouseoutSquare,
      onMouseoverSquare: onMouseoverSquare,
      onDragStart: onDragStart,
    });

    setBoard(boardInstance); // Set the board instance to use in other methods

    return () => {
      boardInstance.destroy(); // Clean up when the component unmounts
    };
  }, [handleMove, onDragStart, onMouseoutSquare, onMouseoverSquare]); // Adding functions as dependencies

  const handleReset = () => {
    game.reset(); // Reset the game
    board.start(); // Reset the board
    setGame(new Chess()); // Create a new Chess instance
  };

  const renderGameStatus = () => {
    let status = '';
    if (game.game_over()) {
      status = 'Game Over';
    } else {
      status = `Turn: ${game.turn() === 'b' ? 'Black' : 'White'}`;
    }
    return status;
  };

  return (
    <div className='chess-game'>
      <h2>Chess</h2>
      <div id='board1' className='chessboard-container'></div>
      <div className='game-status'>
        <p>{renderGameStatus()}</p>
        <button onClick={handleReset}>Reset Game</button>
      </div>
    </div>
  );
};

export default ChessGame;
