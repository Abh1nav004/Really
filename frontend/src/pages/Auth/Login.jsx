import { motion } from "framer-motion";
import * as React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/register");
  };

  const handleCreateAccount = () => {
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
    <div className="min-h-screen flex items-center justify-between bg-gradient-to-br from-gray-900 to-black p-8">
      {/* Left Image - Added fixed width and height to match form */}
      <div className="hidden md:flex flex-1 items-center justify-end pr-8">
        <div className="w-[400px] h-[600px]"> {/* Fixed dimensions */}
          <img 
            src="https://images.meesho.com/images/products/355695546/ja55g_512.webp" 
            alt="Decorative left"
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>
      </div>

      {/* Center Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col px-10 py-14 text-base leading-6 bg-[#2b2b2b] text-white shadow-xl w-full max-w-[540px] rounded-2xl mx-4 z-10"
      >
        <div className="self-center text-3xl font-bold leading-10 text-center">
          Log Into Account
        </div>
        <div className="flex gap-2 self-center mt-6 text-center">
          <div className="text-gray-400">Don't have an account?</div>
          <button
            className="text-blue-500 hover:text-blue-400 transition duration-200 flex items-center gap-1 group"
            onClick={handleSignIn}
          >
            Sign Up{" "}
            <span className="transform group-hover:translate-x-1 transition duration-200">→</span>
          </button>
        </div>

        <label className="mt-12 text-sm text-gray-300 max-md:mt-10">
          Email
        </label>
        <input
          type="email"
          className="px-4 py-4 mt-2 bg-black border border-slate-600 rounded text-white placeholder-gray-400"
          placeholder="Enter Email Address"
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          title="Please enter a valid email address"
          required
        />

        <label className="mt-7 text-sm text-gray-300">Password</label>
        <input
          type="password"
          className="px-4 py-4 mt-2 bg-black border border-slate-600 rounded text-white placeholder-gray-400"
          placeholder="Enter Password"
        />

        <button
          className="mt-6 px-16 py-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition max-md:px-5"
          onClick={handleCreateAccount}
        >
          Login
        </button>

        <div className="mt-7 h-px bg-zinc-600" />
        <div className="self-center mt-7 text-sm text-gray-400">
          Or login using:
        </div>

        <button
          className="flex justify-center items-center px-16 py-3 mt-7 text-white bg-gray-800 rounded border border-zinc-600 max-md:px-5 hover:bg-gray-700 transition"
          onClick={handleGoogleSignIn}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a73199f1bb1d3ea89b40297fa0cb3c5a5d23d64a09d3c0065afa4619abb32ce?apiKey=597363a3080546f9b072bf59bebbfd17&"
            className="w-6 h-6 mr-2"
            alt="Google"
          />
          Continue with Google
        </button>

        <button
          className="flex justify-center items-center px-16 py-3 mt-3 text-white bg-gray-800 rounded border border-zinc-600 max-md:px-5 hover:bg-gray-700 transition"
          onClick={handleFacebookSignIn}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3feb9724a7eb37edc68e698d2bf9cfdafff2e78a2d0733da73a89c1beed3d397?apiKey=597363a3080546f9b072bf59bebbfd17&"
            className="w-6 h-6 mr-2"
            alt="Facebook"
          />
          Continue with Facebook
        </button>
      </motion.div>

      {/* Right Image - Same dimensions as left image */}
      <div className="hidden md:flex flex-1 items-center justify-start pl-8">
        <div className="w-[400px] h-[600px]"> {/* Same fixed dimensions */}
          <img 
            src="https://images.unsplash.com/photo-1701673072655-0b7c89ec2138?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFuaW1lJTIwaG9vZGllfGVufDB8fDB8fHww" 
            alt="Decorative right"
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;