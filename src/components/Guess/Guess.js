import React from 'react';
import { range } from '../../utils';
import { NUM_OF_LETTERS_ALLOWED } from '../../constants';

function Guess({ guess }) {
  if (!guess) {
    guess = range(NUM_OF_LETTERS_ALLOWED).map((index) => {
      return { letter: undefined, status: undefined };
    });
  }
  return (
    <p className="guess">
      {guess.map(({ letter, status }, index) => {
        return (
          <span key={index} className={status ? `cell ${status}` : 'cell'}>
            {letter}
          </span>
        );
      })}
    </p>
  );
}

export default Guess;
