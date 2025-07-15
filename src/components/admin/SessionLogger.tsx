import React, { useState } from 'react';
import { Calendar, Clock, Route, MapPin, User, FileText, Save, CheckCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Student } from '../../context/DataContext';

interface SessionLoggerProps {
  students: Student[];
}

const SessionLogger: React.FC<SessionLoggerProps> = ({ students }) => {
  const { addSession } = useData();
  const [formData, setFormData] = useState({
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    distance: '',
    instructor: '',
    sessionType: '',
    location: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const instructors = ['Sadhvik Sir', 'Prasanna Sir', 'N C Sir', 'Manas Sir'];
  const sessionTypes = ['Theory Class', 'Practical - City Roads', 'Highway Practice', 'Parking Practice', 'Test Preparation'];
  const locations = ['Gachibowli', 'Madhapur', 'Kukatpally', 'Kondapur', 'Banjara Hills', 'Jubilee Hills', 'Miyapur', 'Secunderabad'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      addSession({
        studentId: formData.studentId,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        distance: parseInt(formData.distance),
        instructor: formData.instructor,
        sessionType: formData.sessionType,
        location: formData.location,
        notes: formData.notes,
      });

      setSuccessMessage('Session recorded successfully!');
      setFormData({
        studentId: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '',
        endTime: '',
        distance: '',
        instructor: '',
        sessionType: '',
        location: '',
        notes: '',
      });

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding session:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Record New Session</h2>
        <p className="text-gray-600 mt-1">Log a new training session for a student</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
            <CheckCircle className="w-5 h-5 mr-2" />
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Select Student
              </label>
              <select
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Choose a student...</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} - {student.level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Session Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Route className="w-4 h-4 inline mr-1" />
                Distance Covered (km)
              </label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                min="1"
                max="100"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter distance in kilometers"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Instructor
              </label>
              <select
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select instructor...</option>
                {instructors.map(instructor => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Session Type
              </label>
              <select
                name="sessionType"
                value={formData.sessionType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select session type...</option>
                {sessionTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select location...</option>
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Session Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Add any notes about the session..."
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            <Save className="w-5 h-5" />
            <span>{isSubmitting ? 'Recording...' : 'Record Session'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionLogger;