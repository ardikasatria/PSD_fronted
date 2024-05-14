import React from 'react';

const FollowerCard = ({ follower }) => {
    return (
        <div className="flex items-center gap-2 p-2 border-b border-gray-200">
            <img
                src={follower.personal_info.profile_img}
                alt={follower.personal_info.username}
                className="w-5 h-5 rounded-full object-cover"
            />
            <a href={`/user/${follower.personal_info.username}`} className="font-semibold text-md text-light-green">
                @{follower.personal_info.username}
            </a>
        </div>
    );
};

export default FollowerCard;

