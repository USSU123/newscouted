import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormInput({ label, className = '', ...props }: FormInputProps) {
  const inputClass = "appearance-none block w-full px-3 py-2 border border-gray-600 bg-gray-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-100";
  const labelClass = "block text-sm font-medium text-gray-300";

  return (
    <div>
      <label htmlFor={props.name} className={labelClass}>
        {label}
      </label>
      <div className="mt-1">
        <input
          {...props}
          className={`${inputClass} ${className}`}
        />
      </div>
    </div>
  );
}