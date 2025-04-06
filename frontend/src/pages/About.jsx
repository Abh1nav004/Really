import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiGithub, FiTwitter, FiLinkedin, FiX, FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const [activeTab, setActiveTab] = useState('mission');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Cursor effect
  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Navigation functions
  const navigateTo = (path) => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => navigate(path)
    });
  };

  const openExternal = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Initialize animations
  useEffect(() => {
    // Section fade-in animations
    gsap.utils.toArray('.animate-section').forEach(section => {
      gsap.from(section, {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    // Team card animations
    gsap.utils.toArray('.team-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: '.team-section',
          start: "top 70%"
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-y-auto scrollbar-hide bg-black text-gray-100"
    >
      {/* Custom cursor */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-white mix-blend-difference pointer-events-none z-50"
        animate={{
          x: cursorPos.x - 12,
          y: cursorPos.y - 12,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40 p-8 flex flex-col"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="self-end mb-12 text-white hover:text-gray-300 transition-colors"
            >
              <FiX size={32} />
            </button>
            {['home', 'collections', 'diy', 'about', 'contact'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ x: 20 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate(`/${item}`);
                }}
                className="text-4xl py-6 text-left text-white hover:text-gray-300 transition-colors"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20 pb-32">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?architecture,monochrome')] bg-cover bg-center opacity-20"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden fixed top-6 right-6 z-50 text-white hover:text-gray-300 transition-colors"
        >
          <FiMenu size={32} />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center px-6 z-10 relative max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            <span className="block text-white mb-4">DESIGN WITHOUT</span>
            <span className="block text-gray-400">COMPROMISE</span>
          </h1>
          
          <motion.p
            className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            We create digital fashion experiences that challenge conventions through precision engineering and minimalist aesthetics.
          </motion.p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('/collections')}
              className="px-8 py-3 rounded-sm font-medium bg-white text-black hover:bg-gray-200 transition-all"
            >
              EXPLORE COLLECTIONS
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('/diy')}
              className="px-8 py-3 rounded-sm font-medium border border-white text-white hover:bg-white hover:text-black transition-all"
            >
              START CREATING
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      <div className="space-y-32 py-32 px-6 max-w-6xl mx-auto">
        {/* Mission Statement */}
        <section className="animate-section">
          <h2 className="text-3xl font-bold mb-12 text-white tracking-tight">
            OUR PHILOSOPHY
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Minimalism",
                content: "We believe in the power of reduction. Every element serves a purpose, nothing is superfluous."
              },
              {
                title: "Precision",
                content: "Pixel-perfect execution with obsessive attention to detail defines our work."
              },
              {
                title: "Innovation",
                content: "We challenge conventions through technical experimentation and boundary-pushing design."
              }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-xl font-medium text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section - Now properly visible */}
        <section className="team-section animate-section">
          <h2 className="text-3xl font-bold mb-12 text-white tracking-tight">
            THE TEAM
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: "ALEX", 
                role: "Creative Director", 
                img: "https://source.unsplash.com/random/300x300/?portrait,man,1",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com"
              },
              { 
                name: "SAM", 
                role: "Lead Developer", 
                img: "https://source.unsplash.com/random/300x300/?portrait,woman,1",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com"
              },
              { 
                name: "JORDAN", 
                role: "Design Architect", 
                img: "https://source.unsplash.com/random/300x300/?portrait,man,2",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com"
              },
              { 
                name: "TAYLOR", 
                role: "Visual Strategist", 
                img: "https://source.unsplash.com/random/300x300/?portrait,woman,2",
                twitter: "https://twitter.com",
                linkedin: "https://linkedin.com"
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                className="team-card border border-gray-800 hover:border-white transition-colors bg-black/50 p-4"
                whileHover={{ y: -5 }}
              >
                <div className="w-full aspect-square mb-6 overflow-hidden">
                  <img 
                    src={member.img} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-xl font-medium text-white mb-1">{member.name}</h3>
                <p className="text-gray-400 mb-4">{member.role}</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => openExternal(member.twitter)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FiTwitter size={20} />
                  </button>
                  <button 
                    onClick={() => openExternal(member.linkedin)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FiLinkedin size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="animate-section">
          <h2 className="text-3xl font-bold mb-12 text-white tracking-tight">
            OUR PROCESS
          </h2>
          <div className="space-y-16">
            {[
              { step: "01", title: "Concept", content: "Radical ideas refined to their essence through rigorous critique and iteration." },
              { step: "02", title: "Prototype", content: "Rapid experimentation with materials and code to test boundaries." },
              { step: "03", title: "Refine", content: "Precision editing until only the absolutely essential remains." },
              { step: "04", title: "Execute", content: "Flawless implementation with obsessive attention to detail." }
            ].map((item, i) => (
              <div key={i} className="flex gap-8">
                <div className="text-5xl font-bold text-gray-400 w-16 flex-shrink-0">{item.step}</div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Final CTA */}
      <section className="py-40 px-6 relative bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white tracking-tight">
            READY TO CREATE SOMETHING REMARKABLE?
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            Let's collaborate on your next digital fashion experience.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('/contact')}
              className="px-8 py-3 rounded-sm font-medium bg-white text-black hover:bg-gray-200 transition-all"
            >
              CONTACT US
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openExternal('https://github.com')}
              className="px-8 py-3 rounded-sm font-medium border border-white text-white hover:bg-white hover:text-black transition-all"
            >
              VIEW GITHUB
            </motion.button>
          </div>
        </div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default About;