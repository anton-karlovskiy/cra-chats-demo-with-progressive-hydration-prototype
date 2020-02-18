
import React, { useState, useEffect } from 'react';

const Messages = ({ messages }) => {
  const [didHydrate, setDidHydrate] = useState(false);
  useEffect(() => {
    setDidHydrate(true);
  }, []);

  return (
    <div className={`frame ${didHydrate ? 'hydrated-js-color' : 'initial-html-color'}`}>
      <h1>
        Messages ({didHydrate ? 'Hydrated with JS' : 'Initial HTML'})
      </h1>
      <ul
        style={{
          width: 'max-content',
          margin: '0 auto'
        }}>
        {messages.map((message, index) => (
          <li
            key={index}
            
            className='text-align-left'>
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
