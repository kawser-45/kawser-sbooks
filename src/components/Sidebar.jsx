import React from 'react'
import { PiFireSimple } from "react-icons/pi";
import { GoFileSubmodule } from "react-icons/go";
import { MdOutlineFavorite, MdOutlineUpcoming } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";

function Sidebar() {

  useEffect(() => {
    if (searchTerm) {
      const results = Data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(results);
    } else {
      setFilteredData([]);
    }
  }, [searchTerm]);
  useEffect(() => {
    if (isFavoritesActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isFavoritesActive]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
     <aside className="fixed left-0 hidden w-16 h-full p-4 bg-gray-800 md:block sm:w-24 md:w-40 lg:w-52 xl:w-64">
    <input
      type="text"
      placeholder="Quick search..."
      onClick={handlePopupOpen}
      className="w-full px-4 py-2 mb-4 text-sm text-white bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-400 md:text-base lg:text-lg"
    />
    <ul>
      <div className="flex items-center w-full py-2 text-sm text-white rounded hover:bg-green-600 hover:text-black md:text-base lg:text-lg">
        <PiFireSimple />
        <li>
          <button className="ml-3">Trending</button>
        </li>
      </div>
      <div className="flex items-center w-full py-2 text-sm text-white rounded hover:bg-green-600 hover:text-black md:text-base lg:text-lg">
        <GoFileSubmodule />
        <li>
          <button className="ml-3">New Releases</button>
        </li>
      </div>
      <div className="flex items-center w-full py-2 text-sm text-white rounded hover:bg-green-600 hover:text-black md:text-base lg:text-lg">
        <MdOutlineUpcoming />
        <li>
          <button className="ml-3">Coming Soon</button>
        </li>
      </div>
      <div className="flex items-center w-full py-2 text-sm text-white rounded cursor-pointer hover:bg-green-600 hover:text-black md:text-base lg:text-lg">
        <GrFavorite className={isFavoritesActive ? "text-green-500" : ""} />
        <li>
          <button
            onClick={() => setIsFavoritesActive(true)}
            className="ml-3"
          >
            Favorites {favoriteCount > 0 && <span>({favoriteCount})</span>}
          </button>
        </li>
      </div>
    </ul> 
  </aside> 
{/* Mobile Sidebar */}

<div className="block md:hidden">
  <button
    onClick={handleSidebarToggle}
    // className="p-2 text-white bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
    className="sticky top-0 left-0 z-50 flex items-center justify-center p-2 text-white bg-gray-800 border border-gray-600 rounded-full focus:outline-none"
    >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  </button>

  {isSidebarOpen && (
    <div className="fixed top-0 left-0 z-50 w-3/4 h-full bg-green-800">
      <button
        onClick={handleSidebarToggle}
        className="absolute p-2 text-white bg-red-600 rounded-full top-4 right-4"
      >
        Close
      </button>
      <ul className="p-4">
      <input
      type="text"
      placeholder="Quick search..."
      onClick={handlePopupOpen}
      className="px-1 py-2 mb-4 text-sm text-white bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-green-400 md:text-base lg:text-lg"
    />
        <li className="py-2 text-white cursor-pointer hover:text-rose-600">
          <button onClick={() =>  setIsSidebarOpen(false)}>Trending</button>
        </li>
        <li className="py-2 text-white cursor-pointer hover:text-rose-600">
          <button onClick={() =>  setIsSidebarOpen(false)}>New Releases</button>
        </li>
        <li className="py-2 text-white cursor-pointer hover:text-rose-600 ">
          <button onClick={() =>  setIsSidebarOpen(false)}>Coming Soon</button >
        </li>
        <li className="py-2 text-white cursor-pointer hover:text-rose-600 ">
          <button
            onClick={() => {
              setIsFavoritesActive(true);
              setIsSidebarOpen(false);
            }}
          >
            Favorites {favoriteCount > 0 && <span>({favoriteCount})</span>}
          </button>
        </li>
      </ul>
    </div>
  )}
</div> 
    </>
  )
}

export default Sidebar