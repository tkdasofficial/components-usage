import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 disabled:opacity-40 disabled:cursor-not-allowed select-none whitespace-nowrap rounded-md';

  const sizeStyles: Record<ButtonSize, string> = {
    xs: 'text-xs px-2.5 py-1 gap-1.5 h-7',
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-xs sm:text-sm px-3.5 py-2 gap-2 h-9',
    lg: 'text-sm px-4.5 py-2.5 gap-2.5 h-10',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-zinc-900 text-white hover:bg-zinc-800 active:bg-black dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 dark:active:bg-zinc-300 shadow-xs',
    secondary:
      'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:active:bg-zinc-600',
    outline:
      'border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700',
    ghost:
      'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 bg-transparent',
    danger:
      'border border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 bg-transparent hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
