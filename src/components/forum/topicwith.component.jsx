import { useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const TopicItemWithVote = ({ topic }) => {
  const [votes, setVotes] = useState(topic.votes || 0);

  const handleUpvote = () => {
    setVotes(votes + 1);
    // Call your API to update the votes in the backend
  };

  const handleDownvote = () => {
    setVotes(votes - 1);
    // Call your API to update the votes in the backend
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
      <p className="mb-4">{topic.summary}</p>
      <div className="flex items-center space-x-2">
        <button
          className="bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center"
          onClick={handleUpvote}
        >
          <FaThumbsUp />
        </button>
        <span>{votes}</span>
        <button
          className="bg-red-500 text-white p-2 rounded-lg flex items-center justify-center"
          onClick={handleDownvote}
        >
          <FaThumbsDown />
        </button>
      </div>
    </div>
  );
};

export default TopicItemWithVote;
