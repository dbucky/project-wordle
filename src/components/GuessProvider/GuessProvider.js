import React from 'react';

import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { NUM_OF_LETTERS_ALLOWED } from '../../constants';

import { range } from '../../utils';

import { AnswerContext } from '../AnswerProvider';

export const GuessContext = React.createContext();

function GuessProvider({ children }) {
  const blankGuess = {
    letters: range(0, NUM_OF_LETTERS_ALLOWED).map((index) => ({
      value: undefined,
      status: 'unused',
    })),
    status: 'editing',
  };

  const [guesses, setGuesses] = React.useState([blankGuess]);

  const { answer } = React.useContext(AnswerContext);

  function addLetter(letter) {
    const nextGuesses = [...guesses];
    const lastGuess = nextGuesses.at(-1);
    console.log(`addLetter: ${letter}`);

    const firstBlankLetter = lastGuess.letters.find(
      ({ value }) => value === undefined
    );

    if (firstBlankLetter) {
      firstBlankLetter.value = letter;
      setGuesses(nextGuesses);
    }
  }

  function removeLetter() {
    console.log('removeLetter');
    const nextGuesses = [...guesses];
    const lastGuess = nextGuesses.at(-1);

    const lastDefinedLetter = lastGuess.letters.findLast(
      ({ value }) => value !== undefined
    );

    if (lastDefinedLetter) {
      lastDefinedLetter.value = undefined;
      setGuesses(nextGuesses);
    }
  }

  function confirmGuess() {
    console.log('confirmGuess');
    const nextGuesses = [...guesses];
    const lastGuess = nextGuesses.at(-1);

    if (!lastGuess.letters.some(({ value }) => value === undefined)) {
      lastGuess.status = 'confirmed';

      checkGuess(lastGuess);

      if (
        lastGuess.status !== 'correct' &&
        nextGuesses.length < NUM_OF_GUESSES_ALLOWED
      ) {
        nextGuesses.push(blankGuess);
      }

      setGuesses(nextGuesses);
      return true;
    }

    return false;
  }

  function checkGuess(guess) {
    const answerLetters = answer.split('');

    for (let i = 0; i < NUM_OF_LETTERS_ALLOWED; i++) {
      if (guess.letters[i].value === answerLetters[i]) {
        guess.letters[i].status = 'correct';
      } else {
        const misplacedIndex = answerLetters.findIndex(
          (char) => char === guess.letters[i].value
        );
        if (misplacedIndex >= 0) {
          guess.letters[i].status = 'misplaced';
        } else {
          guess.letters[i].status = 'incorrect';
        }
      }
    }

    if (!guess.letters.some(({ status }) => status !== 'correct')) {
      guess.status = 'correct';
    }
  }

  function clearGuesses() {
    console.log('clearGuesses');
    setGuesses([blankGuess]);
  }

  return (
    <GuessContext.Provider
      value={{
        guesses,
        addLetter,
        removeLetter,
        confirmGuess,
        clearGuesses,
        blankGuess,
      }}
    >
      {children}
    </GuessContext.Provider>
  );
}

export default GuessProvider;
