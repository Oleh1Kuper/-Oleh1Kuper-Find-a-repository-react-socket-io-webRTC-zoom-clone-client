import React, { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { sendMessageUsingDataChannel } from '../../utils/webRTCHandler';

function NewMessage() {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message.length) {
      sendMessageUsingDataChannel(message);
      setMessage('');
    }
  };

  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      sendMessage();
    }
  };

  return (
    <div className="new_message_container">
      <input
        className="new_message_input"
        value={message}
        onChange={handleChange}
        placeholder="Type your message ..."
        type="text"
        onKeyDown={handleKeyPressed}
      />

      <IoIosSend className="new_message_button" onClick={sendMessage} />
    </div>
  );
}

export default NewMessage;
