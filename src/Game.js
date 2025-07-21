import { useState } from "react";
import Board from "./Board";

//
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <HistoryButtons
          history={history}
          currentMove={currentMove}
          onTurnBackHistory={jumpTo}
        />
      </div>
    </div>
  );
}

function HistoryButtons({ history, currentMove, onTurnBackHistory }) {
  const [reversed, setReversed] = useState(false);

  const moves = history.map((squares, index) => {
    let description;
    if (index > 0) {
      description = "Go to move #" + index;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={index}>
        {index === currentMove ? (
          <div> {description} </div>
        ) : (
          <button onClick={() => onTurnBackHistory(index)}>
            {description}
          </button>
        )}
      </li>
    );
  });

  return (
    <>
      <button onClick={() => setReversed(!reversed)}>
        {reversed ? "Show Normal Order" : "Show Reverse Order"}
      </button>
      <ol reversed={reversed}>{reversed ? [...moves].reverse() : moves}</ol>
    </>
  );
}
