import React from 'react';
import { TrendingUp, Users, Calendar, Route, Award, Clock } from 'lucide-react';
import { Student, Session } from '../../context/DataContext';
import SchoolStatsChart from '../charts/SchoolStatsChart';
import InstructorPerformanceChart from '../charts/InstructorPerformanceChart';

interface SchoolAnalyticsProps {
  students: Student[];
  sessions: Session[];
}

const SchoolAnalytics: React.FC<SchoolAnalyticsProps> = ({ students, sessions }) => {
  const getMonthlyStats = () => {
    const monthlyData: { [key: string]: { students: Set<string>; sessions: number; distance: number } } = {};
    
    sessions.forEach(session => {
      const date = new Date(session.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { students: new Set(), sessions: 0, distance: 0 };
      }
      
      monthlyData[monthKey].students.add(session.studentId);
      monthlyData[monthKey].sessions += 1;
      monthlyData[monthKey].distance += session.distance;
    });
    
    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        students: data.students.size,
        sessions: data.sessions,
        distance: data.distance,
      }));
  };

  const getInstructorStats = () => {
    const instructorData: { [key: string]: { sessions: number; students: Set<string>; distance: number } } = {};
    
    sessions.forEach(session => {
      if (!instructorData[session.instructor]) {
        instructorData[session.instructor] = { sessions: 0, students: new Set(), distance: 0 };
      }
      
      instructorData[session.instructor].sessions += 1;
      instructorData[session.instructor].students.add(session.studentId);
      instructorData[session.instructor].distance += session.distance;
    });
    
    return Object.entries(instructorData).map(([instructor, data]) => ({
      instructor: instructor.replace(' Sir', '').replace(' Madam', ''),
      sessions: data.sessions,
      students: data.students.size,
      distance: data.distance,
    }));
  };

  const getLevelDistribution = () => {
    const distribution = students.reduce((acc, student) => {
      acc[student.level] = (acc[student.level] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(distribution).map(([level, count]) => ({ level, count }));
  };

  const getRecentActivity = () => {
    return sessions
      .slice(0, 10)
      .map(session => {
        const student = students.find(s => s.id === session.studentId);
        return {
          ...session,
          studentName: student?.name || 'Unknown Student',
        };
      });
  };

  const monthlyStats = getMonthlyStats();
  const instructorStats = getInstructorStats();
  const levelDistribution = getLevelDistribution();
  const recentActivity = getRecentActivity();

  const totalRevenue = sessions.length * 500; // Assuming ₹500 per session
  const averageSessionsPerStudent = students.length > 0 ? Math.round(sessions.length / students.length) : 0;
  const thisMonthSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    const currentDate = new Date();
    return sessionDate.getMonth() === currentDate.getMonth() && 
           sessionDate.getFullYear() === currentDate.getFullYear();
  }).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">estimated</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-blue-600">{thisMonthSessions}</p>
              <p className="text-sm text-gray-500">sessions</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Sessions</p>
              <p className="text-3xl font-bold text-orange-600">{averageSessionsPerStudent}</p>
              <p className="text-sm text-gray-500">per student</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold text-purple-600">92%</p>
              <p className="text-sm text-gray-500">pass rate</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
          <SchoolStatsChart data={monthlyStats} />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Instructor Performance</h3>
          <InstructorPerformanceChart data={instructorStats} />
        </div>
      </div>

      {/* Student Level Distribution & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Student Level Distribution</h3>
          <div className="space-y-4">
            {levelDistribution.map(({ level, count }) => {
              const percentage = (count / students.length) * 100;
              const colors = {
                'Beginner': 'bg-red-500',
                'Intermediate': 'bg-yellow-500',
                'Advanced': 'bg-blue-500',
                'Test Ready': 'bg-green-500',
              };
              
              return (
                <div key={level} className="flex items-center justify-between">
                  <span className="font-medium">{level}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${colors[level as keyof typeof colors]} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{activity.studentName}</p>
                  <p className="text-xs text-gray-600">{activity.sessionType} with {activity.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">{activity.distance} km</p>
                  <p className="text-xs text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolAnalytics;