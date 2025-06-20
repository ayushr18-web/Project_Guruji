'use client';

import { ReactNode } from 'react';

type CustomButtonProps = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

export default function CustomButton({
  leftIcon,
  rightIcon,
  text,
  onClick,
  className = '',
  variant = 'secondary',
  disabled = false,
}: CustomButtonProps) {
  const baseStyles = {
    primary: {
      container: 'bg-[#7B3F00] text-white',
      hover: 'hover:bg-[#8b4a00]',
      icon: 'bg-[#A45200]',
    },
    secondary: {
      container: 'bg-[#fff7e1] text-[#7B3F00] border border-[#FFD670]',
      hover: 'hover:bg-[#fff1db]',
      icon: 'bg-[#FFD670] text-[#7B3F00]',
    },
  };

  const currentStyle = baseStyles[variant];

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center px-6 py-3 rounded-full gap-4 shadow-md transition
        ${currentStyle.container}
        ${!disabled ? currentStyle.hover : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}`}
    >
      {leftIcon && (
        <span className={`p-2 rounded-full ${currentStyle.icon}`}>
          {leftIcon}
        </span>
      )}
      <span className="text-lg font-medium whitespace-nowrap">{text}</span>
      {rightIcon && (
        <span
          className={`p-2 rounded-full bg-[#7B3F00] text-white ${
            !disabled ? 'hover:bg-[#8b4a00]' : ''
          }`}
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
}
