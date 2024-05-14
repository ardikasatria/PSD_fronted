import { Link } from "react-router-dom";
import { getDay } from "../common/date";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';

const BlogStats = ({ stats }) => {

    return (
        <div className="flex gap-2 max-lg:mb-6 max-lg:pb-6 border-grey max-lg:border-b">
            {
                Object.keys(stats).map((key, i) => {
                    return !key.includes("parent") ? <div key={i} className={"flex flex-col items-center w-full h-full justify-center p-4 px-6 " + (i != 0 ? " border-grey border-l " : "")}>
                        <h1 className="text-xl lg:text-2xl mb-2">{stats[key].toLocaleString()}</h1>
                        <p className="max-lg:text-dark-grey text-md capitalize">{key.split("_")[1]}</p>
                    </div> : ""
                })
            }
        </div>
    )

}

export const ManagePublishedBlogCard = ({ blog }) => {

    let { banner, blog_id, title, publishedAt, activity } = blog;
    let { userAuth: { access_token } } = useContext(UserContext);

    let [ showStat, setShowStat ] = useState(false);
    let [ showDeleteConfirmation, setShowDeleteConfirmation ] = useState(false);

    const handleDelete = () => {
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/delete-blog", { blog_id }, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(({ data }) => {
            toast.success('Blog deleted successfully');
            // Handle delete success
        })
        .catch(err => {
            toast.error('Failed to delete blog');
            console.log(err);
        });

        setShowDeleteConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    return (
        <>
            <div className="relative flex gap-10 border-b mb-6 max-md:px-4 border-grey pb-6 items-center">
                <Toaster />

                <img src={banner} className="max-md:hidden lg:hidden xl:block w-28 h-28 flex-none bg-grey object-cover" />

                <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
                    <div>
                        <Link to={`/blog/${blog_id}`} className="blog-title mb-4 hover:underline">{title}</Link>

                        <p className="line-clamp-1">Published on {getDay(publishedAt)}</p>
                    </div>

                    <div className="flex gap-6 mt-3">

                        <button className="lg:hidden pr-4 py-2 underline" onClick={() => setShowStat(preVal => !preVal)}>
                            <i className="fi fi-rr-chart-histogram text-2xl text-twitter" />
                        </button>
                        <Link to={`/editor/${blog_id}`} className="pr-4 py-2 underline">
                            <i className="fi fi-rr-pen-field text-2xl text-light-green" />
                        </Link>
                        <button className="pr-4 py-2 text-red" onClick={handleDelete}>
                            <i className="fi fi-rr-trash text-2xl" />
                        </button>
                    </div>
                </div>

                <div className="max-lg:hidden">
                    <BlogStats stats={activity} />
                </div>

            </div>

            {showStat && (
                <div className="lg:hidden">
                    <BlogStats stats={activity} />
                </div>
            )}

            {showDeleteConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <p>Are you sure you want to delete this blog?</p>
                        <div className="flex justify-end mt-4">
                            <button className="mr-2" onClick={handleConfirmDelete}>Yes</button>
                            <button onClick={handleCancelDelete}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export const ManageDraftBlogPost = ({ blog }) => {

    let { title, des, blog_id, index } = blog;

    let { userAuth: { access_token } } = useContext(UserContext);

    index++;
    
    const handleDelete = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/delete-blog", { blog_id }, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(({ data }) => {
            toast.success('Draft deleted successfully');
            // Handle delete success
        })
        .catch(err => {
            toast.error('Failed to delete draft');
            console.log(err);
        });
    };

    return (
        <div className="flex gap-5 lg:gap-10 pb-6 border-b mb-6 border-grey">
            <Toaster />

            <h1 className="blog-index text-light-green text-center pl-4 md:pl-6 flex-none">{ index < 10 ? "0" + index : index }</h1>

            <div>

                <h1 className="blog-title mb-3">{title}</h1>

                <p className="line-clamp-2 font-gelasio">{des.length ? des : "No Description"}</p>

                <div className="flex gap-6 mt-3">
                    <Link to={`/editor/${blog_id}`} className="pr-4 py-2 underline">
                            <i className="fi fi-rr-pen-field text-2xl text-light-green" />
                    </Link>

                    <button className="pr-4 py-2 text-red" onClick={handleDelete}>
                            <i className="fi fi-rr-trash text-2xl" />
                    </button>
                </div>

            </div>

        </div>
    )
}
