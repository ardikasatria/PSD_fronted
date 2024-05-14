import React, { useState } from "react";
import ChatBubble from './chatbuble.component';

function ChatHistorySidebar({ messages, onChatButtonClick }) {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleClick = (chat) => {
    setSelectedChat(chat);
    onChatButtonClick(chat);
  };

  return (
    <div className="chat-history-sidebar">
      {messages.map((msg, i) => (
        <button key={i} onClick={() => handleClick(msg)}>{msg.substring(0, 2)}</button>
      ))}
      {selectedChat && <ChatBubble message={selectedChat.message} isUser={selectedChat.isUser} />}
    </div>
  );
}

export default ChatHistorySidebar;
