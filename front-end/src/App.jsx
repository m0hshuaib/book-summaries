import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddBook from './pages/AddBook';
import Summary from './pages/Summary';
import Update from './pages/Update';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-book" 
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/summary" 
            element={
              <ProtectedRoute>
                <Summary />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/update" 
            element={
              <ProtectedRoute>
                <Update />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;