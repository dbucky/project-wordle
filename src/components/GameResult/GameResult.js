import React from 'react';

function GameResult({ gameState, answer, guessCount, resetGame }) {
  if (gameState === 'in-progress') {
    return;
  }

  return gameState === 'won' ? (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in{' '}
        <strong>{guessCount} guesses</strong>.
      </p>
      <button onClick={resetGame}>Play Again!</button>
    </div>
  ) : (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
      <button onClick={resetGame}>Try Again?</button>
    </div>
  );
}

export default GameResult;
