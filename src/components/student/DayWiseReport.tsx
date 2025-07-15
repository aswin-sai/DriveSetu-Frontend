import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Session } from '../../context/DataContext';

interface DayWiseReportProps {
  sessions: Session[];
}

const DayWiseReport: React.FC<DayWiseReportProps> = ({ sessions }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDateIter = new Date(startDate);
    
    while (currentDateIter <= lastDay || days.length % 7 !== 0) {
      days.push(new Date(currentDateIter));
      currentDateIter.setDate(currentDateIter.getDate() + 1);
    }

    return days;
  };

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sessions.filter(session => session.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthData = getMonthData();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Day-wise Report</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center font-medium text-gray-600 bg-gray-50 rounded-lg">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {monthData.map((date, index) => {
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const daySessions = getSessionsForDate(date);
            const totalDistance = daySessions.reduce((sum, session) => sum + session.distance, 0);
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`p-2 min-h-[100px] border rounded-lg ${
                  isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                } ${isToday ? 'ring-2 ring-blue-500' : 'border-gray-200'}`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {date.getDate()}
                </div>
                
                {daySessions.length > 0 && (
                  <div className="space-y-1">
                    {daySessions.slice(0, 2).map(session => (
                      <div
                        key={session.id}
                        className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate"
                        title={`${session.sessionType} with ${session.instructor}`}
                      >
                        {session.sessionType}
                      </div>
                    ))}
                    
                    {daySessions.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{daySessions.length - 2} more
                      </div>
                    )}
                    
                    {totalDistance > 0 && (
                      <div className="text-xs font-medium text-green-600">
                        {totalDistance} km
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Monthly Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Monthly Summary</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Sessions: </span>
              <span className="font-medium">
                {sessions.filter(s => {
                  const sessionDate = new Date(s.date);
                  return sessionDate.getMonth() === currentDate.getMonth() && 
                         sessionDate.getFullYear() === currentDate.getFullYear();
                }).length}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Total Distance: </span>
              <span className="font-medium">
                {sessions.filter(s => {
                  const sessionDate = new Date(s.date);
                  return sessionDate.getMonth() === currentDate.getMonth() && 
                         sessionDate.getFullYear() === currentDate.getFullYear();
                }).reduce((sum, s) => sum + s.distance, 0)} km
              </span>
            </div>
            <div>
              <span className="text-gray-600">Active Days: </span>
              <span className="font-medium">
                {new Set(sessions.filter(s => {
                  const sessionDate = new Date(s.date);
                  return sessionDate.getMonth() === currentDate.getMonth() && 
                         sessionDate.getFullYear() === currentDate.getFullYear();
                }).map(s => s.date)).size}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayWiseReport;