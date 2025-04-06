import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiEdit3, FiCheck, FiShoppingBag } from 'react-icons/fi'; // Updated imports

const DIYStudio = () => {
  const [designPrompt, setDesignPrompt] = useState('');
  const [generatedDesigns, setGeneratedDesigns] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const fileInputRef = useRef(null);

  const handleGenerate = async () => {
    if (!designPrompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedDesigns([
        { id: 1, url: 'https://via.placeholder.com/300x400/333/fff?text=Design+1' },
        { id: 2, url: 'https://via.placeholder.com/300x400/555/fff?text=Design+2' },
        { id: 3, url: 'https://via.placeholder.com/300x400/777/fff?text=Design+3' },
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setGeneratedDesigns([...generatedDesigns, {
          id: Date.now(),
          url: event.target.result
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center font-serif">
          DIY DESIGN STUDIO
        </h1>
        <p className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto">
          Use our AI designer to create your perfect custom clothing. Describe your vision or upload inspiration.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Design Input Section */}
          <div className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FiEdit3 className="text-blue-400" /> Create Your Design
            </h2>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Describe your design</label>
              <textarea
                value={designPrompt}
                onChange={(e) => setDesignPrompt(e.target.value)}
                placeholder="e.g., 'A vintage band t-shirt with dragon artwork in red and black'"
                className="w-full bg-gray-800 text-white p-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[150px]"
              />
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 ${
                  isGenerating ? 'opacity-70' : ''
                }`}
              >
                {isGenerating ? 'Generating...' : (
                  <>
                    <FiEdit3 /> Generate Designs
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleUpload}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2"
              >
                <FiUpload /> Upload Inspiration
              </motion.button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Quick Ideas</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Streetwear graphic tee",
                  "Vintage band shirt",
                  "Minimalist logo hoodie",
                  "Tie-dye pattern"
                ].map((idea) => (
                  <motion.button
                    key={idea}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDesignPrompt(idea)}
                    className="text-sm bg-gray-700 hover:bg-gray-600 p-2 rounded"
                  >
                    {idea}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Design Output Section */}
          <div className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FiCheck className="text-green-400" /> Your Designs
            </h2>

            {generatedDesigns.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {generatedDesigns.map((design) => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${
                      selectedDesign?.id === design.id ? 'border-blue-500' : 'border-gray-700'
                    }`}
                    onClick={() => setSelectedDesign(design)}
                  >
                    <img 
                      src={design.url} 
                      alt="Generated design" 
                      className="w-full h-full object-cover"
                    />
                    {selectedDesign?.id === design.id && (
                      <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                          Selected
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700 p-12 text-center">
                <FiEdit3 className="mx-auto text-4xl text-gray-600 mb-4" />
                <p className="text-gray-400">
                  {isGenerating 
                    ? "Generating your designs..." 
                    : "Your generated designs will appear here"}
                </p>
              </div>
            )}

            {selectedDesign && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2"
              >
                <FiShoppingBag /> Add to Cart - $49.99
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DIYStudio;