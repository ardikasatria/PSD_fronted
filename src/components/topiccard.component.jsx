import React from "react";

const TopicCard = ({ topic }) => {
    const { title, views, votes, createdAt } = topic;

    return (
        <div className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="flex justify-between mt-2 text-gray-500">
                <span>{views} views</span>
                <span>{votes} votes</span>
                <span>{new Date(createdAt).toLocaleString()}</span>
            </div>
        </div>
    );
};

export default TopicCard;
