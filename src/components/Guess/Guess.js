import React from 'react';

import { GuessContext } from '../GuessProvider';

function Guess({ guess }) {
  const { blankGuess } = React.useContext(GuessContext);

  return (
    <p className="guess">
      {(guess || blankGuess).letters.map(({ value, status }, index) => {
        return (
          <span key={index} className={status ? `cell ${status}` : 'cell'}>
            {value}
          </span>
        );
      })}
    </p>
  );
}

export default Guess;
