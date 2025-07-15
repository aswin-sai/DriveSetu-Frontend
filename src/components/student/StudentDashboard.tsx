import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData, Session } from '../../context/DataContext';
import StudentHeader from './StudentHeader';
import ProgressOverview from './ProgressOverview';
import SessionHistory from './SessionHistory';
import DayWiseReport from './DayWiseReport';
import PerformanceMetrics from './PerformanceMetrics';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { students, getStudentSessions } = useData();
  const [activeTab, setActiveTab] = useState('overview');
  const [sessions, setSessions] = useState<Session[]>([]);

  const student = students.find(s => s.id === user?.id);

  useEffect(() => {
    if (user && getStudentSessions) {
      getStudentSessions(user.id).then(setSessions);
    }
  }, [user, getStudentSessions]);

  if (!student) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>
      Student profile not found. Please contact admin.
    </div>;
  }

  // Calculate stats from sessions
  const stats = {
    totalSessions: sessions.length,
    totalDistance: sessions.reduce((sum, s) => sum + (s.distance || 0), 0),
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'history', label: 'Session History', icon: '📋' },
    { id: 'daywise', label: 'Day-wise Report', icon: '📅' },
    { id: 'performance', label: 'Performance', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentHeader student={student} stats={stats} />
      
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
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'overview' && <ProgressOverview student={student} sessions={sessions} />}
          {activeTab === 'history' && <SessionHistory sessions={sessions} />}
          {activeTab === 'daywise' && <DayWiseReport sessions={sessions} />}
          {activeTab === 'performance' && <PerformanceMetrics sessions={sessions} student={student} />}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;