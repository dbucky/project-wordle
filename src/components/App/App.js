import Game from '../Game';
import Header from '../Header';

import KeyboardProvider from '../KeyboardProvider';

function App() {
  return (
    <KeyboardProvider>
      <div className="wrapper">
        <Header />
        <div className="game-wrapper">
          <Game />
        </div>
      </div>
    </KeyboardProvider>
  );
}

export default App;
