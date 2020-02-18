
import React, { useState, useEffect } from 'react';

const MessageForm = () => {
  const [count, setCount] = useState(0);
  const [didHydrate, setDidHydrate] = useState(false);
  useEffect(() => {
    setDidHydrate(true);
  }, []);

  return (
    <div className={`frame ${didHydrate ? 'hydrated-js-color' : 'initial-html-color'}`}>
      <h1>
        MessageForm ({didHydrate ? 'Hydrated with JS' : 'Initial HTML'})
      </h1>
      <button onClick={() => setCount(c => c + 1)}>
        Clicked on MessageForm {count} times
      </button>
    </div>
  );
};

export default MessageForm;
