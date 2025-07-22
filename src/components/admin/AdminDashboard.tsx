import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import AdminHeader from './AdminHeader';
import StudentsOverview from './StudentsOverview';
import SessionLogger from './SessionLogger';
import SchoolAnalytics from './SchoolAnalytics';
import StudentDetails from './StudentDetails';
import UserManagement from './UserManagement';
import AttendancePage from './AttendancePage';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { students, sessions } = useData();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: 'Students Overview', icon: '👥' },
    { id: 'users', label: 'User Management', icon: '👤' },
    { id: 'logger', label: 'Record Session', icon: '📝' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'attendance', label: 'Attendance', icon: '📅' },
  ];

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudentId(studentId);
    setActiveTab('details');
  };

  const handleBackToOverview = () => {
    setSelectedStudentId(null);
    setActiveTab('overview');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-6">
          <div className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
            
            {selectedStudentId && (
              <button
                onClick={handleBackToOverview}
                className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                ← Back to Overview
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'overview' && (
            <StudentsOverview students={students} onStudentSelect={handleStudentSelect} />
          )}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'logger' && <SessionLogger students={students} />}
          {activeTab === 'analytics' && <SchoolAnalytics students={students} sessions={sessions} />}
          {activeTab === 'attendance' && <AttendancePage />}
          {activeTab === 'details' && selectedStudentId && (
            <StudentDetails studentId={selectedStudentId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;