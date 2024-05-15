import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosSend } from 'react-icons/io';
import { sendDirectMessage } from '../../socket/socket';

function DirectMessage() {
  const [message, setMessage] = useState('');
  const { activeConversation, username } = useSelector((state) => state.room);

  const sendMessage = () => {
    sendDirectMessage({
      receiverSocketId: activeConversation.socketId,
      username,
      messageContent: message,
    });

    setMessage('');
  };

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="new_message_container new_message_direct_border">
      <input
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder="Type your message.."
        type="text"
        onKeyDown={handleKeyPressed}
      />
      <IoIosSend className="new_message_button" onClick={sendMessage} />
    </div>
  );
}

export default DirectMessage;
