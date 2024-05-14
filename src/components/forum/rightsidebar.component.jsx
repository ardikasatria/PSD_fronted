import { Link } from "react-router-dom";
import { RiBallPenFill } from "react-icons/ri";

const RightSidebar = () => {
  return (
    <div className="lg:w-1/4 right-sidebar">
      <Link to="/topic/new" className="new-topic mx-auto flex justify-center">
        <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <RiBallPenFill className="mr-2" />
          Write a New Topic
        </button>
      </Link>
    </div>
  );
};

export default RightSidebar;
