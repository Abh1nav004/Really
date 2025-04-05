import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiClock, FiChevronRight } from 'react-icons/fi';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [hovered, setHovered] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Register", path: "/register" },
  ];

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Update search history
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
      {/* Logo on the left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1"
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

      {/* Centered navigation links */}
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
                className="text-gray-300 hover:text-white text-md uppercase tracking-wider relative block py-1 transition-colors duration-300"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {item.name}
                {hovered === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500"
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

      {/* Search section */}
      <div className="flex-1 flex justify-end" ref={searchRef}>
        <div className="relative">
          {searchOpen ? (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 280 }}
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
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition-colors"
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
                  className="ml-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FiX size={20} />
                </button>
              </form>

              {/* Search history dropdown */}
              <AnimatePresence>
                {showHistory && searchHistory.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-full bg-gray-800 rounded-md shadow-xl z-50 overflow-hidden"
                  >
                    <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700 bg-gray-900">
                      <span className="text-sm text-gray-400 flex items-center">
                        <FiClock className="mr-2" /> Recent searches
                      </span>
                      <button
                        onClick={clearSearchHistory}
                        className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        Clear all
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
                            className="w-full text-left px-4 py-3 hover:bg-gray-700 text-sm flex items-center justify-between transition-colors"
                          >
                            <span className="truncate">{item}</span>
                            <FiChevronRight className="text-gray-400" />
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
              className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSearchOpen(true);
                setShowHistory(false);
              }}
            >
              <FiSearch size={20} />
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;