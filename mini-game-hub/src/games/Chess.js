import { Chess } from 'chess.js'; // Import chess.js for game logic
import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard'; // Import the Chessboard component
import '../styles/chess.css'; // Import your custom styles

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());  // Initialize the game state

  // Handle the move logic
  const handleMove = (from, to) => {
    const newGame = { ...game };
    const move = newGame.move({ from, to });
    if (move === null) return 'snapback'; // Prevent invalid moves
    setGame(newGame); // Update the game state
  };

  // Reset the game
  const handleReset = () => {
    setGame(new Chess()); // Create a new Chess instance
  };

  const renderGameStatus = () => {
    console.log(game); // Inspect the game object to ensure it's a valid Chess instance
    let status = '';
    if (typeof game.game_over === 'function' && game.game_over()) {
      status = 'Game Over';
    } else {
      status = `Turn: ${game.turn() === 'b' ? 'Black' : 'White'}`;
    }
    return status;
  };

  return (
    <div className='chess-game'>
      <h2>Chess</h2>
      <div id='board1' className='chessboard-container'>
        {/* Use the Chessboard component from react-chessboard */}
        <Chessboard
          position={game.fen()}  // Pass the game state in Forsyth-Edwards notation (FEN)
          onDrop={handleMove}  // Handle the move when a piece is dropped
        />
      </div>
      <div className='game-status'>
        <p>{renderGameStatus()}</p>
        <button onClick={handleReset}>Reset Game</button>
      </div>
    </div>
  );
};

export default ChessGame;
