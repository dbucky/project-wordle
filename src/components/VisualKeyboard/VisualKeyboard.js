import React from 'react';
import { KeyboardContext } from '../KeyboardProvider/KeyboardProvider';
import { Delete } from 'react-feather';

function VisualKeyboard({ handleKey }) {
  const customizations = {
    BACKSPACE: {
      wide: true,
      icon: Delete,
    },
    ENTER: {
      wide: true,
    },
  };
  const { keys } = React.useContext(KeyboardContext);

  React.useEffect(() => {
    function handleClick(event) {
      if (event.target.classList.contains('key')) {
        handleKey(event.target.ariaLabel || event.target.innerText);
      }
    }

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
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
              className={`key ${key.state}`}
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
