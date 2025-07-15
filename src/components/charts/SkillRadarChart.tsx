import React from 'react';

interface SkillRadarChartProps {
  data: Array<{
    skill: string;
    level: number;
  }>;
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No skill data available
      </div>
    );
  }

  return (
    <div className="h-64">
      <div className="space-y-4">
        {data.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="font-medium text-sm w-24">{skill.skill}</span>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
            <span className="text-sm text-gray-600 w-12">{skill.level}%</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Skill levels based on session frequency</p>
      </div>
    </div>
  );
};

export default SkillRadarChart;