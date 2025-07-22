import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const AttendancePage: React.FC = () => {
  const { students, sessions } = useData();
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  // Get all months with sessions
  const months = Array.from(
    new Set(
      sessions.map(s => s.date.slice(0, 7))
    )
  ).sort();

  // Attendance calculation
  const attendance = students.map(student => {
    const count = sessions.filter(session => {
      const sessionMonth = session.date.slice(0, 7);
      return session.studentId === student.id && sessionMonth === selectedMonth;
    }).length;
    return { ...student, count };
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-2xl font-semibold mb-4">Student Attendance</h2>
      <div className="mb-4">
        <label className="mr-2 font-medium">Select Month:</label>
        <select
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          {months.map(month => (
            <option key={month} value={month}>
              {new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map(student => (
              <tr key={student.id}>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage; 