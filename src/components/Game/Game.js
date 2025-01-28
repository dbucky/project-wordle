import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { NUM_OF_LETTERS_ALLOWED } from '../../constants';

import { KeyboardContext } from '../KeyboardProvider';

import GuessHistory from '../GuessHistory/GuessHistory';
import GameResult from '../GameResult/GameResult';
import VisualKeyboard from '../VisualKeyboard/VisualKeyboard';

export const AnswerContext = React.createContext();

function Game() {
  const blankGuess = {
    value: '',
    status: 'editing',
  };
  const [guesses, setGuesses] = React.useState([blankGuess]);
  const [answer, setAnswer] = React.useState(() => {
    const answer = sample(WORDS);
    console.info({ answer });
    return answer;
  });
  const [gameState, setGameState] = React.useState('in-progress');

  const { updateKeyboardState } = React.useContext(KeyboardContext);

  function handleKey(key) {
    // console.log({ key });

    const nextGuesses = [...guesses];
    const lastGuess = nextGuesses.at(-1);

    switch (key) {
      case 'ENTER':
        if (lastGuess.value.length === NUM_OF_LETTERS_ALLOWED) {
          lastGuess.status = 'confirmed';
        }
        break;
      case 'BACKSPACE':
        if (lastGuess.value.length > 0 && lastGuess.status === 'editing') {
          lastGuess.value = lastGuess.value.substring(
            0,
            lastGuess.value.length - 1
          );
        }
        break;
      default:
        if (lastGuess.value.length < NUM_OF_LETTERS_ALLOWED) {
          lastGuess.value += key;
        }
    }

    nextGuesses[nextGuesses.length - 1] = lastGuess;

    if (lastGuess.status === 'confirmed') {
      updateKeyboardState(guesses);

      if (lastGuess.value === answer) {
        setGameState('won');
      } else if (nextGuesses.length < NUM_OF_GUESSES_ALLOWED) {
        nextGuesses.push(blankGuess);
      } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
        setGameState('lost');
      }
    }

    setGuesses(nextGuesses);
  }

  function resetGame() {
    setGuesses([blankGuess]);
    const answer = sample(WORDS);
    console.info({ answer });
    setAnswer(answer);
    setGameState('in-progress');
  }

  return (
    <AnswerContext.Provider value={answer}>
      <GuessHistory guesses={guesses} />
      <VisualKeyboard handleKey={handleKey} />
      <GameResult
        gameState={gameState}
        answer={answer}
        guessCount={guesses.length}
        resetGame={resetGame}
      />
    </AnswerContext.Provider>
  );
}

export default Game;
