import React, { useState } from 'react';
import axios from 'axios';

const Sidebar = ({ topics }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/posts`, { title, content });
            setTitle('');
            setContent('');
            // Optionally, fetch topics again to update the list
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    return (
        <div className="flex flex-col max-md:items-center gap-5 min-w-[250px] md:w-[50%] md:pl-8 md:border-l border-grey md:sticky md:top-[100px] md:py-10">
            <h2>Buat Postingan</h2>
            <form onSubmit={handleSubmit} className="create-post-form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    required
                ></textarea>
                <button className='bg-light-green text-white' type="submit">Post</button>
            </form>
        </div>
    );
};

export default Sidebar;
