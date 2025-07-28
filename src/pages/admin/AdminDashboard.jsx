import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>
      <div className="flex flex-col gap-4 max-w-xs">
        <Link to="/admin/questions" className="px-4 py-2 bg-white rounded shadow hover:bg-blue-100">Manage Questions</Link>
        <Link to="/admin/results" className="px-4 py-2 bg-white rounded shadow hover:bg-blue-100">View Results</Link>
        <Link to="/admin/analytics" className="px-4 py-2 bg-white rounded shadow hover:bg-blue-100">Performance Analytics</Link>
      </div>
    </div>
  );
} 