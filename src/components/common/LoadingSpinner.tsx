import React from 'react';
import { Car } from 'lucide-react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          {/* Speedometer Ring */}
          <motion.div
            className="w-24 h-24 border-4 border-orange-200 border-t-orange-500 rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Car Icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Car className="w-8 h-8 text-orange-500" />
          </motion.div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mb-3"
        >
          Ganesh Driving School
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300"
        >
          Starting your engine...
        </motion.p>
        
        {/* Road Animation */}
        <div className="mt-8 w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
            animate={{ x: [-100, 300] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;