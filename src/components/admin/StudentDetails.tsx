import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, MapPin, Calendar, Award, Clock, Route } from 'lucide-react';
import { useData, Session } from '../../context/DataContext';
import ProgressChart from '../charts/ProgressChart';

interface StudentDetailsProps {
  studentId: string;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ studentId }) => {
  const { students, getStudentSessions } = useData();
  const student = students.find(s => s.id === studentId);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    if (studentId && getStudentSessions) {
      getStudentSessions(studentId).then(setSessions);
    }
  }, [studentId, getStudentSessions]);

  if (!student) {
    return <div>Student not found</div>;
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-red-100 text-red-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Test Ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressData = () => {
    const monthlyData: { [key: string]: { sessions: number; distance: number } } = {};
    
    sessions.forEach(session => {
      const date = new Date(session.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { sessions: 0, distance: 0 };
      }
      
      monthlyData[monthKey].sessions += 1;
      monthlyData[monthKey].distance += session.distance;
    });
    
    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        sessions: data.sessions,
        distance: data.distance,
      }));
  };

  const progressData = getProgressData();
  const recentSessions = sessions.slice(0, 10);
  const totalDistance = sessions.reduce((sum, s) => sum + s.distance, 0);
  const averageDistance = sessions.length > 0 ? Math.round(totalDistance / sessions.length) : 0;

  return (
    <div className="space-y-6">
      {/* Student Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <h1 className="text-2xl font-bold">{student.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(student.level)}`}>
                {student.level}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                {student.licenseCategory}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{student.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Joined: {new Date(student.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Award className="w-4 h-4" />
                <span>{student.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
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
              <p className="text-sm text-gray-600">Total Distance</p>
              <p className="text-3xl font-bold text-green-600">{totalDistance} km</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Route className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Distance</p>
              <p className="text-3xl font-bold text-orange-600">{averageDistance} km</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Route className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Level</p>
              <p className="text-lg font-bold text-purple-600">{student.level}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Progress Over Time</h3>
        <ProgressChart data={progressData} />
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>
        {recentSessions.length > 0 ? (
          <div className="space-y-4">
            {recentSessions.map(session => (
              <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h4 className="font-semibold">{session.sessionType}</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(session.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{session.startTime} - {session.endTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Route className="w-4 h-4" />
                        <span>{session.distance} km</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{session.location}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {session.instructor}
                      </span>
                    </div>
                    {session.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700"><strong>Notes:</strong> {session.notes}</p>
                      </div>
                    )}
                  </div>
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

export default StudentDetails;