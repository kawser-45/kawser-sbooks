import React, { useState, useEffect } from "react";
import Data from "./data/Data";
import { MdOutlineFavorite, MdOutlineUpcoming } from "react-icons/md";
import { PiFireSimple } from "react-icons/pi";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineLightMode } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { GoFileSubmodule } from "react-icons/go";
import { IoChevronForward, IoChevronDown } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import { FaTrashCan } from "react-icons/fa6";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(null); 

  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [isFavoritesActive, setIsFavoritesActive] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);



  const [selectedBook, setSelectedBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); 

  const handleToggleFavorite = () => {
      setIsFavorite(!isFavorite); 
  };
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
   useEffect(() => {
    if (selectedBook) {
        document.body.classList.add("modal-open"); 
    } else {
        document.body.classList.remove("modal-open");
    }
}, [selectedBook]);
  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSearchTerm("");
    setFilteredData([]);
  };

  const toggleFilterDropdown = (filter) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleAddToCart = (book) => {
    setCartCount(cartCount + 1);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === book.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  const handleCartIconClick = () => {
    setIsCartPopupOpen(true);
  };

  const handleCartPopupClose = () => {
    setIsCartPopupOpen(false);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      setCartCount(updatedItems.reduce((count, item) => count + item.quantity, 0));
      return updatedItems;
    });
  };

  const handleIncrementQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity < 5
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrementQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleAddToFavorites = (book) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.find((item) => item.id === book.id)) {
        const updatedFavorites = [...prevFavorites, book];
        setFavoriteCount(updatedFavorites.length);
        return updatedFavorites;
      }
      return prevFavorites;
    });
    setIsFavoritesActive();
  };
// new code
  const handleFavoritesPopupClose = () => {
    setIsFavoritesActive(false);
};
const handleRemoveFromFavorites = (id) => {
  setFavorites((prevFavorites) => {
    const updatedFavorites = prevFavorites.filter((item) => item.id !== id);
    setFavoriteCount(updatedFavorites.length);
    return updatedFavorites;
  });
};

  const handleImageClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  

const handleSidebarToggle = () => {
  setIsSidebarOpen(!isSidebarOpen);
};


  return (
    <div className="flex flex-col min-h-screen text-white bg-gray-800">
           {/* Navbar */}
<nav className="fixed z-50 w-full p-4 py-6 text-white bg-gray-800 border-b border-gray-600">
  <div className="flex items-center justify-between">
    <div className="text-2xl font-bold text-green-400 sm:text-3xl">
      kawser's <strong className="text-rose-400">Books</strong>
    </div>
    <div className="hidden space-x-4 md:flex lg:space-x-6">
      <IoMdNotifications className="p-1 text-2xl text-green-500 border border-green-700 rounded-sm cursor-pointer sm:text-3xl" />
      <MdOutlineLightMode className="p-1 text-2xl text-green-500 border border-green-700 rounded-sm cursor-pointer sm:text-3xl" />
      <div className="relative" onClick={handleCartIconClick}>
        <FaCartArrowDown className="p-1 text-2xl text-green-500 border border-green-700 rounded-sm cursor-pointer sm:text-3xl" />
        <div className="absolute text-xs bg-green-700 rounded-md px-1 py-0.5 top-[-4px] right-[-6px] sm:text-sm">
          <span>{cartCount}</span>
        </div>
      </div>
    </div>
    <div className="flex md:hidden">
      <button
        className="p-2 text-green-500 border border-green-700 rounded-sm focus:outline-none"
        onClick={handleMobileMenuToggle}
      >
        ☰
      </button>
    </div>
  </div>
  <div
    className={`mt-4 space-y-4 md:hidden ${
      isMobileMenuOpen ? "block" : "hidden"
    }`}
  >
    <IoMdNotifications className="text-2xl text-green-500 cursor-pointer" />
    <MdOutlineLightMode className="text-2xl text-green-500 cursor-pointer" />
    <div className="relative" onClick={handleCartIconClick}>
      <FaCartArrowDown className="text-2xl text-green-500 cursor-pointer" />
      <div className="absolute text-xs bg-green-700 rounded-md px-1 py-0.5 top-[-4px] right-[-6px]">
        <span>{cartCount}</span>
      </div>
    </div>
  </div>
</nav>

 {/* Main Content Area with Sidebar and Right Sidebar */}
      <div className="flex flex-grow pt-20">
  {/* Sidebar */}
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
 {/* Main Content */}
<main className="flex-grow p-4 overflow-y-auto border-t border-l border-r border-gray-700 sm:p-6 md:p-8 lg:ml-40 lg:mr-40 xl:ml-64 xl:mr-64">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Data.map((book) => (
      <div
        key={book.id}
        className="p-4 text-center bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
      >
        <img
          src={book.image}
          alt={book.title}
          className="object-cover w-full mb-4 rounded-md h-96 sm:h-52 md:h-64 lg:h-72 "
          onClick={() => handleImageClick(book)}
        />
        <h5 className="mb-2 text-start">{book.name}</h5>
        <p className="mb-2 text-sm text-gray-400 text-start sm:text-base">
          Genre: {book.author}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-yellow-400">{'⭐'.repeat(book.rating)}</span>
        </div>
        <div className="flex items-center justify-between text-start">
          <button
            className="px-4 py-2 text-sm text-white bg-green-500 rounded-sm sm:w-auto hover:bg-green-600"
            onClick={() => handleAddToCart(book)}
          >
            ${book.price} Add to cart
          </button>
          <div
            onClick={() => handleAddToFavorites(book)}
            className="p-1 text-2xl text-green-500 border border-green-700 rounded-sm cursor-pointer hover:bg-gray-600"
          >
            <MdOutlineFavorite className="text-green-500" />
          </div >
        </div>
      </div>
    ))}
  </div>
