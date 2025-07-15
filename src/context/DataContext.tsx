import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Session {
  id: string;
  studentId: string;
  date: string;
  startTime: string;
  endTime: string;
  distance: number;
  instructor: string;
  sessionType: string;
  notes: string;
  location: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Test Ready';
  totalSessions: number;
  totalDistance: number;
  licenseCategory: string;
  address: string;
}

interface DataContextType {
  students: Student[];
  sessions: Session[];
  fetchStudents: () => void;
  fetchSessions: () => void;
  getStudentSessions: (studentId: string) => Promise<Session[]>;
  addSession: (session: Omit<Session, 'id'>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/students/');
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (e) {
      setStudents([]);
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/sessions/');
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    } catch (e) {
      setSessions([]);
    }
  };

  // New: Fetch sessions for a specific student
  const getStudentSessions = async (studentId: string): Promise<Session[]> => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/sessions/student/${studentId}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Optionally log error
    }
    return [];
  };

  // New: Add a session via API
  const addSession = async (session: Omit<Session, 'id'>): Promise<void> => {
    try {
      const res = await fetch('http://127.0.0.1:5000/sessions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          student_id: session.studentId,
          date: session.date,
          start_time: session.startTime,
          end_time: session.endTime,
          distance: session.distance,
          instructor: session.instructor,
          session_type: session.sessionType,
          notes: session.notes,
          location: session.location,
        }),
      });
      if (res.ok) {
        fetchSessions(); // Refresh sessions after adding
      }
    } catch (e) {
      // Optionally log error
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchSessions();
  }, []);

  return (
    <DataContext.Provider value={{ students, sessions, fetchStudents, fetchSessions, getStudentSessions, addSession }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};