import React from 'react';

interface InstructorPerformanceChartProps {
  data: Array<{
    instructor: string;
    sessions: number;
    students: number;
    distance: number;
  }>;
}

const InstructorPerformanceChart: React.FC<InstructorPerformanceChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No instructor data available
      </div>
    );
  }

  const maxSessions = Math.max(...data.map(d => d.sessions));

  return (
    <div className="h-64">
      <div className="space-y-4">
        {data.map((instructor, index) => {
          const sessionPercentage = (instructor.sessions / maxSessions) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{instructor.instructor}</span>
                <div className="text-xs text-gray-600">
                  {instructor.sessions} sessions • {instructor.students} students • {instructor.distance} km
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${sessionPercentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Performance based on total sessions conducted</p>
      </div>
    </div>
  );
};

export default InstructorPerformanceChart;