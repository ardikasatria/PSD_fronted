import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    return (
        <div className="blog-card">
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-snippet">{blog.content.substring(0, 100)}...</p>
            <div className="blog-info">
                <span className="blog-author">By: {blog.author.personal_info.username}</span>
                <span className="blog-date">Published: {new Date(blog.publishedAt).toLocaleDateString()}</span>
            </div>
            <Link to={`/blog/${blog.blog_id}`} className="blog-read-more">Read More</Link>
        </div>
    );
};

export default BlogCard;
