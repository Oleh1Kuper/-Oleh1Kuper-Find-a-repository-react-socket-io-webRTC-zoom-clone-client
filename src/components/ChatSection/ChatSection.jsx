import React from 'react';
import Messages from '../Messages/Messages';
import NewMessage from '../NewMessage/NewMessage';

function ChatSection() {
  return (
    <div className="chat_section_container">
      <div className="chat_label_container">
        <p className="chat_label_paragraph">Chat</p>
      </div>

      <Messages />
      <NewMessage />
    </div>
  );
}

export default ChatSection;
