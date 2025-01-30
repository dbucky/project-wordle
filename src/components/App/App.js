import AnswerProvider from '../AnswerProvider';
import GuessProvider from '../GuessProvider';
import KeyboardProvider from '../KeyboardProvider';

import Game from '../Game';
import Header from '../Header';

function App() {
  return (
    <AnswerProvider>
      <GuessProvider>
        <KeyboardProvider>
          <div className="wrapper">
            <Header />
            <div className="game-wrapper">
              <Game />
            </div>
          </div>
        </KeyboardProvider>
      </GuessProvider>
    </AnswerProvider>
  );
}

export default App;
