export function checkGuess(guess, answer) {
  if (!guess) {
    return null;
  }

  const guessChars = guess.toUpperCase().split('');
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
