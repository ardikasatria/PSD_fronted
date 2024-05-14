import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfilePage2 = () => {
    const [profileId, setProfileId] = useState('65ee03210eb1052b1de0a8f7'); // Contoh ID pengguna
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const response = await axios.get(`/following/${profileId}`);
                setFollowing(response.data);
            } catch (error) {
                console.error('Failed to fetch following:', error);
            }
        };

        const fetchFollowers = async () => {
            try {
                const response = await axios.get(`/followers/${profileId}`);
                setFollowers(response.data);
            } catch (error) {
                console.error('Failed to fetch followers:', error);
            }
        };

        fetchFollowing();
        fetchFollowers();
    }, [profileId]);

    return (
        <div>
            <h2>Profile</h2>
            <div>
                <h3>Following</h3>
                <ul>
                    {following.map(followingUser => (
                        <li key={followingUser._id}>
                            <Link to={`/user/${followingUser.personal_info.username}`}>
                                {followingUser.personal_info.username}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Followers</h3>
                <ul>
                    {followers.map(follower => (
                        <li key={follower._id}>
                            <Link to={`/user/${follower.personal_info.username}`}>
                                {follower.personal_info.username}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProfilePage2;
