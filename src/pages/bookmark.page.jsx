import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import NoDataMessage from "../components/nodata.component";

const BookmarkPage = () => {
    const { userAuth: { access_token, username } } = useContext(UserContext);
    const [ bookmarks, setBookmarks ] = useState([]);

    useEffect(() => {
        if(access_token){
            axios.get(import.meta.env.VITE_SERVER_DOMAIN + `/user-bookmarks/${username}`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data }) => {
                setBookmarks(data.bookmarks);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [access_token, username]);

    return (
        <div>
            <h1 className="mb-10">Blogs yang disimpan</h1>
            {bookmarks.length === 0 ? <NoDataMessage message="Tidak ada blogs yang disimpan" /> : (
                <>
                    {bookmarks.map((bookmark, index) => (
                        <div key={bookmark._id} className="flex gap-5 lg:gap-10 pb-6 border-b mb-6 border-grey">
                            <h1 className="blog-index text-light-green text-center pl-4 md:pl-6 flex-none">{ index + 1 < 10 ? "0" + (index + 1) : index + 1 }</h1>
                            <div>
                                <h1 className="blog-title mb-3">{bookmark.title}</h1>
                                <p className="line-clamp-2 font-gelasio">{bookmark.des.length ? bookmark.des : "No Description"}</p>
                                <div className="flex gap-6 mt-3">
                                    <a href={`/blog/${bookmark.blog_id}`} className="pr-4 py-2 flex items-center">
                                        <i className="fi fi-rr-eye text-xl"></i>
                                        <span className="ml-2">Lihat</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default BookmarkPage;
