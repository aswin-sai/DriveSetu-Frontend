import React, { useState } from 'react';
import { Search, Filter, Eye, Phone, MapPin } from 'lucide-react';
import { Student } from '../../context/DataContext';

interface StudentsOverviewProps {
  students: Student[];
  onStudentSelect: (studentId: string) => void;
}

const StudentsOverview: React.FC<StudentsOverviewProps> = ({ students, onStudentSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Test Ready'];

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      (student.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (student.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (student.address?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || student.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-red-100 text-red-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Test Ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-4">All Students</h2>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students by name, email, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStudents.map(student => (
              <div key={student.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{student.name}</h3>
                    <p className="text-gray-600">{student.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getLevelColor(student.level)}`}>
                        {student.level}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                        {student.licenseCategory}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onStudentSelect(student.id)}
                    className="flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Sessions</p>
                    <p className="text-2xl font-bold text-blue-600">{student.totalSessions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Distance Covered</p>
                    <p className="text-2xl font-bold text-green-600">{student.totalDistance} km</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{student.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{student.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>Joined: {new Date(student.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No students found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsOverview;