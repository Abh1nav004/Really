import { motion } from "framer-motion";
import * as React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput.checkValidity()) {
      alert("Login logic placeholder");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleGoogleSignIn = () => {
    // Google login logic
  };

  const handleFacebookSignIn = () => {
    // Facebook login logic
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black">
      <div className="flex min-h-screen items-center justify-between p-8">
        {/* Left Image - Animated */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.2
          }}
          className="hidden md:flex flex-1 items-center justify-end pr-8"
        >
          <div className="w-[400px] h-[600px] overflow-hidden">
            <motion.img 
              src="https://images.meesho.com/images/products/355695546/ja55g_512.webp"
              alt="Decorative left"
              className="w-full h-full object-cover rounded-lg shadow-xl"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>

        {/* Center Form - Animated */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ 
            type: "spring",
            stiffness: 120,
            damping: 20
          }}
          className="flex flex-col px-10 py-14 text-base leading-6 bg-[#2b2b2b] text-white shadow-xl w-full max-w-[540px] rounded-2xl mx-4 z-10 mt-16"
        >
          <div className="self-center text-3xl font-bold leading-10 text-center">
            Log Into Account
          </div>
          
          <div className="flex gap-2 self-center mt-6 text-center">
            <div className="text-gray-400">Don't have an account?</div>
            <motion.button
              whileHover={{ x: 2 }}
              className="text-blue-500 hover:text-blue-400 transition flex items-center gap-1"
              onClick={handleSignIn}
            >
              Sign Up <span>→</span>
            </motion.button>
          </div>

          <label className="mt-12 text-sm text-gray-300 max-md:mt-10">
            Email
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            className="px-4 py-4 mt-2 bg-black border border-slate-600 rounded text-white placeholder-gray-400"
            placeholder="Enter Email Address"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="Please enter a valid email address"
            required
          />

          <label className="mt-7 text-sm text-gray-300">Password</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            className="px-4 py-4 mt-2 bg-black border border-slate-600 rounded text-white placeholder-gray-400"
            placeholder="Enter Password"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 px-16 py-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition max-md:px-5"
            onClick={handleLogin}
          >
            Login
          </motion.button>

          <div className="mt-7 h-px bg-zinc-600" />
          <div className="self-center mt-7 text-sm text-gray-400">
            Or login using:
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            className="flex justify-center items-center px-16 py-3 mt-7 text-white bg-gray-800 rounded border border-zinc-600 max-md:px-5 hover:bg-gray-700 transition"
            onClick={handleGoogleSignIn}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a73199f1bb1d3ea89b40297fa0cb3c5a5d23d64a09d3c0065afa4619abb32ce?apiKey=597363a3080546f9b072bf59bebbfd17&"
              className="w-6 h-6 mr-2"
              alt="Google"
            />
            Continue with Google
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            className="flex justify-center items-center px-16 py-3 mt-3 text-white bg-gray-800 rounded border border-zinc-600 max-md:px-5 hover:bg-gray-700 transition"
            onClick={handleFacebookSignIn}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3feb9724a7eb37edc68e698d2bf9cfdafff2e78a2d0733da73a89c1beed3d397?apiKey=597363a3080546f9b072bf59bebbfd17&"
              className="w-6 h-6 mr-2"
              alt="Facebook"
            />
            Continue with Facebook
          </motion.button>
        </motion.div>

        {/* Right Image - Animated */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.2
          }}
          className="hidden md:flex flex-1 items-center justify-start pl-8"
        >
          <div className="w-[400px] h-[600px] overflow-hidden">
            <motion.img 
              src="https://images.unsplash.com/photo-1701673072655-0b7c89ec2138?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFuaW1lJTIwaG9vZGllfGVufDB8fDB8fHww"
              alt="Decorative right"
              className="w-full h-full object-cover rounded-lg shadow-xl"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;