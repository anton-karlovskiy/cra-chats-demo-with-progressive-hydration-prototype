
import React, { useState, useEffect, useTransition } from 'react';

const MessageForm = ({ addMessage }) => {
  const [messageCount, setMessageCount] = useState(0);
  const [message, setMessage] = useState('');
  const [didHydrate, setDidHydrate] = useState(false);
  useEffect(() => {
    setDidHydrate(true);
  }, []);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 500
  });

  const onSubmitHandler = event => {
    event.preventDefault();
    startTransition(() => {
      if (message) {
        addMessage(message);
        setMessageCount(prevMessageCount => prevMessageCount + 1);
        setMessage('');
      }
    });
  };

  const onChangeHandler = event => {
    setMessage(event.target.value);
  };

  return (
    <form
      className={`frame ${didHydrate ? 'hydrated-js-color' : 'initial-html-color'}`}
      onSubmit={onSubmitHandler}>
      <h1>
        MessageForm ({didHydrate ? 'Hydrated with JS' : 'Initial HTML'})
      </h1>
      <p>{messageCount} message(s) have been sent!</p>
      <input
        type='text'
        name='message'
        onChange={onChangeHandler}
        value={message || ''} />
      <button
        disabled={isPending}
        type='submit'>
        Send Message
      </button>
    </form>
  );
};

export default MessageForm;
