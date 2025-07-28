import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/misc/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import Questions from './pages/admin/Questions';
import Results from './pages/admin/Results';
import Analytics from './pages/admin/Analytics';
import StudentDashboard from './pages/student/StudentDashboard';
import Exam from './pages/student/Exam';
import Result from './pages/student/Result';
import NotFound from './pages/misc/NotFound';
import Error from './pages/misc/Error';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/questions" element={<Questions />} />
        <Route path="/admin/results" element={<Results />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/result" element={<Result />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
