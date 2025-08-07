import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './pages/AuthContext';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Report from './pages/Report';
import Reports from './pages/Reports';
import Profile from './pages/Profile';

// ✅ Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// ✅ Public Route Component (redirect if already logged in)
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

// ✅ App Routes Component (INSIDE AuthProvider)
function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {/* ✅ Show Navbar to everyone */}
      <Navbar />
      
      <Routes>
        {/* ✅ Public routes - redirect to dashboard if logged in */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* ✅ Homepage accessible to everyone */}
        <Route 
          path="/" 
          element={<Homepage />} 
        />

        {/* ✅ Protected routes - require login */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/report" 
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        {/* ✅ Catch all - redirect based on auth status */}
        <Route 
          path="*" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/" replace />
          } 
        />
      </Routes>
    </Router>
  );
}

// ✅ Main App Component (AuthProvider wrapper)
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
