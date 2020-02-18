
import React, { Suspense, lazy, useState } from 'react';
import RealMessages from './components/Messages';
import RealMessageForm from './components/MessageForm';
import RealEmojiPicker from './components/EmojiPicker';

const getApp = isSimulatingNetwork => {
  let Messages;
  let MessageForm;

  if (isSimulatingNetwork) {
    Messages = lazy(
      () =>
        new Promise(resolve => {
          window.resolveMessages = () => {
            resolve({default: RealMessages});
          };
        })
    );
    MessageForm = lazy(
      () =>
        new Promise(resolve => {
          window.resolveMessageForm = () => {
            resolve({default: RealMessageForm});
          };
        })
    );
  } else {
    Messages = RealMessages;
    MessageForm = RealMessageForm;
  }

  const App = () => {
    const [messages, setMessages] = useState(['Default message #1.', 'Default message #2.']);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const addMessageHandler = message => {
      if (message) {
        setMessages(prevMessages => ([...prevMessages, message]));
      }
    };

    return (
      <div className='app'>
        <h1>React Progressive Hydration Chats Demo*</h1>
        <h3>
          <i>* very experimental — likely contains bugs.</i>
        </h3>
        <h2>
          This app is server-rendered to HTML.{' '}Concurrent Mode lets us hydrate parts of UI without waiting for <i>all</i> JS to load.
        </h2>
        <Suspense fallback={<h2>Loading Messages...</h2>}>
          <Messages messages={messages} />
        </Suspense>
        <Suspense fallback={<h2>Loading MessageForm...</h2>}>
          <MessageForm addMessage={addMessageHandler} />
        </Suspense>
        {isEmojiPickerOpen && (
          <Suspense fallback={<h2>Loading EmojiPicker...</h2>}>
            <RealEmojiPicker />
          </Suspense>
        )}
      </div>
    );
  };

  return App;
};

export default getApp;