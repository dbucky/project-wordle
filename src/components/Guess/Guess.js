import React from 'react';
import { checkGuess } from '../../game-helpers';

import { AnswerContext } from '../Game';

function Guess({ guess }) {
  const answer = React.useContext(AnswerContext);

  // console.log({ guess });

  const checkedGuess = checkGuess(guess, answer);

  // console.log({ guess, checkedGuess });

  return (
    <p className="guess">
      {checkedGuess.map(({ letter, status }, index) => {
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
