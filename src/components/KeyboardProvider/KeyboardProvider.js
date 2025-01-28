import React from 'react';

export const KeyboardContext = React.createContext();

function KeyboardProvider({ children }) {
  const [keys, setKeys] = React.useState(
    [
      { value: 'Q' },
      { value: 'W' },
      { value: 'E' },
      { value: 'R' },
      { value: 'T' },
      { value: 'Y' },
      { value: 'U' },
      { value: 'I' },
      { value: 'O' },
      { value: 'P' },
      { value: 'A' },
      { value: 'S' },
      { value: 'D' },
      { value: 'F' },
      { value: 'G' },
      { value: 'H' },
      { value: 'J' },
      { value: 'K' },
      { value: 'L' },
      { value: 'ENTER' },
      { value: 'Z' },
      { value: 'X' },
      { value: 'C' },
      { value: 'V' },
      { value: 'B' },
      { value: 'N' },
      { value: 'M' },
      { value: 'BACKSPACE' },
    ].map((key) => {
      key.state = 'unused';
      return key;
    })
  );

  function updateKeyboardState(guesses) {
    console.log({ guesses });
  }

  return (
    <KeyboardContext.Provider value={{ keys, updateKeyboardState }}>
      {children}
    </KeyboardContext.Provider>
  );
}

export default KeyboardProvider;
