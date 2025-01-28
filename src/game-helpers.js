import { range } from './utils';
import { NUM_OF_LETTERS_ALLOWED } from './constants';

export function checkGuess(guess, answer) {
  // console.log({ checkGuess: guess });

  if (
    !guess ||
    guess.status === 'editing' ||
    guess.value.length < NUM_OF_LETTERS_ALLOWED
  ) {
    return range(NUM_OF_LETTERS_ALLOWED).map((index) => {
      if (guess?.value.length > index) {
        return { letter: guess.value[index], status: undefined };
      }

      return { letter: undefined, status: undefined };
    });
  }

  const guessChars = guess.value.split('');
  const answerChars = answer.split('');
  const result = [];

  for (let i = 0; i < guessChars.length; i++) {
    result[i] = {
      letter: guessChars[i],
    };

    if (guessChars[i] === answerChars[i]) {
      result[i].status = 'correct';
    } else {
      const misplacedIndex = answerChars.findIndex(
        (char) => char === guessChars[i]
      );
      if (misplacedIndex >= 0) {
        result[i].status = 'misplaced';
      } else {
        result[i].status = 'incorrect';
      }
    }
  }

  return result;
}
