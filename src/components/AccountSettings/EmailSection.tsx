import React from 'react';
import { FormInput } from './FormElements';

interface EmailFormData {
  email: string;
  newEmail: string;
}

interface EmailSectionProps {
  formData: EmailFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isVerificationSent: boolean;
  onSendVerification: () => void;
}

export default function EmailSection({ 
  formData, 
  onChange, 
  isVerificationSent, 
  onSendVerification 
}: EmailSectionProps) {
  return (
    <div className="space-y-6">
      <FormInput
        label="Current Email Address"
        name="email"
        value={formData.email}
        disabled
        className="bg-gray-700"
      />
      <FormInput
        label="New Email Address"
        name="newEmail"
        value={formData.newEmail}
        onChange={onChange}
        placeholder="Enter new email address"
      />
      {!isVerificationSent ? (
        <button
          type="button"
          onClick={onSendVerification}
          className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        >
          Send Verification Email
        </button>
      ) : (
        <div className="rounded-md bg-indigo-900 bg-opacity-50 p-4">
          <p className="text-sm text-indigo-200">
            Verification email sent! Please check your inbox and follow the instructions.
          </p>
        </div>
      )}
    </div>
  );
}