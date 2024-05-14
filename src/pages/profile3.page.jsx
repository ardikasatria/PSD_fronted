import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import Loader from '../components/loader.component';
import ProfileCard from '../components/profilecard.component';
import BlogCard from '../components/blogcard.component'; // Update this to your blog card component

const ProfilePage4 = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userAuth } = useContext(UserContext);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/user/${username}`, {
                    headers: { Authorization: `Bearer ${userAuth.access_token}` },
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Failed to fetch profile. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        const getBlogs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/get-blogs`, {
                    headers: { Authorization: `Bearer ${userAuth.access_token}` },
                });
                setBlogs(response.data.blogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        if (userAuth.access_token) {
            fetchProfile();
            getBlogs();
        }
    }, [username, userAuth]);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;
    if (!profile) return <div>Profile not found</div>;

    return (
        <div>
            <ProfileCard profile={profile} />
            <div>
                <h2>{profile.personal_info.username}'s Blogs</h2>
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))
                ) : (
                    <p>No blogs found.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage4;
