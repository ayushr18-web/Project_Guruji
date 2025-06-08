'use client';

import { Loader } from 'lucide-react';
import { ReactNode } from 'react';

type ButtonProps = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  leftIcon,
  rightIcon,
  text,
  onClick,
  type = 'button',
  className = '',
  variant = 'secondary',
  isLoading = false,
}: ButtonProps) {
  const styles = {
    primary: {
      container: 'bg-[#7B3F00] text-white hover:bg-[#8b4a00]',
      icon: 'bg-[#A45200]',
    },
    secondary: {
      container: 'bg-[#fff7e1] text-[#7B3F00] border border-[#FFD670] hover:bg-[#fff1db]',
      icon: 'bg-[#FFD670] text-[#7B3F00]',
    },
  };

  const currentStyle = styles[variant];

  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex items-center px-6 py-3 rounded-full gap-4 shadow-md transition ${currentStyle.container} ${className}`}
    >
      {leftIcon && (
        <span className={`p-2 rounded-full ${currentStyle.icon}`}>
          {leftIcon}
        </span>
      )}
      <span className="text-lg font-medium whitespace-nowrap ">{isLoading ? <Loader /> : text}</span>
      {rightIcon && (
        <span className={`p-2 rounded-full bg-[#7B3F00] text-white hover:bg-[#8b4a00] `}>
          {rightIcon}
        </span>
      )}
    </button>
  );
}
