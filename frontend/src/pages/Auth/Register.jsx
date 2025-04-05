import * as React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleCreateAccount = () => {
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput.checkValidity()) {
      alert("Create account logic placeholder");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleGoogleSignIn = () => {};
  const handleFacebookSignIn = () => {};

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-100 to-gray-900">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen items-center justify-center p-6"
      >
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden max-w-5xl w-full mt-16"> {/* Added mt-16 */}
          <div className="flex flex-col px-16 py-14 text-base leading-6 bg-gray-100 max-w-xl max-md:px-6 w-full">
            <div className="self-center text-3xl font-bold leading-10 text-center text-gray-900">
              Create an Account
            </div>
            <div className="flex gap-2 self-center mt-6 text-center items-center">
              <div className="text-gray-500">Have an Account?</div>
              <button
                className="text-blue-600 flex items-center gap-1 transition-all duration-300 hover:gap-2"
                onClick={handleSignIn}
              >
                Log In
                <span className="transition-all duration-300">→</span>
              </button>
            </div>
            <div className="mt-12 text-sm leading-5 text-gray-500 max-md:mt-10">
              Email
            </div>
            <input
              type="email"
              className="px-4 py-4 mt-2.5 bg-white rounded border border-slate-200 text-slate-600 placeholder:text-slate-400 w-full"
              placeholder="Enter Email Address"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Please enter a valid email address"
              required
            />
            <div className="mt-6 text-sm leading-5 text-gray-500">Create Password</div>
            <input
              type="password"
              className="px-4 py-4 mt-2.5 bg-white rounded border border-slate-200 text-slate-600 placeholder:text-slate-400 w-full"
              placeholder="Create Password"
            />
            <button
              className="mt-6 px-16 py-4 text-white bg-blue-600 hover:bg-blue-700 transition rounded w-full"
              onClick={handleCreateAccount}
            >
              Create Account
            </button>
            <div className="self-center mt-7 text-sm leading-5 text-center text-gray-500">
              By creating account, you agree to our
            </div>
            <div className="self-center text-sm leading-5 text-center text-gray-500">
              <a href="/terms-of-service" className="text-blue-600">
                Terms of Service
              </a>
            </div>
            <div className="shrink-0 mt-7 h-px bg-zinc-200" />
            <div className="self-center mt-7 text-sm leading-5 text-center text-gray-500">
              Or create an account using:
            </div>
            <button
              className="flex justify-center items-center px-6 py-3 mt-6 text-blue-600 bg-white rounded border border-zinc-200"
              onClick={handleGoogleSignIn}
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a73199f1bb1d3ea89b40297fa0cb3c5a5d23d64a09d3c0065afa4619abb32ce?apiKey=597363a3080546f9b072bf59bebbfd17&"
                className="w-6 h-6 mr-2"
                alt="Google Logo"
              />
              Continue with Google
            </button>
            <button
              className="flex justify-center items-center px-6 py-3 mt-3 text-blue-600 bg-white rounded border border-zinc-200"
              onClick={handleFacebookSignIn}
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3feb9724a7eb37edc68e698d2bf9cfdafff2e78a2d0733da73a89c1beed3d397?apiKey=597363a3080546f9b072bf59bebbfd17&"
                className="w-6 h-6 mr-2"
                alt="Facebook Logo"
              />
              Continue with Facebook
            </button>
          </div>
          <div className="hidden md:block w-full">
            <img
              src="https://images.unsplash.com/photo-1659082056845-3b839c7551bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWUlMjBob29kaWV8ZW58MHx8MHx8fDA%3D"
              alt="Decorative Right Side"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;