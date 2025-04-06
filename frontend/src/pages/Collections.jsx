import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Collections = () => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  const products = [
    {
      id: 1,
      name: "Premium Black Hoodie",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
      description: "Heavyweight cotton with custom embroidery"
    },
    {
      id: 2,
      name: "Graphic Signature Tee",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
      description: "Limited edition screen print"
    },
    {
      id: 3,
      name: "Oversized Denim Jacket",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
      description: "Vintage wash with custom hardware"
    },
    {
      id: 4,
      name: "Minimalist Sweatpants",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573",
      description: "Premium french terry fabric"
    }
  ];

  const handleQuantityChange = (id, value) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, value)
    }));
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif font-bold mb-12 text-center"
        >
          THE COLLECTION
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="group relative border border-gray-800 hover:border-gray-600 transition-colors"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                <p className="text-lg font-medium mb-4">${product.price.toFixed(2)}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-700">
                    <button 
                      onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}
                      className="px-3 py-1 text-gray-400 hover:text-white"
                    >
                      <FiMinus />
                    </button>
                    <span className="px-3">{quantities[product.id] || 1}</span>
                    <button 
                      onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                      className="px-3 py-1 text-gray-400 hover:text-white"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart({
                      ...product,
                      quantity: quantities[product.id] || 1
                    })}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 hover:bg-gray-200 transition-colors"
                  >
                    <FiShoppingBag /> Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;