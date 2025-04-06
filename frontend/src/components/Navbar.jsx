import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiClock, FiChevronRight, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [] } = useCart();
  const [hovered, setHovered] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "DIY Studio", path: "/diy" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const authItems = [
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
  ];

  const cartItemCount = cartItems.reduce((total, item) => total + (item?.quantity || 1), 0);

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const updatedHistory = [
        searchQuery,
        ...searchHistory.filter(item => item.toLowerCase() !== searchQuery.toLowerCase()).slice(0, 4)
      ];
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchOpen(false);
      setShowHistory(false);
    }
  };

  const handleHistoryItemClick = (item) => {
    setSearchQuery(item);
    navigate(`/search?q=${encodeURIComponent(item)}`);
    setShowHistory(false);
    setSearchOpen(false);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
    setShowHistory(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-95 backdrop-blur-lg px-6 py-3 flex justify-between items-center z-50 border-b border-gray-800">
      {/* Logo */}
      <motion.div 
        className="flex-1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Link to="/">
          <motion.img 
            src={logo} 
            alt="Logo" 
            className="h-10 w-auto origin-left transform scale-110"
            whileHover={{ 
              scale: 1.15,
              transition: { type: 'spring', stiffness: 400 }
            }}
          />
        </Link>
      </motion.div>

      {/* Navigation Links */}
      <div className="flex-1 flex justify-center">
        <ul className="flex space-x-8">
          {navItems.map((item, index) => (
            <motion.li
              key={item.path}
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={item.path}
                className={`text-gray-300 hover:text-white text-md uppercase tracking-wider relative block py-1 transition-colors duration-300 ${
                  isActive(item.path) ? '!text-gray-400' : ''
                }`}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {item.name}
                {(hovered === index || isActive(item.path)) && (
                  <motion.div
                    className={`absolute bottom-0 left-0 w-full h-[2px] ${
                      isActive(item.path) ? 'bg-gray-400' : 'bg-blue-500'
                    }`}
                    layoutId="underline"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Right Side Elements */}
      <div className="flex-1 flex justify-end items-center space-x-6">
        {/* Auth Links - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {authItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm uppercase tracking-wider ${
                isActive(item.path) ? 'text-gray-400' : 'text-gray-300 hover:text-white'
              } transition-colors`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Cart Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="relative p-2 text-gray-300 hover:text-white transition-colors"
          onClick={() => navigate('/cart')}
        >
          <FiShoppingBag className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {cartItemCount}
            </span>
          )}
        </motion.button>

        {/* Search Section */}
        <div className="relative" ref={searchRef}>
          {searchOpen ? (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              exit={{ opacity: 0, width: 0 }}
              className="origin-right"
            >
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowHistory(true)}
                  placeholder="Search..."
                  className="bg-gray-800 text-white px-3 py-1 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 transition-colors text-sm"
                >
                  <FiSearch />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                    setShowHistory(false);
                  }}
                  className="ml-1 text-gray-400 hover:text-white transition-colors"
                >
                  <FiX size={18} />
                </button>
              </form>

              {/* Search History Dropdown */}
              <AnimatePresence>
                {showHistory && searchHistory.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-1 w-full bg-gray-800 rounded-md shadow-xl z-50 overflow-hidden"
                  >
                    <div className="flex justify-between items-center px-3 py-1 border-b border-gray-700 bg-gray-900">
                      <span className="text-xs text-gray-400 flex items-center">
                        <FiClock className="mr-1" /> Recent
                      </span>
                      <button
                        onClick={clearSearchHistory}
                        className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <ul>
                      {searchHistory.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <button
                            onClick={() => handleHistoryItemClick(item)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-700 text-xs flex items-center justify-between transition-colors"
                          >
                            <span className="truncate">{item}</span>
                            <FiChevronRight className="text-gray-400 text-xs" />
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.button
              className="text-gray-300 hover:text-white p-1 rounded-full transition-colors"
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSearchOpen(true);
                setShowHistory(false);
              }}
            >
              <FiSearch size={18} />
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;