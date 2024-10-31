import React, { useState, useEffect } from 'react';
import { FormInput } from './FormElements';
import { useAuth } from '../../contexts/AuthContext';
import { debounce } from 'lodash';

interface UsernameFormData {
  username: string;
}

interface UsernameSectionProps {
  formData: UsernameFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lastUsernameChange?: Date;
}

export default function UsernameSection({ 
  formData, 
  onChange,
  lastUsernameChange 
}: UsernameSectionProps) {
  const { checkUsernameAvailability } = useAuth();
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [canChangeUsername, setCanChangeUsername] = useState(true);
  const [daysUntilChange, setDaysUntilChange] = useState(0);

  useEffect(() => {
    if (lastUsernameChange) {
      const thirtyDaysFromLastChange = new Date(lastUsernameChange.getTime() + (30 * 24 * 60 * 60 * 1000));
      const now = new Date();
      const diffTime = thirtyDaysFromLastChange.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setCanChangeUsername(diffTime <= 0);
      setDaysUntilChange(Math.max(0, diffDays));
    }
  }, [lastUsernameChange]);

  const checkUsername = debounce(async (username: string) => {
    if (username.length < 3) return;
    
    setIsCheckingUsername(true);
    try {
      const isAvailable = await checkUsernameAvailability(username);
      setIsUsernameAvailable(isAvailable);
    } catch (error) {
      console.error('Failed to check username:', error);
    } finally {
      setIsCheckingUsername(false);
    }
  }, 500);

  useEffect(() => {
    if (formData.username && canChangeUsername) {
      checkUsername(formData.username);
    }
  }, [formData.username, canChangeUsername]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <FormInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={onChange}
          disabled={!canChangeUsername}
          className={`${
            isUsernameAvailable === true ? 'border-green-500' : 
            isUsernameAvailable === false ? 'border-red-500' : ''
          } ${!canChangeUsername ? 'bg-gray-700 cursor-not-allowed' : ''}`}
        />
        
        {!canChangeUsername ? (
          <p className="mt-2 text-sm text-yellow-500">
            Username can be changed again in {daysUntilChange} days
          </p>
        ) : (
          <>
            {isCheckingUsername && (
              <p className="mt-2 text-sm text-gray-400">Checking availability...</p>
            )}
            {isUsernameAvailable === true && (
              <p className="mt-2 text-sm text-green-500">Username is available!</p>
            )}
            {isUsernameAvailable === false && (
              <p className="mt-2 text-sm text-red-500">Username is not available</p>
            )}
          </>
        )}
      </div>

      <div className="rounded-md bg-gray-700 p-4">
        <p className="text-sm text-gray-300">
          <span className="font-medium">Note:</span> You can only change your username once every 30 days.
          Choose wisely!
        </p>
      </div>
    </div>
  );
}