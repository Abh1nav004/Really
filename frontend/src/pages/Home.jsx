import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Add this import

const Homepage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const navigate = useNavigate(); // Initialize the navigate function

  const featuredItems = [
    {
      title: "Signature Hoodies",
      description: "Premium heavyweight cotton with custom embroidery",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
      path: "/collections/hoodies" // Add path for each item
    },
    {
      title: "Limited Tees",
      description: "Exclusive graphic prints on premium fabric",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
      path: "/collections/tees"
    },
    {
      title: "Designer Collection",
      description: "Handcrafted pieces with unique detailing",
      image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573",
      path: "/collections/designer"
    }
  ];

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-y-auto bg-black"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* Hide scrollbar for Chrome/Safari */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618354691373-d851c5c3a990')] bg-cover bg-center opacity-80"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif tracking-tight">
              REALLY A CHOICE
            </h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Crafted for those who demand distinction
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/collections')} // Corrected onClick
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-none font-medium flex items-center mx-auto gap-2 tracking-wider"
            >
              EXPLORE COLLECTION <FiArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-32 px-6 bg-black">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl font-bold text-center mb-16 text-white font-serif"
        >
          CURATED SELECTIONS
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-none aspect-[3/4] cursor-pointer"
              onClick={() => navigate(item.path)} // Added onClick for each featured item
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="text-2xl font-bold text-white mb-2 font-serif">{item.title}</h3>
                <p className="text-gray-300 font-light tracking-wider">{item.description}</p>
              </div>
              <div className="absolute top-8 right-8 z-20">
                <span className="bg-white text-black px-3 py-1 text-xs font-bold tracking-widest">NEW</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Premium Feature */}
      <section className="py-32 px-6 bg-black border-t border-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="order-2 md:order-1"
          >
            <h2 className="text-4xl font-bold mb-6 text-white font-serif">UNCOMPROMISING QUALITY</h2>
            <p className="text-lg text-gray-300 mb-8 font-light leading-relaxed tracking-wider">
              Each garment is crafted from premium materials with meticulous attention to detail. 
              Our heavyweight cotton and precision stitching ensure durability that lasts.
            </p>
            <ul className="space-y-4">
              {['Japanese selvage denim', 'Custom hardware', 'Limited production', 'Hand-finished details'].map((item) => (
                <li key={item} className="flex items-center text-gray-300">
                  <span className="w-1 h-1 bg-white rounded-full mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 md:order-2 relative aspect-square"
          >
            <img 
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea" 
              alt="Premium materials"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute -bottom-8 -left-8 border-2 border-gray-700 w-full h-full -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 bg-black border-t border-gray-900 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b')] bg-cover bg-center opacity-20" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-5xl font-bold mb-8 text-white font-serif">JOIN THE MOVEMENT</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light tracking-wider leading-relaxed">
            Wear what sets you apart. Limited quantities available.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/collections')} // Corrected onClick
            className="bg-transparent border-2 border-white text-white px-12 py-4 rounded-none font-medium flex items-center mx-auto gap-2 tracking-widest text-sm"
          >
            SHOP NOW <FiArrowRight className="ml-2" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Homepage;