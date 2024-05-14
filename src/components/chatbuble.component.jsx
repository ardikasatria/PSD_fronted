import React from 'react';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

const ChatBubble = ({ message, isUser }) => {
  const bubbleClasses = isUser
    ? 'bg-light-green text-white rounded-br-none self-end'
    : 'bg-grey text-black rounded-bl-none self-start';

  const tailClasses = isUser
    ? 'right-0 -mr-2 bg-light-green transform rotate-270'
    : 'left-0 -ml-2 bg-grey';

  // Added flex container class
  const containerClasses = isUser ? 'd-flex justify-content-end' : 'd-flex justify-content-start';

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
        toast.success('Text copied to clipboard');
      })
      .catch((error) => console.error('Could not copy text: ', error));
  };

  return (
    <div className={`${containerClasses} mb-2`}>
      <div className={`p-2 rounded-lg ${bubbleClasses} relative`}>
        <ReactMarkdown>{message}</ReactMarkdown>
        <div
          className={`w-4 h-4 absolute top-0 mt-2 rounded-bl-lg ${tailClasses}`}
        />
        {!isUser && (
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => handleCopy(message)}
          >
            <i className="fi fi-rr-copy-alt text-dark" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
