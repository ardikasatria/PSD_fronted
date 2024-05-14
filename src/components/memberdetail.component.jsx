import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MemberDetails = () => {
    const { username } = useParams();
    const [member, setMember] = useState(null);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/user/${username}`);
                setMember(response.data);
            } catch (error) {
                console.error('Error fetching member:', error);
            }
        };

        fetchMember();
    }, [username]);

    if (!member) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{member.fullname}</h1>
            <p>@{member.username}</p>
            <img src={member.profile_img} alt={member.fullname} />
            <p>Joined on: {member.joinedAt}</p>
        </div>
    );
};

export default MemberDetails;
