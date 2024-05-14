const TopicItem = ({ topic }) => {
    return (
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold">{topic.title}</h2>
        <p>{topic.content}</p>
        {/* Add more topic details as needed */}
      </div>
    );
  };
  
  export default TopicItem;
  