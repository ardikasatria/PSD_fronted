import SpacesCard from "./spacecard.component";

const LeftSidebar = () => {
    return (
      <div className="w-full lg:w-3/12 p-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Left Sidebar</h2>
          {/* Other sidebar content */}
  
          {/* Include the SpacesCard component */}
          <SpacesCard />
        </div>
      </div>
    );
  };
  
  export default LeftSidebar;
  
  