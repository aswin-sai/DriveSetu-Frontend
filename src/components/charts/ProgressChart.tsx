import React from 'react';

interface ProgressChartProps {
  data: Array<{
    month: string;
    sessions: number;
    distance: number;
  }>;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  const maxSessions = Math.max(...data.map(d => d.sessions));
  const maxDistance = Math.max(...data.map(d => d.distance));

  return (
    <div className="h-64">
      <div className="flex items-end justify-between h-full space-x-2">
        {data.map((item, index) => {
          const sessionHeight = (item.sessions / maxSessions) * 200;
          const distanceHeight = (item.distance / maxDistance) * 200;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="flex items-end space-x-1 mb-2">
                <div
                  className="bg-blue-500 rounded-t transition-all duration-1000 w-4"
                  style={{ height: `${sessionHeight}px` }}
                  title={`${item.sessions} sessions`}
                />
                <div
                  className="bg-green-500 rounded-t transition-all duration-1000 w-4"
                  style={{ height: `${distanceHeight}px` }}
                  title={`${item.distance} km`}
                />
              </div>
              <div className="text-xs text-gray-600 text-center">
                {item.month}
              </div>
              <div className="text-xs text-gray-500 text-center">
                {item.sessions}s / {item.distance}km
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Sessions</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Distance (km)</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;