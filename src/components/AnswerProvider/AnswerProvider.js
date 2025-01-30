import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';

export const AnswerContext = React.createContext();

function AnswerProvider({ children }) {
  function generateAnswer() {
    const answer = sample(WORDS);
    console.info({ answer });
    return answer;
  }

  const [answer, setAnswer] = React.useState(generateAnswer);

  function getNewAnswer() {
    setAnswer(generateAnswer);
  }

  return (
    <AnswerContext.Provider value={{ answer, getNewAnswer }}>
      {children}
    </AnswerContext.Provider>
  );
}

export default AnswerProvider;
