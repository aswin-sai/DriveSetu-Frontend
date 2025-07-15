import React from 'react';
import { LogOut, Car, Users, Clock, Route } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const AdminHeader: React.FC = () => {
  const { logout } = useAuth();
  const { students, sessions } = useData();

  const totalStudents = students.length;
  const totalSessions = sessions.length;
  const totalDistance = sessions.reduce((sum, session) => sum + session.distance, 0);
  const activeStudents = students.filter(student => student.totalSessions > 0).length;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-orange-900 to-slate-800 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-20 text-orange-400 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Car className="w-32 h-32" />
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
                className="text-3xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent"
              >
                Ganesh Driving School
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-orange-200"
              >
                Admin Dashboard
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Total Students</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent"
                >
                  {totalStudents}
                </motion.p>
              </div>
              <Users className="w-8 h-8 text-orange-300" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Active Students</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent"
                >
                  {activeStudents}
                </motion.p>
              </div>
              <Users className="w-8 h-8 text-blue-300" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Total Sessions</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                  className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent"
                >
                  {totalSessions}
                </motion.p>
              </div>
              <Clock className="w-8 h-8 text-green-300" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -5 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Total Distance</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent"
                >
                  {totalDistance} km
                </motion.p>
              </div>
              <Route className="w-8 h-8 text-purple-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;