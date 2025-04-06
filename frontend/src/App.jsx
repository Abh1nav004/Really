import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Collections from './pages/Collections';
import DIYStudio from './pages/DIY';
import Checkout from './components/Checkout';
import { useState } from 'react';

function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-black text-white pt-20">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/diy" element={<DIYStudio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            {/* Optional: Add nested collection routes if needed */}
            <Route path="/collections/:category" element={<Collections />} />
            
            {/* Add 404 page for unmatched routes */}
            <Route path="*" element={<div className="text-center py-40">404 - Page Not Found</div>} />
          </Routes>
          {isCheckoutOpen && <Checkout onClose={() => setIsCheckoutOpen(false)} />}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;