import React, { useState } from 'react';

const HelloWorld = () => {
  const [message, setMessage] = useState('Hello, World!');
  
  const toggleMessage = () => {
    setMessage(message === 'Hello, World!' ? 'You clicked the button!' : 'Hello, World!');
  };
  
  return (
    <div>
      <h1>{message}</h1>
      <button onClick={toggleMessage}>Toggle Message</button>
    </div>
  );
};

export default HelloWorld;