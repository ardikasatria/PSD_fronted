import React, { useState } from 'react';
import axios from 'axios';

const CreatePostModal = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/posts`, { title, content });
            onClose();
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Post</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;
