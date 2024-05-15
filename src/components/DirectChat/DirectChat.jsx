import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MessagesContainer from '../MessagesContainer/MessagesContainer';
import DirectMessage from '../DirectMessage/DirectMessage';

const getDirectChatHistory = (directChatHistory, socketId = null) => {
  if (!socketId || !directChatHistory) {
    return [];
  }

  const history = directChatHistory.find((h) => h.socketId === socketId);

  return history ? history.chatHistory : [];
};

function DirectChat() {
  const [messages, setMessages] = useState([]);
  const { directChatHistory, activeConversation } = useSelector(
    (state) => state.room,
  );

  useEffect(() => {
    setMessages(
      getDirectChatHistory(
        directChatHistory,
        activeConversation ? activeConversation.socketId : null,
      ),
    );
  }, [activeConversation, directChatHistory]);

  return (
    <div className="direct_chat_container">
      <div className="direct_chat_header">
        <p className="direct_chat_header_paragraph">
          {activeConversation ? activeConversation.username : ''}
        </p>
      </div>

      <MessagesContainer messages={messages} />

      <DirectMessage />

      {!activeConversation && (
        <div className="conversation_not_chosen_overlay">
          <p className="conversation_not_chosen_overlay_text">
            Conversation not chosen
          </p>
        </div>
      )}
    </div>
  );
}

export default DirectChat;
