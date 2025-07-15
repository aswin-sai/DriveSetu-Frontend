import React, { useState } from 'react';
import { Car, UserCheck, Shield, AlertCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password, activeTab);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    if (activeTab === 'student') {
      setEmail('priya@demo.com');
      setPassword('student123');
    } else {
      setEmail('admin@ganesh.com');
      setPassword('admin123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Road Lines Animation */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-30">
          <motion.div
            className="h-full w-20 bg-white opacity-60"
            animate={{ x: [-100, window.innerWidth + 100] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Floating Car Icons */}
        <motion.div
          className="absolute top-20 right-20 text-blue-400 opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Car className="w-16 h-16" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 left-16 text-orange-400 opacity-20"
          animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Car className="w-12 h-12" />
        </motion.div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-full shadow-2xl">
                  <Car className="w-10 h-10 text-white" />
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-3"
            >
              Ganesh Driving School
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-blue-200 text-lg"
            >
              Learn to Drive Safely & Confidently
            </motion.p>
          </div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
          >
            {/* Tab Headers */}
            <div className="flex relative">
              <motion.div
                className="absolute top-0 h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-xl"
                animate={{
                  x: activeTab === 'student' ? 0 : '100%',
                  width: '50%'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              
              <button
                onClick={() => setActiveTab('student')}
                className={`relative z-10 flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'student' ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                <UserCheck className="w-5 h-5 inline mr-2" />
                Student
              </button>
              
              <button
                onClick={() => setActiveTab('admin')}
                className={`relative z-10 flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'admin' ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Shield className="w-5 h-5 inline mr-2" />
                Admin
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="p-8">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center text-red-200 backdrop-blur-sm"
                >
                  <AlertCircle className="w-5 h-5 mr-3" />
                  {error}
                </motion.div>
              )}

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm"
                      placeholder="Enter your email"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 opacity-0 transition-opacity duration-300 focus-within:opacity-20 pointer-events-none"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-gray-200 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm"
                      placeholder="Enter your password"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 opacity-0 transition-opacity duration-300 focus-within:opacity-20 pointer-events-none"></div>
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden ${
                    activeTab === 'student'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                      : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800'
                  } ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-2xl transform hover:-translate-y-1'}`}
                >
                  {isLoading && (
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ x: [-100, 300] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Starting Engine...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Start Your Journey
                      </>
                    )}
                  </span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={fillDemoCredentials}
                  whileHover={{ scale: 1.05 }}
                  className="w-full py-3 px-4 text-sm text-gray-300 hover:text-white transition-all duration-300 border border-white/20 rounded-xl hover:bg-white/10"
                >
                  🚗 Fill Demo Credentials
                </motion.button>
              </div>
            </form>

            {/* Demo Info */}
            {/*
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-white/5 p-6 border-t border-white/10 backdrop-blur-sm"
            >
              <h3 className="font-semibold text-gray-200 mb-3 flex items-center">
                <Car className="w-4 h-4 mr-2" />
                Demo Credentials:
              </h3>
              <div className="text-sm text-gray-300 space-y-2">
                {activeTab === 'student' ? (
                  <>
                    <p><strong className="text-blue-300">Student:</strong> priya@demo.com / student123</p>
                    <p><strong className="text-blue-300">Others:</strong> arun@demo.com, lakshmi@demo.com, etc.</p>
                  </>
                ) : (
                  <p><strong className="text-orange-300">Admin:</strong> admin@ganesh.com / admin123</p>
                )}
              </div>
            </motion.div>
            */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;