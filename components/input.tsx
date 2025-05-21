import { ChangeEvent } from 'react';

interface InputProps {
  type?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  label: string;
  className?: string;
}

export const Input = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  label,
  className = '',
}: InputProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700 font-medium mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      />
    </div>
  );
};