import React from 'react';
import { KeyboardContext } from '../KeyboardProvider/KeyboardProvider';
import { Delete } from 'react-feather';

const customizations = {
  BACKSPACE: {
    wide: true,
    icon: Delete,
  },
  ENTER: {
    wide: true,
  },
};

function VisualKeyboard({ handleKey }) {
  const { keys } = React.useContext(KeyboardContext);

  React.useEffect(() => {
    function handleClick(event) {
      if (event.target.classList.contains('key')) {
        handleKey(event.target.ariaLabel || event.target.innerText);
      }
    }

    function handleKeydown(event) {
      const key = event.key.toUpperCase();

      switch (key) {
        case 'BACKSPACE':
        case 'ENTER':
          handleKey(key);
          break;
        default:
          if (/^[A-Z]$/.test(key)) {
            handleKey(key);
          }
      }
    }

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKey]);

  function renderKeys(keys) {
    return (
      <div className="row">
        {keys.map((key) => {
          const IconTag = customizations[key.value]?.icon;
          return (
            <button
              key={key.value}
              className={`key ${key.status}`}
              style={{
                width: customizations[key.value]?.wide ? '16%' : undefined,
              }}
              aria-label={IconTag ? key.value : undefined}
            >
              {IconTag ? <IconTag size={24} /> : key.value}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="visual-keyboard">
      {renderKeys(keys.slice(0, 10))}
      {renderKeys(keys.slice(10, 19))}
      {renderKeys(keys.slice(19))}
    </div>
  );
}

export default VisualKeyboard;
