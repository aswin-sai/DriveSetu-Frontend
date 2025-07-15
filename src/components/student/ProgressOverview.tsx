import React from 'react';
import { Clock, Route, Target, TrendingUp } from 'lucide-react';
import { Student, Session } from '../../context/DataContext';

interface ProgressOverviewProps {
  student: Student;
  sessions: Session[];
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ student, sessions }) => {
  const recentSessions = sessions.slice(0, 5);
  const thisWeekSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return sessionDate >= weekAgo;
  });

  const averageDistance = sessions.length > 0 
    ? Math.round(sessions.reduce((sum, s) => sum + s.distance, 0) / sessions.length)
    : 0;

  const progressPercentage = {
    'Beginner': 25,
    'Intermediate': 50,
    'Advanced': 75,
    'Test Ready': 95,
  }[student.level] || 0;

  return (
    <div className="space-y-6">
      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sessions</p>
              <p className="text-3xl font-bold text-blue-600">{sessions.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Distance Covered</p>
              <p className="text-3xl font-bold text-green-600">{sessions.reduce((sum, s) => sum + s.distance, 0)} km</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Route className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-3xl font-bold text-orange-600">{thisWeekSessions.length}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Distance</p>
              <p className="text-3xl font-bold text-purple-600">{averageDistance} km</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Current Level: {student.level}</span>
          <span className="text-sm font-medium text-blue-600">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Beginner</span>
          <span>Intermediate</span>
          <span>Advanced</span>
          <span>Test Ready</span>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>
        {recentSessions.length > 0 ? (
          <div className="space-y-3">
            {recentSessions.map(session => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{session.sessionType}</p>
                  <p className="text-sm text-gray-600">{new Date(session.date).toLocaleDateString()} with {session.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">{session.distance} km</p>
                  <p className="text-sm text-gray-600">{session.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No sessions recorded yet</p>
        )}
      </div>
    </div>
  );
};

export default ProgressOverview;