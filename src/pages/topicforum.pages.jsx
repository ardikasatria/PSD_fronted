import { Col, Image, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import CommentForm from "../components/Comment/CommentForm";
import CommentsContainer from "../components/Comment/CommentsContainer";
import TopicContent from "../components/Topic/TopicContent";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import SkeletonTopicPage from "../components/Skeletons/SkeletonTopicPage";


const Topic = () => {
  const { id, slug } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const [topic, setTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTopic = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTopic(id, slug);
        setTopic(data);
        document.title = `${data.title} | ONetwork Forum`;
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTopic();
  }, [id, slug]);

  return useMemo(() => {
    return (
      <main>
        <Container className="d-flex justify-content-between">
          <Col lg={8}>
            {error && <div className="message error">{error}</div>}
            {isLoading && <SkeletonTopicPage />}
            {!isLoading && topic && (
              <article className="topic-item thread">
                {isDeleting && <div className="loader"></div>}
                <div className="thread-content">
                  <TopicContent
                    onDeleting={() => setIsDeleting(true)}
                    topic={topic}
                  />
                  <div className="add-comment d-flex pt-5 pr-5 pl-5">
                    <Image src={topic.user.avatar.url} />
                    <CommentForm passedComment={null} topic={topic} />
                  </div>
                  <CommentsContainer topic={topic} />
                </div>
              </article>
            )}
          </Col>
          <RightSidebar />
        </Container>
      </main>
    );
  }, [topic, isLoading, isDeleting, error]);
};

export default Topic;
