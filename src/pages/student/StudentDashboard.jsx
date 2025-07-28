import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Student Dashboard</h1>
      <div className="flex flex-col gap-4 max-w-xs">
        <Link to="/exam" className="px-4 py-2 bg-white rounded shadow hover:bg-blue-100">Start Exam</Link>
        <Link to="/result" className="px-4 py-2 bg-white rounded shadow hover:bg-blue-100">View Result</Link>
      </div>
    </div>
  );
} 