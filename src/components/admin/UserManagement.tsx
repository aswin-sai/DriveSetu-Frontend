import React, { useState } from 'react';
import { Plus, User, Mail, Phone, MapPin, Car, Save, X, CheckCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';

interface NewUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  licenseCategory: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Test Ready';
  username: string;
  password: string;
}

const UserManagement: React.FC = () => {
  const { students } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    email: '',
    phone: '',
    address: '',
    licenseCategory: 'Two Wheeler',
    level: 'Beginner',
    username: '',
    password: '',
  });
  const [createdCredentials, setCreatedCredentials] = useState<{ email: string; password: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const licenseCategories = ['Two Wheeler', 'Four Wheeler', 'Commercial Vehicle'];
  const levels: Array<'Beginner' | 'Intermediate' | 'Advanced' | 'Test Ready'> = ['Beginner', 'Intermediate', 'Advanced', 'Test Ready'];
  const hyderabadAreas = [
    'Gachibowli', 'Madhapur', 'Kukatpally', 'Kondapur', 'Banjara Hills',
    'Jubilee Hills', 'Miyapur', 'Secunderabad', 'Hitech City', 'Ameerpet'
  ];

  const handleInputChange = (field: keyof NewUser, value: string) => {
    setNewUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      // 1. Create the user in the backend
      const userRes = await fetch('http://127.0.0.1:5000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: newUser.username,
          name: newUser.name,
          email: newUser.email,
          role: 'student',
          password: newUser.password,
        }),
      });
      if (!userRes.ok) throw new Error('Failed to create user');

      // 2. Create the student profile in the backend
      const studentRes = await fetch('http://127.0.0.1:5000/students/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: newUser.username,
          phone: newUser.phone,
          join_date: new Date().toISOString().split('T')[0],
          level: newUser.level,
          total_sessions: 0,
          total_distance: 0,
          license_category: newUser.licenseCategory,
          address: newUser.address,
        }),
      });
      if (!studentRes.ok) {
        // Clean up: delete the user if student creation fails
        await fetch(`http://127.0.0.1:5000/users/${newUser.username}`, { method: 'DELETE' });
        throw new Error('Failed to create student profile. User creation rolled back.');
      }

      setIsSubmitting(false);
      setShowSuccess(true);
      setCreatedCredentials({ email: newUser.email, password: newUser.password });

      setTimeout(() => {
        setShowSuccess(false);
        setShowAddForm(false);
        setCurrentStep(1);
        setNewUser({
          name: '',
          email: '',
          phone: '',
          address: '',
          licenseCategory: 'Two Wheeler',
          level: 'Beginner',
          username: '',
          password: '',
        });
        setCreatedCredentials(null);
      }, 5000);
    } catch (error: any) {
      setErrorMsg(error.message || 'An error occurred.');
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return newUser.name && newUser.email && newUser.phone;
      case 2:
        return newUser.address && newUser.licenseCategory;
      case 3:
        return newUser.username && newUser.password;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">User Management</h2>
            <p className="text-slate-300">Manage student accounts and create new users</p>
          </div>
          <motion.button
            onClick={() => setShowAddForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Student</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Students</p>
              <p className="text-3xl font-bold">{students.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active Students</p>
              <p className="text-3xl font-bold">{students.filter(s => s.totalSessions > 0).length}</p>
            </div>
            <Car className="w-8 h-8 text-green-200" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">New This Month</p>
              <p className="text-3xl font-bold">
                {students.filter(s => {
                  const joinDate = new Date(s.joinDate);
                  const now = new Date();
                  return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <Plus className="w-8 h-8 text-purple-200" />
          </div>
        </motion.div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Success State */}
              <AnimatePresence>
                {showSuccess && createdCredentials && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-green-600 flex items-center justify-center z-10"
                  >
                    <div className="text-center text-white">
                      <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Student created successfully!</h3>
                      <p className="mb-2">Share these credentials with the student:</p>
                      <div className="bg-white/10 rounded-lg p-4 mb-2">
                        <strong>Email/Username:</strong> {createdCredentials.email}<br />
                        <strong>Password:</strong> {createdCredentials.password}
                      </div>
                      <p className="text-sm">This message will disappear in 5 seconds.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Add New Student</h3>
                    <p className="text-orange-100">Step {currentStep} of 3</p>
                  </div>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex-1">
                        <motion.div
                          className={`h-2 rounded-full ${
                            step <= currentStep ? 'bg-white' : 'bg-white/30'
                          }`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: step <= currentStep ? 1 : 0.3 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {errorMsg && (
                  <div className="bg-red-100 text-red-800 rounded-lg p-4 mb-4">
                    {errorMsg}
                  </div>
                )}
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <User className="w-12 h-12 text-orange-600 mx-auto mb-2" />
                        <h4 className="text-lg font-semibold">Personal Information</h4>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={newUser.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter student's full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={newUser.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter email address"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={newUser.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-2" />
                        <h4 className="text-lg font-semibold">Location & License Details</h4>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <select
                          value={newUser.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Select area in Hyderabad</option>
                          {hyderabadAreas.map(area => (
                            <option key={area} value={area}>{area}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          License Category
                        </label>
                        <select
                          value={newUser.licenseCategory}
                          onChange={(e) => handleInputChange('licenseCategory', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        >
                          {licenseCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Initial Level
                        </label>
                        <select
                          value={newUser.level}
                          onChange={(e) => handleInputChange('level', e.target.value as any)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        >
                          {levels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <Car className="w-12 h-12 text-orange-600 mx-auto mb-2" />
                        <h4 className="text-lg font-semibold">Account Credentials</h4>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          value={newUser.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                          placeholder="Choose a username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          value={newUser.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                          placeholder="Create a secure password"
                        />
                      </div>

                      {/* Summary */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h5 className="font-semibold mb-2">Account Summary:</h5>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Name:</strong> {newUser.name}</p>
                          <p><strong>Email:</strong> {newUser.email}</p>
                          <p><strong>Location:</strong> {newUser.address}</p>
                          <p><strong>License:</strong> {newUser.licenseCategory}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      currentStep === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Previous
                  </button>

                  {currentStep < 3 ? (
                    <motion.button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      whileHover={canProceed() ? { scale: 1.05 } : {}}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        canProceed()
                          ? 'bg-orange-600 text-white hover:bg-orange-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Next Step
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!canProceed() || isSubmitting}
                      whileHover={canProceed() && !isSubmitting ? { scale: 1.05 } : {}}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                        canProceed() && !isSubmitting
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          <span>Create Account</span>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Students List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">All Students</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {(student.name || '').charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{student.name}</h4>
                    <p className="text-sm text-gray-600">{student.level}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {student.email}
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {student.phone}
                  </p>
                  <p className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {student.address}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between text-sm">
                  <span className="text-blue-600 font-medium">{student.totalSessions} sessions</span>
                  <span className="text-green-600 font-medium">{student.totalDistance} km</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;