import React from 'react';
import { NUM_OF_LETTERS_ALLOWED } from '../../constants';

function GuessInput({ recordGuess, gameState }) {
  const [guess, setGuess] = React.useState('');

  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(event) => {
        event.preventDefault();
        recordGuess(guess);
        setGuess('');
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        disabled={gameState !== 'in-progress'}
        required
        maxLength={NUM_OF_LETTERS_ALLOWED}
        pattern={`[a-zA-Z]{${NUM_OF_LETTERS_ALLOWED}}`}
        title={`Enter a ${NUM_OF_LETTERS_ALLOWED} letter word`}
        value={guess}
        onChange={(event) => {
          let value = event.target.value.toUpperCase();
          setGuess(value);
        }}
      />
    </form>
  );
}

export default GuessInput;
