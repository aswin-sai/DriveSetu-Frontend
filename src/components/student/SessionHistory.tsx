import React, { useState } from 'react';
import { Search, Calendar, MapPin, Clock, Route } from 'lucide-react';
import { Session } from '../../context/DataContext';

interface SessionHistoryProps {
  sessions: Session[];
}

const SessionHistory: React.FC<SessionHistoryProps> = ({ sessions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const sessionTypes = ['all', ...new Set(sessions.map(s => s.sessionType).filter(Boolean))];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = (session.instructor?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (session.sessionType?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (session.location?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || session.sessionType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-4">Session History</h2>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by instructor, type, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sessionTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6">
        {filteredSessions.length > 0 ? (
          <div className="space-y-4">
            {filteredSessions.map(session => (
              <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{session.sessionType || 'Unknown Type'}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {session.instructor || 'Unknown Instructor'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {session.date ? new Date(session.date).toLocaleDateString() : 'Unknown Date'}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {session.startTime || 'N/A'} - {session.endTime || 'N/A'}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Route className="w-4 h-4" />
                        {session.distance || 0} km
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {session.location || 'Unknown Location'}
                      </div>
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
          <div className="text-center py-8">
            <p className="text-gray-500">No sessions found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionHistory;