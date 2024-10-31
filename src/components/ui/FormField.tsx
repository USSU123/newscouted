import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
  required?: boolean;
  helpText?: string;
}

export default function FormField({
  label,
  error,
  touched,
  children,
  required,
  helpText,
}: FormFieldProps) {
  const showError = touched && error;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {helpText && !showError && (
        <p className="text-sm text-gray-400">{helpText}</p>
      )}
      {showError && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}