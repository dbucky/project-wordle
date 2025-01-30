import React from 'react';

import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

import { AnswerContext } from '../AnswerProvider';
import { GuessContext } from '../GuessProvider';
import { KeyboardContext } from '../KeyboardProvider';

import GuessHistory from '../GuessHistory/GuessHistory';
import GameResult from '../GameResult/GameResult';
import VisualKeyboard from '../VisualKeyboard/VisualKeyboard';

function Game() {
  const [gameState, setGameState] = React.useState('in-progress');

  const { getNewAnswer } = React.useContext(AnswerContext);
  const { guesses, addLetter, removeLetter, confirmGuess, clearGuesses } =
    React.useContext(GuessContext);
  const { updateKeyboardState, resetKeyboardState } =
    React.useContext(KeyboardContext);

  function handleKey(key) {
    // console.log({ key });
    switch (key) {
      case 'ENTER':
        if (confirmGuess()) {
          const lastGuess = guesses.at(-1);
          updateKeyboardState(lastGuess);
          console.log({ lastGuess });
          if (lastGuess.status === 'correct') {
            setGameState('won');
          } else if (guesses.length >= NUM_OF_GUESSES_ALLOWED) {
            setGameState('lost');
          }
        }
        break;
      case 'BACKSPACE':
        removeLetter();
        break;
      default:
        addLetter(key);
    }
  }

  function resetGame() {
    clearGuesses();
    resetKeyboardState();
    getNewAnswer();
    setGameState('in-progress');
  }

  return (
    <>
      <GuessHistory guesses={guesses} />
      <VisualKeyboard handleKey={handleKey} />
      <GameResult gameState={gameState} resetGame={resetGame} />
    </>
  );
}

export default Game;
