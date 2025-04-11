import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { login, register, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUsername("");
    setPassword("");
    setFormError("");
  }, [isRegistering]);

  useEffect(()=>{
    setFormError(error)
  },[error])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      if (!isRegistering) {
        await login(username, password);
      } else {
        await register(username, password);
      }
      navigate("/");
    } catch (err) {
      setFormError(err.response?.data?.message || "Authentication failed");
    }
  };

  const transitionProps = {
    type: "spring",
    stiffness: 80,
    damping: 15,
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 px-4">
      {/* Desktop Card */}
      <motion.div
        layout
        transition={transitionProps}
        className="hidden md:flex bg-white rounded-3xl shadow-2xl w-[90%] h-[85vh] overflow-hidden flex-row"
      >
        {/* Left Panel */}
        <motion.div
          layout
          className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 text-white relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isRegistering ? "register-text" : "login-text"}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="text-center px-10"
            >
              <motion.h3 layout className="text-2xl font-bold mb-2">
                {isRegistering ? "Join the community!" : "Welcome back!"}
              </motion.h3>
              <p className="text-sm text-white/80">
                {isRegistering
                  ? "Create your account to explore the app."
                  : "Login to continue where you left off."}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Right Panel */}
        <motion.div layout className="w-1/2 p-10 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isRegistering ? (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ ...transitionProps, duration: 0.6 }}
              >
                <motion.h2
                  layout
                  className="text-3xl font-bold text-gray-800 mb-6"
                >
                  Create Account
                </motion.h2>
                {(formError) && (
                  <div className="p-3 text-sm text-red-600 bg-red-100 rounded mb-2">
                    {formError}
                  </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User />
                    </div>
                    <input
                      type="text"
                      placeholder="User Name"
                      id="username"
                      name="username"
                      autoComplete="username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock />
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      name="password"
                      autoComplete={
                        !isRegistering ? "current-password" : "new-password"
                      }
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.02 }}
                    transition={transitionProps}
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                  >
                    Register
                  </motion.button>
                </form>
                <p className="mt-6 text-sm text-gray-500 text-center">
                  Already have an account?{" "}
                  <button
                    className="text-indigo-600 hover:underline"
                    onClick={() => setIsRegistering(false)}
                  >
                    Login
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ ...transitionProps, duration: 0.6 }}
              >
                <motion.h2
                  layout
                  className="text-3xl font-bold text-gray-800 mb-6"
                >
                  Welcome Back
                </motion.h2>
                {(formError) && (
                  <div className="p-3 text-sm text-red-600 bg-red-100 rounded mb-2">
                    {formError}
                  </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User />
                    </div>
                    <input
                      type="text"
                      placeholder="User Name"
                      id="username"
                      name="username"
                      autoComplete="username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock />
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      name="password"
                      autoComplete={
                        !isRegistering ? "current-password" : "new-password"
                      }
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.02 }}
                    transition={transitionProps}
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                  >
                    Login
                  </motion.button>
                </form>
                <p className="mt-6 text-sm text-gray-500 text-center">
                  New here?{" "}
                  <button
                    className="text-indigo-600 hover:underline"
                    onClick={() => setIsRegistering(true)}
                  >
                    Register
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Mobile Layout */}
      <div className="w-full max-w-md md:hidden bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {isRegistering ? "Create Account" : "Login"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {(formError) && (
            <div className="p-3 text-sm text-red-600 bg-red-100 rounded mb-2">
              {formError}
            </div>
          )}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <User />
            </div>
            <input
              type="text"
              placeholder="User Name"
              id="username"
              name="username"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock />
            </div>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              autoComplete={
                !isRegistering ? "current-password" : "new-password"
              }
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center">
          {isRegistering ? "Already have an account?" : "New here?"}{" "}
          <button
            className="text-indigo-600 hover:underline"
            onClick={() => setIsRegistering((prev) => !prev)}
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
