import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { UserContext } from "../App";
import AboutUser from "../components/about.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import InPageNavigation from "../components/inpage-navigation.component";
import BlogPostCard from "../components/blog-post.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import PageNotFound from "./404.page";
import FollowerCard from "../components/followercard.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';


export const profileDataStructure = {
    personal_info: {
        fullname: "",
        username: "",
        profile_img: "",
        bio: "",
    },
    account_info: {
        total_posts: 0,
        total_blogs: 0
    },
    social_links: {},
    joinedAt: "",
    followers: [],
    following: []
};

const ProfilePage = () => {
    let { id: profileId } = useParams();
    let [profile, setProfile] = useState(profileDataStructure);
    let [loading, setLoading] = useState(true);
    let [blogs, setBlogs] = useState(null);
    let [followers, setFollowers] = useState([]);
    let [following, setFollowing] = useState([]);
    let { userAuth } = useContext(UserContext);
    const [isFollowing, setIsFollowing] = useState(false);
    const followingCount = following.length;
    const followerCount = followers.length;



    const fetchFollowers = () => {
        axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/followers/${profileId}`)
            .then(response => {
                setFollowers(response.data.followers);
            })
            .catch(error => {
                console.error('Failed to fetch followers:', error);
            });
    };

    const fetchFollowing = () => {
        axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/following/${profileId}`)
            .then(response => {
                setFollowing(response.data.following);
            })
            .catch(error => {
                console.error('Failed to fetch following:', error);
            });
    };

    const fetchUserProfile = () => {
        axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/get-profile`, { username: profileId })
            .then(({ data: user }) => {
                if (user != null) {
                    setProfile(user);
                    fetchFollowers();
                    fetchFollowing();
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };

    const getBlogs = ({ page = 1, user_id }) => {
        user_id = user_id == undefined ? blogs.user_id : user_id;
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
            author: user_id,
            page
        })
            .then(async ({ data }) => {
                let formattedData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/search-blogs-count",
                    data_to_send: { author: user_id }
                });
                formattedData.user_id = user_id;
                setBlogs(formattedData);
            });
    };

    useEffect(() => {
        if (profile._id && blogs === null) {
            getBlogs({ user_id: profile._id });
        }
    }, [profile, blogs]);

    useEffect(() => {
        fetchUserProfile();
    }, [profileId]);

    useEffect(() => {
        if (userAuth && profile.followers.length) {
            setIsFollowing(profile.followers.some(follower => follower && follower.personal_info && follower.personal_info.username === userAuth.username));
        }
    }, [userAuth, profile.followers]);
    

    const handleFollow = () => {
        if (!userAuth || !userAuth.access_token) {
            toast.error("You must be logged in to follow.");
            return;
        }
        axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/follow`, { username: userAuth.username, followUsername: profile.personal_info.username }, { headers: { Authorization: `Bearer ${userAuth.access_token}` } })
            .then(response => {
                setProfile({
                    ...profile,
                    followers: [...profile.followers, { personal_info: { username: userAuth.username } }]
                });
                setIsFollowing(true);
                setFollowers([...followers, {
                    personal_info: {
                        username: userAuth.username,
                        profile_img: userAuth.profile_img
                    }
                }]);
                toast.success("Successfully followed!");
            })
            .catch(error => {
                console.error('Failed to follow:', error);
                toast.error("Failed to follow.");
            });
    };

    const handleUnfollow = () => {
        if (!userAuth || !userAuth.access_token) {
            toast.error("You must be logged in to unfollow.");
            return;
        }
        axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/unfollow`, { username: userAuth.username, unfollowUsername: profile.personal_info.username }, { headers: { Authorization: `Bearer ${userAuth.access_token}` } })
            .then(response => {
                const updatedFollowers = profile.followers.filter(follower => follower && follower.personal_info && follower.personal_info.username !== userAuth.username);
                setProfile({
                    ...profile,
                    followers: updatedFollowers
                });
                setIsFollowing(false);
                const updatedLocalFollowers = followers.filter(follower => follower && follower.personal_info && follower.personal_info.username !== userAuth.username);
                setFollowers(updatedLocalFollowers);
                toast.success("Successfully unfollowed!");
            })
            .catch(error => {
                console.error('Failed to unfollow:', error);
                toast.error("Failed to unfollow.");
            });
    };
    

    return (
        <AnimationWrapper>
            {loading ? (
                <Loader />
            ) : profile.personal_info.username.length ? (
                <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
                    <Toaster />
                    <div className="flex flex-col max-md:items-center gap-5 min-w-[250px] md:w-[50%] md:pl-8 md:border-l border-grey md:sticky md:top-[100px] md:py-10">
                        <img src={profile.personal_info.profile_img} className="w-48 h-48 bg-grey rounded-full md:w-32 md:h-32" />
                        <h1 className="text-2xl font-medium">@{profile.personal_info.username}</h1>
                        <p className="text-xl capitalize h-6">{profile.personal_info.fullname}</p>
                        <p>{Math.max(profile.account_info.total_posts, 0).toLocaleString()} Blogs - {Math.max(profile.account_info.total_reads, 0).toLocaleString()} Reads</p>
                        <p>{followingCount.toLocaleString()} Following - {followerCount.toLocaleString()} Followers</p>
                        <div className="flex gap-4 mt-2">
                                {
                                     userAuth.username === profileId ? (
                                        <Link to="/settings/edit-profile" className="btn-light rounded-md">Edit Profile</Link>
                                    ) : (
                                        <button className="btn-light rounded-md flex items-center" onClick={isFollowing ? handleUnfollow : handleFollow}>
                                            <FontAwesomeIcon icon={isFollowing ? faUserMinus : faUserPlus} className="mr-2" />
                                            {isFollowing ? "Unfollow" : "Follow"}
                                        </button>
                                    )
                                }

                        </div>
                    </div>
                    <div className="max-md:mt-12 w-full">
                        <InPageNavigation routes={["Blogs Published", "About", "Followers", "Following"]}>
                            <>
                                <div>
                                    {blogs == null ? (
                                        <Loader />
                                    ) : (
                                        blogs.results.length ? (
                                            blogs.results.map((blog, i) => (
                                                <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.1 }}>
                                                    <BlogPostCard content={blog} author={blog.author.personal_info} />
                                                </AnimationWrapper>
                                            ))
                                        ) : (
                                            <NoDataMessage message="No blogs published" />
                                        )
                                    )}
                                    <LoadMoreDataBtn state={blogs} fetchDataFun={getBlogs} />
                                </div>
                            </>
                            <>
                                <AboutUser bio={profile.personal_info.bio} social_links={profile.social_links} joinedAt={profile.joinedAt} />
                            </>
                            <>
                                <div>
                                    {followers.length ? (
                                        followers.map((follower, i) => (
                                            <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.1 }}>
                                                <FollowerCard key={follower._id} follower={follower} />
                                            </AnimationWrapper>
                                        ))
                                    ) : (
                                        <NoDataMessage message="No Followers" />
                                    )}
                                </div>
                            </>
                            <>
                                <div>
                                    {following.length ? (
                                        following.map((followedUser, i) => (
                                            <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.1 }}>
                                                <FollowerCard key={followedUser._id} follower={followedUser} />
                                            </AnimationWrapper>
                                        ))
                                    ) : (
                                        <NoDataMessage message="No Following" />
                                    )}
                                </div>
                            </>
                        </InPageNavigation>
                    </div>
                </section>
            ) : (
                <PageNotFound />
            )}
        </AnimationWrapper>
    );
};

export default ProfilePage;
