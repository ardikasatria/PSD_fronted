import React, { useState } from 'react';
import axios from 'axios';
import ChatBubble from './chatbuble.component';
import ChatInput from './chatinput.component';
import config from '../config';

const QuestionPage = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message, isUser) => {
    setMessages((prevMessages) => [...prevMessages, { message, isUser }]);
  };

  const sendMessage = async (message) => {
    addMessage(message, true);

    try {
      const response = await axios.post(
        `${config.apiUrl}`,
        {
          prompt:
            'only respond to new message. previous messages: ' +
            messages.map((msg) => msg.message).join(', ') +
            ', new message:' +
            message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const chatGptResponse = response.data;
      addMessage(chatGptResponse, false);
    } catch (error) {
      console.error('Error fetching data response:', error);
      addMessage('Error: Unable to fetch data', false);
    }
  };

  return (
    <div>
      <h1 className='text-4x1 text-center pt-5'>Tanya Apa Saja disini...</h1>
      <div className="mx-auto my-10 p-8 bg-white shadow-md rounded-xl w-full max-w-2xl">
        <div className="chat-messages h-96">
          {messages.map((msg, i) => (
            <ChatBubble key={i} message={msg.message} isUser={msg.isUser} />
          ))}
        </div>
        <div className="chat-input mt-6">
          <ChatInput onSubmit={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
