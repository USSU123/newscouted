import React from 'react';
import { FormInput } from './FormElements';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface PasswordSectionProps {
  formData: PasswordFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordSection({ formData, onChange }: PasswordSectionProps) {
  return (
    <div className="space-y-6">
      <FormInput
        label="Current Password"
        name="currentPassword"
        type="password"
        value={formData.currentPassword}
        onChange={onChange}
      />
      <FormInput
        label="New Password"
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={onChange}
      />
      <FormInput
        label="Confirm New Password"
        name="confirmNewPassword"
        type="password"
        value={formData.confirmNewPassword}
        onChange={onChange}
      />
    </div>
  );
}