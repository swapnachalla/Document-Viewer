import React from 'react';

interface URLInputProps {
  url: string;
  onUrlChange: (url: string) => void;
  placeholder?: string;
  className?: string;
}

export const URLInput: React.FC<URLInputProps> = ({
  url,
  onUrlChange,
  placeholder = "Enter document URL",
  className = ""
}) => {
  return (
    <div className={`bg-white border-b border-gray-200 p-3 ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};