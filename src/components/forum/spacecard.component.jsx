import { useEffect, useState } from "react";
import { MdExplore } from "react-icons/md";
import SkeletonCard from "./skeletoncard.component";

const SpacesCard = () => {
  const [spaces, setSpaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSpaces = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/spaces`);
        if (!response.ok) {
          throw new Error("Failed to fetch spaces");
        }
        const data = await response.json();
        setSpaces(data.spaces);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center">
        <MdExplore className="text-xl mr-2" />
        <span>Spaces</span>
      </div>
      {isLoading && (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}
      {!isLoading &&
        spaces.length > 0 &&
        spaces.map((space, idx) => (
          <a
            key={idx}
            href="#"
            className="flex items-center space-x-2"
          >
            <img className="w-6 h-6 rounded-full" src={space.avatar} alt="Space icon" />
            <span>{space.name}</span>
          </a>
        ))}
    </div>
  );
};

export default SpacesCard;
