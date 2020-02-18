
import React, { useState, useEffect } from 'react';

const EmojiPicker = () => {
  const [count, setCount] = useState(0);
  const [didHydrate, setDidHydrate] = useState(false);
  useEffect(() => {
    setDidHydrate(true);
  }, []);

  return (
    <div className={`frame ${didHydrate ? 'hydrated-js-color' : 'initial-html-color'}`}>
      <h1>
        EmojiPicker ({didHydrate ? 'Hydrated with JS' : 'Initial HTML'})
      </h1>
      <button onClick={() => setCount(c => c + 1)}>
        Clicked on EmojiPicker {count} times
      </button>
    </div>
  );
};

export default EmojiPicker;
