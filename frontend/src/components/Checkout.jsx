import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Checkout = ({ onClose }) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    setTimeout(() => {
      clearCart();
      setCheckoutComplete(true);
    }, 1500);
  };

  if (checkoutComplete) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
      >
        <div className="bg-white text-black p-12 max-w-md text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">ORDER CONFIRMED</h2>
          <p className="mb-6">Thank you for your purchase. Your items will ship within 2 business days.</p>
          <button
            onClick={onClose}
            className="bg-black text-white px-6 py-2 w-full"
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
    >
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif font-bold">YOUR CART</h2>
          <button onClick={onClose} className="text-2xl">
            <FiX />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <FiShoppingBag className="mx-auto text-4xl mb-4" />
            <p className="text-xl">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cart.map((item) => (
                <div key={item.id} className="flex border-b border-gray-800 py-6">
                  <div className="w-24 h-24 bg-gray-900 mr-6 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">${item.price.toFixed(2)}</p>
                    <div className="flex items-center">
                      <span className="mr-4">Qty: {item.quantity}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="ml-6">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 p-6 h-fit">
              <h3 className="font-serif text-xl mb-6">ORDER SUMMARY</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-4 font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-white text-black w-full py-3 font-medium hover:bg-gray-200 transition-colors"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Checkout;