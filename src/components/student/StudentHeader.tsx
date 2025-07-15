import React from 'react';
import { LogOut, Car, MapPin, Calendar, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../context/DataContext';

interface StudentHeaderProps {
  student: Student;
  stats: { totalSessions: number; totalDistance: number };
}

const StudentHeader: React.FC<StudentHeaderProps> = ({ student, stats }) => {
  const { logout } = useAuth();

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-red-100 text-red-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Test Ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-20 text-blue-400 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Car className="w-32 h-32" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-10 left-20 text-orange-400 opacity-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Car className="w-24 h-24" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-full shadow-2xl">
                <Car className="w-8 h-8 text-white" />
              </div>
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
              >
                Ganesh Driving School
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-blue-200"
              >
                Student Dashboard
              </motion.p>
            </div>
          </div>
          <motion.button
            onClick={logout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-semibold mb-6"
              >
                Welcome back, {student.name}! 🚗
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center space-x-3"
                >
                  <Calendar className="w-5 h-5 text-orange-300" />
                  <div>
                    <p className="text-sm text-gray-300">Joined</p>
                    <p className="font-medium">{new Date(student.joinDate).toLocaleDateString()}</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center space-x-3"
                >
                  <MapPin className="w-5 h-5 text-orange-300" />
                  <div>
                    <p className="text-sm text-gray-300">Location</p>
                    <p className="font-medium">{student.address}</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center space-x-3"
                >
                  <Award className="w-5 h-5 text-orange-300" />
                  <div>
                    <p className="text-sm text-gray-300">License Category</p>
                    <p className="font-medium">{student.licenseCategory}</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center space-x-3"
                >
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(student.level)}`}>
                    {student.level}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent"
                >
                  {stats.totalSessions}
                </motion.div>
                <div className="text-sm text-gray-300">Total Sessions</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                  className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent"
                >
                  {stats.totalDistance}
                </motion.div>
                <div className="text-sm text-gray-300">Kilometers Covered</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;