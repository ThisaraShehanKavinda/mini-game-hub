import { Chess } from "chess.js";
import React, { useCallback, useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import "../styles/chess.css"; // Import your custom styles

// AI Opponent (Simple AI)
const getAIMove = (game, difficulty) => {
  if (difficulty === "easy") {
    return getRandomMove(game);
  } else if (difficulty === "medium") {
    return getBestMove(game, 3); // Basic minimax implementation
  } else if (difficulty === "hard") {
    return getBestMove(game, 5); // Deeper minimax
  }
};

const getRandomMove = (game) => {
  const moves = game.legal_moves();
  return moves[Math.floor(Math.random() * moves.length)];
};

const getBestMove = (game, depth) => {
  const moves = game.legal_moves();
  let bestMove = null;
  let bestValue = -Infinity;

  moves.forEach((move) => {
    game.ugly_move(move);
    let boardValue = minimax(game, depth, -Infinity, Infinity, true);
    game.undo();
    if (boardValue > bestValue) {
      bestValue = boardValue;
      bestMove = move;
    }
  });

  return bestMove;
};

const minimax = (game, depth, alpha, beta, isMaximizingPlayer) => {
  if (depth === 0) return evaluateBoard(game.board());

  const moves = game.legal_moves();
  let bestMove;

  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    moves.forEach((move) => {
      game.ugly_move(move);
      const evaluation = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) return;
    });
    return maxEval;
  } else {
    let minEval = Infinity;
    moves.forEach((move) => {
      game.ugly_move(move);
      const evaluation = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) return;
    });
    return minEval;
  }
};

const evaluateBoard = (board) => {
  let score = 0;
  board.forEach((row) => {
    row.forEach((square) => {
      if (square && square.type === "p") score += 1;
      if (square && square.type === "r") score += 5;
      if (square && square.type === "n") score += 3;
      if (square && square.type === "b") score += 3;
      if (square && square.type === "q") score += 9;
      if (square && square.type === "k") score += 100;
    });
  });
  return score;
};

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());  // Initialize the game state
  const [winner, setWinner] = useState(null); // Track winner
  const [gameHistory, setGameHistory] = useState([]); // Game history for move undo
  const [playerNames, setPlayerNames] = useState({ player1: "", player2: "" }); // Player names
  const [score, setScore] = useState({ player1: 0, player2: 0 }); // Points tracking
  const [isAI, setIsAI] = useState(false); // AI mode toggle
  const [aiDifficulty, setAIDifficulty] = useState("easy"); // AI difficulty level
  const [isGameOver, setIsGameOver] = useState(false); // Track if game is over

  const handleMove = useCallback((from, to) => {
    const newGame = { ...game };
    const move = newGame.move({ from, to });
    if (move === null) return "snapback"; // Prevent invalid moves
    setGame(newGame);
    setGameHistory([...gameHistory, newGame]);

    if (newGame.game_over()) {
      setIsGameOver(true);
      setWinner(newGame.turn() === "w" ? "Black" : "White");
      updateScore(newGame.turn() === "w" ? "player1" : "player2");
    }
  }, [game, gameHistory]);

  useEffect(() => {
    if (isAI && !game.game_over() && game.turn() === "b") {
      const aiMove = getAIMove(game, aiDifficulty);
      handleMove(aiMove.from, aiMove.to); // Let AI play
    }
  }, [game, isAI, aiDifficulty, handleMove]);

  const handleReset = () => {
    setGame(new Chess()); // Reset the game state
    setIsGameOver(false);
    setWinner(null);
    setGameHistory([]);
  };

  const updateScore = (winner) => {
    setScore((prevScore) => ({
      ...prevScore,
      [winner]: prevScore[winner] + 1,
    }));
  };

  const handleNameChange = (player, name) => {
    setPlayerNames({ ...playerNames, [player]: name });
  };

  const renderGameStatus = () => {
    if (isGameOver) {
      return `Game Over - ${winner} wins!`;
    } else {
      return `Turn: ${game.turn() === "b" ? "Black" : "White"}`;
    }
  };

  return (
    <div className="chess-game">
      <h2>Chess - {renderGameStatus()}</h2>

      {/* Player Names */}
      <div className="name-inputs">
        <input
          type="text"
          placeholder="Player 1 Name"
          value={playerNames.player1}
          onChange={(e) => handleNameChange("player1", e.target.value)}
        />
        <input
          type="text"
          placeholder="Player 2 Name"
          value={playerNames.player2}
          onChange={(e) => handleNameChange("player2", e.target.value)}
        />
      </div>

      {/* Chessboard */}
      <div id="board1" className="chessboard-container">
        <Chessboard position={game.fen()} onDrop={(from, to) => handleMove(from, to)} />
      </div>

      {/* AI Difficulty Selector */}
      {isAI && (
        <div className="difficulty-selector">
          <select
            value={aiDifficulty}
            onChange={(e) => setAIDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      )}

      {/* Points and Controls */}
      <div className="controls">
        <p>Player 1 (White) - {playerNames.player1} : {score.player1}</p>
        <p>Player 2 (Black) - {playerNames.player2} : {score.player2}</p>

        <button onClick={handleReset}>Reset Game</button>
        <button onClick={() => setIsAI(!isAI)}>
          {isAI ? "Play vs Player" : "Play vs AI"}
        </button>
      </div>

      {/* Celebration overlay */}
      {winner && (
        <div className="celebration-overlay">
          <h2>Congratulations {winner}!</h2>
          <div className="celebration-animation">
            {/* Add celebration animations here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChessGame;
