import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
// import { NotificationProvider } from './context/NotificationContext'; // Assuming this exists from context, optional if removed
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/layout/MainLayout';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                Loading...
            </div>
        );
    }
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

const App = () => {
    return (
        <AuthProvider>
            {/* Optional: <NotificationProvider> */}
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        
                        {/* Protected Routes Wrapped in Main Layout */}
                        <Route element={
                            <ProtectedRoute>
                                <MainLayout />
                            </ProtectedRoute>
                        }>
                            <Route path="/dashboard" element={<Dashboard />} />
                            
                            {/* Future routes can be added here easily */}
                            {/* <Route path="/attendance" element={<Attendance />} /> */}
                        </Route>
                        
                        {/* Default Redirect */}
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </Router>
            {/* </NotificationProvider> */}
        </AuthProvider>
    );
};

export default App;