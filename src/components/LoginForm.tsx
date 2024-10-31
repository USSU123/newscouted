import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFormValidation } from '../hooks/useFormValidation';
import Button from './ui/Button';
import FormField from './ui/FormField';
import toast from 'react-hot-toast';

interface LoginFormProps {
  onToggleForm: () => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const validationRules = {
  email: [
    {
      validate: (value: string) => !!value,
      message: 'Email is required',
    },
    {
      validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email address',
    },
  ],
  password: [
    {
      validate: (value: string) => !!value,
      message: 'Password is required',
    },
    {
      validate: (value: string) => value.length >= 6,
      message: 'Password must be at least 6 characters',
    },
  ],
};

export default function LoginForm({ onToggleForm }: LoginFormProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
  } = useFormValidation<LoginFormValues>(
    {
      email: '',
      password: '',
    },
    validationRules
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await login(values.email, values.password, rememberMe);
      toast.success('Welcome back!');
      navigate('/explore');
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <FormField
        label="Email address"
        error={errors.email}
        touched={touched.email}
        required
      >
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="appearance-none block w-full px-3 py-2 border border-gray-600 bg-gray-800 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-100"
          placeholder="you@example.com"
        />
      </FormField>

      <FormField
        label="Password"
        error={errors.password}
        touched={touched.password}
        required
      >
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="appearance-none block w-full px-3 py-2 border border-gray-600 bg-gray-800 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-100"
          placeholder="••••••••"
        />
      </FormField>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 bg-gray-800 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
            Forgot your password?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        loadingText="Signing in..."
        className="w-full"
      >
        Sign in
      </Button>

      <div className="text-sm text-center">
        <button
          type="button"
          onClick={onToggleForm}
          className="font-medium text-indigo-400 hover:text-indigo-300"
        >
          Don't have an account? Sign up
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </button>
        <button
          type="button"
          className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M17.05 20.28c-.98.95-2.05.88-3.08.54-1.07-.36-2.05-.35-3.17 0-1.45.44-2.23.35-3.08-.54-4.06-4.16-3.58-10.8.92-11.36 1.24.09 2.12.67 2.89.67.77 0 2.22-.66 3.74-.57.64.02 2.42.26 3.57 1.92-3.27 1.94-2.75 5.87.21 7.34zm-4.13-13.69c-.6.77-1.58 1.37-2.53 1.33-.13-1.03.38-2.12.95-2.81.65-.79 1.7-1.37 2.57-1.41.11 1.06-.31 2.12-.89 2.89z"
            />
          </svg>
        </button>
        <button
          type="button"
          className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}