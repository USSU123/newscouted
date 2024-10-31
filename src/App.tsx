import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Toast from './components/Toast';
import Navbar from './components/Navbar';
import AuthLayout from './components/AuthLayout';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProfileSetup from './components/ProfileSetup';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import AccountSettings from './components/AccountSettings';
import SearchPage from './components/SearchPage';
import Messages from './components/Messages';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function MainApp() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/explore" />} />
        <Route path="/explore" element={<SearchPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/settings" element={<AccountSettings />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </>
  );
}

function AuthenticatedApp() {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  if (showProfileSetup) {
    return <ProfileSetup onComplete={() => setShowProfileSetup(false)} />;
  }

  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <AuthLayout 
              title={isLogin ? "Ready to collab?" : "Create your account"}
              subtitle={isLogin ? "SCOUTED" : undefined}
            >
              {isLogin ? (
                <LoginForm onToggleForm={() => setIsLogin(false)} />
              ) : (
                <RegisterForm 
                  onToggleForm={() => setIsLogin(true)} 
                  onRegisterSuccess={() => setShowProfileSetup(true)}
                />
              )}
            </AuthLayout>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return <MainApp />;
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Toast />
          <AuthenticatedApp />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;