import React from 'react';
import Guess from '../Guess/Guess';
import { range } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

function GuessHistory({ guesses }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((index) => {
        const guess = index < guesses.length ? guesses[index] : undefined;
        return <Guess key={index} guess={guess} />;
      })}
    </div>
  );
}

export default GuessHistory;
