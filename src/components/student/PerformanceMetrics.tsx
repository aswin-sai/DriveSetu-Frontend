import React from 'react';
import { TrendingUp, Target, Award, Clock } from 'lucide-react';
import { Session, Student } from '../../context/DataContext';
import ProgressChart from '../charts/ProgressChart';
import SkillRadarChart from '../charts/SkillRadarChart';

interface PerformanceMetricsProps {
  sessions: Session[];
  student: Student;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ sessions, student }) => {
  const getMonthlyProgress = () => {
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

  const getSkillLevels = () => {
    const skillTypes = {
      'Theory Class': 0,
      'Practical - City Roads': 0,
      'Highway Practice': 0,
      'Parking Practice': 0,
      'Test Preparation': 0,
    };

    sessions.forEach(session => {
      if (skillTypes.hasOwnProperty(session.sessionType)) {
        skillTypes[session.sessionType as keyof typeof skillTypes] += 1;
      }
    });

    const maxSessions = Math.max(...Object.values(skillTypes));
    
    return Object.entries(skillTypes).map(([skill, count]) => ({
      skill: skill.replace('Practical - ', '').replace('Practice', ''),
      level: maxSessions > 0 ? Math.round((count / maxSessions) * 100) : 0,
    }));
  };

  const calculateStreaks = () => {
    const sortedSessions = [...sessions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let currentStreak = 0;
    let maxStreak = 0;
    let lastDate: Date | null = null;

    sortedSessions.forEach(session => {
      const sessionDate = new Date(session.date);
      
      if (!lastDate || (sessionDate.getTime() - lastDate.getTime()) <= 7 * 24 * 60 * 60 * 1000) {
        currentStreak += 1;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
      
      lastDate = sessionDate;
    });

    return { currentStreak, maxStreak };
  };

  const monthlyProgress = getMonthlyProgress();
  const skillLevels = getSkillLevels();
  const streaks = calculateStreaks();

  const averageSessionsPerWeek = sessions.length > 0 
    ? Math.round((sessions.length / Math.max(1, Math.ceil((new Date().getTime() - new Date(sessions[sessions.length - 1]?.date || new Date()).getTime()) / (7 * 24 * 60 * 60 * 1000)))) * 10) / 10
    : 0;

  return (
    <div className="space-y-6">
      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-3xl font-bold text-green-600">{streaks.currentStreak}</p>
              <p className="text-sm text-gray-500">consecutive sessions</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Best Streak</p>
              <p className="text-3xl font-bold text-blue-600">{streaks.maxStreak}</p>
              <p className="text-sm text-gray-500">sessions record</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Weekly Average</p>
              <p className="text-3xl font-bold text-orange-600">{averageSessionsPerWeek}</p>
              <p className="text-sm text-gray-500">sessions per week</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Progress Level</p>
              <p className="text-3xl font-bold text-purple-600">{student.level}</p>
              <p className="text-sm text-gray-500">current status</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Progress Over Time</h3>
          <ProgressChart data={monthlyProgress} />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Skill Development</h3>
          <SkillRadarChart data={skillLevels} />
        </div>
      </div>

      {/* Session Type Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Session Type Breakdown</h3>
        <div className="space-y-4">
          {skillLevels.map(skill => (
            <div key={skill.skill} className="flex items-center justify-between">
              <span className="font-medium">{skill.skill}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;