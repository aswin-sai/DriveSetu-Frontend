import React from 'react';

interface SchoolStatsChartProps {
  data: Array<{
    month: string;
    students: number;
    sessions: number;
    distance: number;
  }>;
}

const SchoolStatsChart: React.FC<SchoolStatsChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  const maxSessions = Math.max(...data.map(d => d.sessions));
  const maxStudents = Math.max(...data.map(d => d.students));

  return (
    <div className="h-64">
      <div className="flex items-end justify-between h-full space-x-2">
        {data.map((item, index) => {
          const sessionHeight = (item.sessions / maxSessions) * 200;
          const studentHeight = (item.students / maxStudents) * 200;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="flex items-end space-x-1 mb-2">
                <div
                  className="bg-orange-500 rounded-t transition-all duration-1000 w-4"
                  style={{ height: `${sessionHeight}px` }}
                  title={`${item.sessions} sessions`}
                />
                <div
                  className="bg-blue-500 rounded-t transition-all duration-1000 w-4"
                  style={{ height: `${studentHeight}px` }}
                  title={`${item.students} active students`}
                />
              </div>
              <div className="text-xs text-gray-600 text-center">
                {item.month}
              </div>
              <div className="text-xs text-gray-500 text-center">
                {item.sessions}s / {item.students}st
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span>Sessions</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Active Students</span>
        </div>
      </div>
    </div>
  );
};

export default SchoolStatsChart;