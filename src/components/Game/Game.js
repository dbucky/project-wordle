import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { checkGuess } from '../../game-helpers';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

import GuessInput from '../GuessInput';
import GuessHistory from '../GuessHistory/GuessHistory';
import GameResult from '../GameResult/GameResult';

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [answer, setAnswer] = React.useState(() => {
    const answer = sample(WORDS);
    console.info({ answer });
    return answer;
  });
  const [gameState, setGameState] = React.useState('in-progress');

  function recordGuess(guess) {
    const nextGuesses = [...guesses, checkGuess(guess, answer)];
    setGuesses(nextGuesses);

    if (guess === answer) {
      setGameState('won');
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameState('lost');
    }
  }

  function resetGame() {
    setGuesses([]);
    const answer = sample(WORDS);
    console.info({ answer });
    setAnswer(answer);
    setGameState('in-progress');
  }

  return (
    <>
      <GuessHistory guesses={guesses} />
      <GuessInput recordGuess={recordGuess} gameState={gameState} />
      <GameResult
        gameState={gameState}
        answer={answer}
        guessCount={guesses.length}
        resetGame={resetGame}
      />
    </>
  );
}

export default Game;
