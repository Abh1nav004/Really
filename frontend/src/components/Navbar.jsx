import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [hovered, setHovered] = useState(null);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Register", path: "/register" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md px-10 py-4 flex justify-between items-center z-50 border-b border-gray-800">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Link to="/">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-12 w-auto transition-transform duration-500 ease-in-out hover:scale-105 drop-shadow-md"
          />
        </Link>
      </motion.div>

      <ul className="flex space-x-8">
        {navItems.map((item, index) => (
          <motion.li
            key={item.path}
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link 
              to={item.path}
              className="text-white text-lg uppercase tracking-wide relative block py-2"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {item.name}
              {hovered === index && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                  layoutId="underline"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;