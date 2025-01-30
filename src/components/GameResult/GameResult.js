import React from 'react';

import { AnswerContext } from '../AnswerProvider';
import { GuessContext } from '../GuessProvider';

function GameResult({ gameState, resetGame }) {
  const { answer } = React.useContext(AnswerContext);
  const { guesses } = React.useContext(GuessContext);

  if (gameState === 'in-progress') {
    return;
  }

  return gameState === 'won' ? (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in{' '}
        <strong>{guesses.length} guesses</strong>.
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
