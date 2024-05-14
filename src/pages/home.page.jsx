import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import { activeTabRef } from "../components/inpage-navigation.component";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import ban from "../imgs/banner.png";
import OurProjek from "./ourprojek.page";


const HomePage = () => {
    let [blogs, setBlog] = useState(null);
    let [trendingBlogs, setTrendingBlog] = useState(null);
    let [ pageState, setPageState ] = useState("home");

    let categories = [
        "Analisis Big Data",
        "Pemrograman Berbasis Fungsi",
        "Machine Learning",
        "Deep Learning",
        "Time Series",
        "Cloud Computing",
        "Sains",
        "Data",
        "Artificial Intelligence",
        "High Performance Computing",
    ];

    const fetchLatestBlogs = ({ page = 1 }) => {
        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page })
            .then( async ({ data }) => {

                let formatedData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/all-latest-blogs-count"
                })

                setBlog(formatedData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchBlogsByCategory = ({ page = 1 }) => {
        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag: pageState, page })
            .then( async ({ data }) => {
                
                let formatedData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/search-blogs-count",
                    data_to_send: { tag: pageState }
                })

                setBlog(formatedData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const fetchTrendingBlogs = () => {
        axios
            .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
            .then(({ data }) => {
                setTrendingBlog(data.blogs);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loadBlogByCategory = (e) => {
        
        let category = e.target.innerText.toLowerCase(); 

        setBlog(null);

        if(pageState == category){
            setPageState("home");
            return;
        }

        setPageState(category);

    }

    useEffect(() => {

        activeTabRef.current.click();

        if(pageState == "home"){
            fetchLatestBlogs({ page: 1 });
        } else {
            fetchBlogsByCategory({ page: 1 })
        }

        if(!trendingBlogs){
            fetchTrendingBlogs();
        }

    }, [pageState]);

    const handleNavLinkClick = (e) => {
        if (!isUserLoggedIn()) {
            e.preventDefault();
            navigate('/signin');
        } else {
            setPageState(e.target.innerText);
        }
    };

    return (
        <AnimationWrapper>
            <section>
            <div className='flex flex-col lg:flex-row gap-6 p-5 ml-30 px-3 max-w-6xl mx-auto'>
                <div className='lg:w-1/2'>
                    <h1 className='text-3xl font-bold lg:text-6xl'>
                        Welcome to{' '}
                    <Typewriter
                        options={{
                        wrapperClassName: 'typewrite color-linear text-3xl font-bold lg:text-6xl',
                        strings: ['Projek', 'Sains', 'Data'],
                        autoStart: true,
                        loop: true,
                        }}
                    />
                    </h1>
                    <p className="mt-5 items-center"></p>
                    <Link className="text-xl underline text-light-green gap-10 mx-auto mb-5 py-2" to="/projek-kami" onClick={handleNavLinkClick}>
                            <i className="fi fi-rr-workflow-alt mr-2 text-light-green" />
                            Explore our latest projects and collaborations
                    </Link>
                    <p className='text-gray-500 mt-10 mb-10 text-xl'>
                        Here you'll find a variety of articles and tutorials on topics such as Data Science,
                        Data Engineering, Big Data, Data Analysis, Artificial Intelligence, Science, and
                    Technology Data and Computing.
                    </p>
                    <Link className="btn-dark gap-10 mb-10 py-2" to="/dashboard/tanya-psd" onClick={handleNavLinkClick}>
                            Any Question? Let's Talk With Our GPT!
                    </Link>

                </div>

                <div className='lg:w-1/2 w-auto'>
                    <div className='banner-img position-relative w-auto'>
                     <img src={ban} alt="PSD" className="img-fluid" />
                    </div>
                </div>
            </div>
            </section>
            <section className="mx-auto">
            <div className="flex flex-col gap-10 justify-center">
                <div>
                    <h1 className="font-medium text-xl mb-8 flex items-center gap-3 text-twitter">
                        <i className="fi fi-rr-star"></i>
                        <span>Find Your Favorite Topics</span>
                    </h1>

                    <div className="flex gap-3 flex-wrap">
                        {categories.map((category, i) => {
                            return (
                                <button onClick={loadBlogByCategory} className={"tag " + (pageState == category ? " bg-black text-white " : " ")} 
                                key={i}>
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            </section>


            
            <section className="h-cover flex justify-center gap-10">



                {/* latest blogs */}

                <div className="w-full">
                    <InPageNavigation
                        routes={[ pageState , "trending blogs"]}
                        defaultHidden={["trending blogs"]}
                    >
                        <>
                            {blogs == null ? (
                                <Loader />
                            ) : (
                                blogs.results.length ? 
                                    blogs.results.map((blog, i) => {
                                        return (
                                            <AnimationWrapper
                                                transition={{
                                                    duration: 1,
                                                    delay: i * 0.1,
                                                }}
                                                key={i}
                                            >
                                                <BlogPostCard
                                                    content={blog}
                                                    author={
                                                        blog.author.personal_info
                                                    }
                                                />
                                            </AnimationWrapper>
                                        );
                                    })
                                : <NoDataMessage message="No blogs published" />
                            )}
                            <LoadMoreDataBtn state={blogs} fetchDataFun={( pageState == "home" ? fetchLatestBlogs : fetchBlogsByCategory )} />
                        </>

                        {trendingBlogs == null ? (
                            <Loader />
                        ) : (
                            trendingBlogs.length ?
                                trendingBlogs.map((blog, i) => {
                                    return (
                                        <AnimationWrapper
                                            transition={{
                                                duration: 1,
                                                delay: i * 0.1,
                                            }}
                                            key={i}
                                        >
                                            <MinimalBlogPost
                                                blog={blog}
                                                index={i}
                                            />
                                        </AnimationWrapper>
                                    );
                                })
                            : <NoDataMessage message="No trending blogs" />
                        )}


                    </InPageNavigation>
                </div>




                {/* filters and trending blogs */}
                <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
 

                        <div>
                            <h1 className="font-medium text-xl mb-8 text-light-green">
                                Trending
                                <i className="fi fi-rr-arrow-trend-up"></i>
                            </h1>

                            {trendingBlogs == null ? (
                                <Loader />
                            ) : (
                                trendingBlogs.length ? 
                                    trendingBlogs.map((blog, i) => {
                                        return (
                                            <AnimationWrapper
                                                transition={{
                                                    duration: 1,
                                                    delay: i * 0.1,
                                                }}
                                                key={i}
                                            >
                                                <MinimalBlogPost
                                                    blog={blog}
                                                    index={i}
                                                />
                                            </AnimationWrapper>
                                        );
                                    })
                                : <NoDataMessage message="No trending blogs" />
                            )}
                        </div>
                    </div>
            </section>
            
        </AnimationWrapper>
    );
};

export default HomePage;
