import React from 'react';
import { Link } from 'react-router-dom';

const UserCard2 = ({ users }) => {
    return (
        <div className="user-card-list">
            {users && users.filter(user => user && user.personal_info && user.personal_info.username).map((user, index) => (
                <div key={index} className="user-card">
                    {user.personal_info.profile_img && (
                        <img src={user.personal_info.profile_img} alt={user.personal_info.username} className="user-profile-img" />
                    )}
                    <Link to={`/user/${user.personal_info.username}`} className="user-username">
                        {user.personal_info.username}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default UserCard2;
