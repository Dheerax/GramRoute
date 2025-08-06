import Dashboard from './pages/Dashboard';
import Navbar from './pages/Navbar';
import Report from './pages/Report'
import Login from './pages/Login'
import Reports from './pages/Reports'
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/homepage" element={<Homepage />} /> 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/report" element={<Report />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
