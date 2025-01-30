import React from 'react';

export const KeyboardContext = React.createContext();

const letterStatusPriority = ['unused', 'incorrect', 'misplaced', 'correct'];

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
      key.status = 'unused';
      return key;
    })
  );

  function updateKeyboardState(guess) {
    console.log('updateKeyboardState', guess);

    let changed = false;
    const nextKeys = [...keys];

    guess.letters.forEach(({ value, status }) => {
      const key = nextKeys.find((x) => x.value === value);

      if (
        letterStatusPriority.indexOf(status) >
        letterStatusPriority.indexOf(key.status)
      ) {
        key.status = status;
        changed = true;
      }
    });

    if (changed) {
      setKeys(nextKeys);
    }
  }

  function resetKeyboardState() {
    const nextKeys = [...keys];
    setKeys(
      nextKeys.map((key) => {
        key.status = 'unused';
        return key;
      })
    );
  }

  return (
    <KeyboardContext.Provider
      value={{ keys, updateKeyboardState, resetKeyboardState }}
    >
      {children}
    </KeyboardContext.Provider>
  );
}

export default KeyboardProvider;
