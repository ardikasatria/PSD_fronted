import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import InPageNavigation from "../components/inpage-navigation.component";
import TopicCard from "../components/topiccard.component";
import NoDataMessage from "../components/nodata.component";
import Sidebar1 from "../components/sidebar1.component";

const ForumPage = () => {
    const [topics, setTopics] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchTopics = () => {
        // Fetch topics from the backend
        axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/topics`)
            .then(response => {
                setTopics(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch topics:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    return (
        <AnimationWrapper>
            
            {loading ? (
                <Loader />
            ) : (
                <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
                    <Toaster />
                    <Sidebar1 topics={topics} />
                    <div className="max-md:mt-12 w-full">
                        <InPageNavigation routes={["Most Viewed", "Top Voted", "Newest Topics"]}>
                            <>
                                {/* Most Viewed Topics */}
                                <div>
                                    {topics && topics.mostViewed.length ? (
                                        topics.mostViewed.map((topic, i) => (
                                            <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.1 }}>
                                                <TopicCard topic={topic} />
                                            </AnimationWrapper>
                                        ))
                                    ) : (
                                        <NoDataMessage message="No topics found" />
                                    )}
                                </div>
                            </>
                            <>
                                {/* Top Voted Topics */}
                                <div>
                                    {topics && topics.topVoted.length ? (
                                        topics.topVoted.map((topic, i) => (
                                            <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.1 }}>
                                                <TopicCard topic={topic} />
                                            </AnimationWrapper>
                                        ))
                                    ) : (
                                        <NoDataMessage message="No topics found" />
                                    )}
                                </div>
                            </>
                            <>
                                {/* Newest Topics */}
                                <div>
                                    {topics && topics.newest.length ? (
                                        topics.newest.map((topic, i) => (
                                            <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.1 }}>
                                                <TopicCard topic={topic} />
                                            </AnimationWrapper>
                                        ))
                                    ) : (
                                        <NoDataMessage message="No topics found" />
                                    )}
                                </div>
                            </>
                        </InPageNavigation>
                    </div>
                </section>
            )}
        </AnimationWrapper>
    );
};

export default ForumPage;
