import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { SubscriptionTier } from '../types/subscription';
import toast from 'react-hot-toast';

interface UserProfile {
  firstName: string;
  lastName: string;
  displayName: string;
  birthday: string;
  bio?: string;
  location?: string;
  socialLinks?: {
    onlyFans?: string;
    patreon?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  tags?: Array<{ category: string; value: string }>;
}

interface User {
  id: string;
  displayName: string;
  email: string;
  avatar: string;
  subscriptionTier: SubscriptionTier;
  profile?: UserProfile;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (displayName: string, email: string, password: string, profile?: UserProfile) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  checkUsernameAvailability: (username: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      setUser(data.user);

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('auth_user', JSON.stringify(data.user));
      storage.setItem('auth_token', data.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (
    displayName: string,
    email: string,
    password: string,
    profile?: UserProfile
  ) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName,
          email,
          password,
          ...profile,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      setUser(data.user);
      sessionStorage.setItem('auth_user', JSON.stringify(data.user));
      sessionStorage.setItem('auth_token', data.token);

      // Return successfully to trigger profile setup
      return;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const updateProfile = async (profile: Partial<UserProfile>) => {
    if (!user) return;

    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      const response = await fetch('/api/users/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...profile }
      };
      setUser(updatedUser);
      
      const storage = localStorage.getItem('auth_user') ? localStorage : sessionStorage;
      storage.setItem('auth_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/auth/check-username?username=${encodeURIComponent(username)}`);
      const data = await response.json();
      return data.available;
    } catch (error) {
      console.error('Username check error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_token');
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateProfile,
      checkUsernameAvailability
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export type { User, UserProfile };