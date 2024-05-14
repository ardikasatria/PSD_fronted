// Sidebar.js

import { Link } from "react-router-dom";

const Sidebar = ({ latestBlogs }) => {
    return (
        <div className="w-64 bg-gray-200 p-4">
            <h2 className="text-xl font-semibold mb-4">Latest Blogs</h2>
            <ul>
                {latestBlogs.map(blog => (
                    <li key={blog.id}>
                     <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))} 
            </ul>
        </div>
    );
}

export default Sidebar;
