import React from 'react';
import { FormInput } from './FormElements';

interface ProfileFormData {
  firstName: string;
  lastName: string;
}

interface ProfileSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileSection({ formData, onChange }: ProfileSectionProps) {
  return (
    <div className="space-y-6">
      <FormInput
        label="Legal First Name"
        name="firstName"
        value={formData.firstName}
        onChange={onChange}
      />
      <FormInput
        label="Legal Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={onChange}
      />
    </div>
  );
}