</main>
 {/* Right Sidebar */}
  <aside className="fixed right-0 hidden w-16 h-full p-4 bg-gray-800 md:block sm:w-24 md:w-40 lg:w-52 xl:w-64">
    <h2 className="mb-6 text-xl font-bold text-white sm:text-2xl hover:text-green-600">
      Filter On Page
    </h2>
    <ul>
      <div className="flex items-center w-full py-2 text-sm text-white hover:text-green-600 md:text-base lg:text-lg">
        <button
          className="flex items-center w-full"
          onClick={() => toggleFilterDropdown("name")}
        >
          {openFilter === "name" ? (
            <IoChevronDown className="mr-2" />
          ) : (
            <IoChevronForward className="mr-2" />
          )}
          By name
        </button>
      </div>
      {openFilter === "name" && (
        <ul className="pl-6 space-y-1 text-sm text-rose-600 hover:text-green-600">
          <li>Ascending</li>
          <li>Descending</li>
        </ul>
      )}
      <div className="flex items-center w-full py-2 text-sm text-white hover:text-green-600 md:text-base lg:text-lg">
        <button
          className="flex items-center w-full"
          onClick={() => toggleFilterDropdown("rating")}
        >
          {openFilter === "rating" ? (
            <IoChevronDown className="mr-2" />
          ) : (
            <IoChevronForward className="mr-2" />
          )}
          By rating
        </button>
      </div>
      {openFilter === "rating" && (
        <ul className="pl-6 space-y-1 text-sm text-rose-600 hover:text-green-600">
          <li>High to Low</li>
          <li>Low to High</li>
        </ul>
      )}
      <div className="flex items-center w-full py-2 text-sm text-white hover:text-green-600 md:text-base lg:text-lg">
        <button
          className="flex items-center w-full"
          onClick={() => toggleFilterDropdown("price")}
        >
          {openFilter === "price" ? (
            <IoChevronDown className="mr-2" />
          ) : (
            <IoChevronForward className="mr-2" />
          )}
          By price
        </button>
      </div>
      {openFilter === "price" && (
        <ul className="pl-6 space-y-1 text-sm text-rose-600 hover:text-green-600">
          <li>High to Low</li>
          <li>Low to High</li>
        </ul>
      )}
    </ul>
  </aside>
    {/* Favorites Popup */}
    {isFavoritesActive && (
 <div className="overflow-y-scroll max-h-96">
   <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div className="relative w-full max-w-2xl p-6 mx-4 overflow-hidden bg-gray-900 rounded-lg shadow-2xl">
      <button
        onClick={handleFavoritesPopupClose}
        className="absolute text-xl text-white top-3 right-3"
      >
        <AiOutlineClose />
      </button>
      <h2 className="mb-4 text-2xl font-bold text-center text-white">Your Favorites</h2>
     <div className="grid grid-cols-2 gap-4 overflow-y-scroll max-h-96">
        {favorites.map((item) => (
          <div key={item.id} className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full rounded"
            />
               <button
              onClick={() => handleRemoveFromFavorites(item.id)}
              className="absolute px-2 py-1 text-sm text-white bg-blue-700 rounded bottom-2 right-2 hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>      
    </div>
  </div>
 </div>
)}
 {/* Modal */}
    {selectedBook && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 modal-backdrop">
                <div className="relative flex flex-col w-full max-w-2xl p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg md:flex-row">
                    <div className="flex-grow p-6">
                        <h2 className="mb-2 text-2xl font-bold text-white">{selectedBook.name}</h2>
                        <small className="mb-3">Comedy/Drama</small>
                        <p className="mb-2 text-gray-400">{selectedBook.genre}</p>
                        <p className="mb-4 text-gray-300">{selectedBook.description}</p>
                        
                        <div className="flex items-center space-x-4">
                            <button 
                                className="px-5 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                                onClick={() => handleAddToCart(selectedBook)}
                            >
                                ${selectedBook.price} Add to cart
                            </button>
                            <MdOutlineFavorite 
                                onClick={handleToggleFavorite} 
                                className={`p-1 text-4xl border rounded-sm cursor-pointer hover:bg-gray-600 ${isFavorite ? 'text-green-500 border-green-700' : 'text-gray-500 border-gray-700'}`}
                            />
                            <button 
                                onClick={handleCloseModal} 
                                className="px-5 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    <img src={selectedBook.image} alt={selectedBook.name} className="object-cover w-1/3 h-full rounded-md" />
                </div>
            </div>
        )}
        {/* Search Popup */}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg p-8 mx-8 bg-gray-800 rounded-lg shadow-lg">
            <button
              onClick={handlePopupClose}
              className="absolute text-xl text-white top-3 right-3"
            >
              <AiOutlineClose />
            </button>
            <div className="flex items-center mb-4">
              <AiOutlineSearch className="text-2xl text-gray-400" />
          <input
                type="text"
                placeholder="Type your favorite book name here..."
                className="w-full p-2 ml-2 text-white bg-gray-700 rounded outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {filteredData.length === 0 ? (
              <p className="text-center text-gray-400">No item found</p>
            ) : (
              <div className="overflow-y-auto max-h-80">
                {filteredData.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-2 mb-2 rounded hover:bg-green-600"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 mr-3 rounded"
                    />
                    <div>
                      <h5 className="font-semibold">{item.name}</h5>
                      <p className="text-sm text-gray-400">{item.author}</p>
                      <p className="text-sm text-green-400">BDT: {item.price} TK</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    {/* Cart item Popup */}
    {isCartPopupOpen && (
  <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <div className="relative w-full max-w-2xl px-6 py-2 mx-4 overflow-hidden bg-gray-900 rounded-lg shadow-2xl">
      <button
        onClick={handleCartPopupClose}
        className="absolute text-2xl text-gray-400 transition top-4 right-3 hover:text-white"
      >
        <AiOutlineClose />
      </button>
      <h2 className="mb-6 text-2xl font-bold text-center text-white">
        Your Cart
      </h2>
      <div className="flex justify-between px-4 py-2 mb-2 font-semibold text-gray-300 border-b border-gray-700">
        <span className="w-2/5">Product</span>
        <span className="w-1/5 text-center">Price</span>
        <span className="w-1/5 text-center">Quantity</span>
        <span className="w-1/5 text-right">Total</span>
      </div>

      {/* Scrollable Cart Items */}
      <div className="overflow-y-auto max-h-96">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 my-2 text-white bg-gray-800 border border-gray-700 rounded-lg"
          >
            <div className="flex items-center w-2/5">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 mr-3 rounded"
              />
              <span>{item.name}</span>
            </div>
            <div className="w-1/5 text-center">${item.price}</div>
            <div className="flex items-center justify-center w-1/5">
            <button
                className="px-2 text-lg text-white bg-green-500 rounded hover:bg-green-600"
                onClick={() => handleIncrementQuantity(item.id)}
              >
                +
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                className="px-2 text-lg text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => handleDecrementQuantity(item.id)}
              >
                -
              </button>
              
            </div>
            <div className="w-1/5 text-right">${item.price * item.quantity}</div>
            <button
              className="ml-4 text-xl text-red-500 hover:text-red-600"
              onClick={() => handleRemoveFromCart(item.id)}
            >
              <FaTrashCan />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <p className="text-lg font-semibold text-white">
          Subtotal: $
          {cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )}
        </p>
        <button className="px-6 py-2 mt-4 text-lg font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
          Checkout
        </button>
      </div>
    </div>
  </div>
)}
</div>
      <footer className="w-full p-4 text-center bg-gray-800 border-t border-gray-600 ">
        <p>© 2024 kawser's Books. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default App;
