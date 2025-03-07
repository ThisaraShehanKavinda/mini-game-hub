import React from "react";

const GameSelection = ({ games = [], onSelect }) => {
  if (!Array.isArray(games)) {
    console.error("Expected 'games' to be an array but received:", typeof games);
    return <div>No games available</div>;
  }

  if (games.length === 0) {
    return <p>No games available to select</p>;
  }

  return (
    <div className="game-selection">
      {games.map((game, index) => (
        <div key={game.name} className="game-item"> {/* Use 'game.name' as a key */}
          <h3>{game.name}</h3>
          <button onClick={() => onSelect(game)}>
            Play {game.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default GameSelection;
