import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { Toaster } from 'react-hot-toast';
import Loader from '../components/loader.component';
import NoDataMessage from '../components/nodata.component';
import AnimationWrapper from '../common/page-animation';
import { debounce } from 'lodash';
import MemberCard from './membercard.component';

const MembersPage = () => {
    const [members, setMembers] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('newest');
    const { userAuth } = useContext(UserContext);

    const fetchMembers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_DOMAIN}/search-members`,
                { query },
                {
                    headers: {
                        Authorization: `Bearer ${userAuth.access_token}`,
                    },
                }
            );
            setMembers(response.data.users);
        } catch (error) {
            console.error('Error fetching members:', error);
            setError('Failed to fetch members. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [userAuth, query]);

    useEffect(() => {
        if (userAuth.access_token) {
            fetchMembers();
        }
    }, [userAuth, query, fetchMembers]);

    const handleSearch = useCallback(
        debounce((e) => {
            setQuery(e.target.value);
        }, 300),
        []
    );

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const sortedMembers = [...members].sort((a, b) => {
        if (sortOption === 'alphabetical') {
            return a.personal_info.username.localeCompare(b.personal_info.username);
        }
        return new Date(b.joinedAt) - new Date(a.joinedAt); // Default to 'newest'
    });

    return (
        <AnimationWrapper>
            <div>
                <div className="container mx-auto px-4">
                    <Toaster />
                    <div className="flex items-center my-4">
                        <h1 className="text-2xl font-semibold justify-left">Member</h1>
                        <div className="ml-4 bg-light-green text-white text-xl px-4 py-2 rounded-full">
                            Total: {members.length}
                        </div>
                        <div className="ml-auto">
                            <select value={sortOption} onChange={handleSortChange} className="bg-grey p-2 rounded-md">
                                <option value="newest">Newest First</option>
                                <option value="alphabetical">A-Z</option>
                            </select>
                        </div>
                    </div>
                    <input
                        type="text"
                        className="w-full bg-grey p-4 pl-12 pr-6 rounded-full placeholder:text-dark-grey"
                        placeholder="Search members"
                        onChange={handleSearch}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <NoDataMessage message={error} />
                    ) : (
                        sortedMembers.map((member, index) => (
                            <AnimationWrapper key={index} transition={{ delay: index * 0.1 }}>
                                <Link to={`/user/${member.personal_info.username}`}>
                                    <MemberCard member={member} />
                                </Link>
                            </AnimationWrapper>
                        ))
                    )}
                </div>
            </div>
        </AnimationWrapper>
    );
};

export default MembersPage;
