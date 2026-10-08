import React, { useState } from 'react';
import { Loader2, Check, Copy, ChevronDown } from 'lucide-react';
import { ButtonVariant, ButtonSize } from './Button';

// 1. IconButton
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  'aria-label': string;
  variant?: ButtonVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  'aria-label': ariaLabel,
  variant = 'ghost',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeStyles = {
    xs: 'w-7 h-7 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
    outline: 'border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800',
    ghost: 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 bg-transparent',
    danger: 'text-zinc-900 dark:text-zinc-100 border border-zinc-400 dark:border-zinc-600 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black',
  };

  return (
    <button
      aria-label={ariaLabel}
      title={ariaLabel}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:opacity-40 disabled:cursor-not-allowed ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : icon}
    </button>
  );
};

// 2. ButtonGroup
export interface ButtonGroupProps {
  children: React.ReactNode;
  attached?: boolean;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, attached = true, className = '' }) => {
  if (!attached) {
    return <div className={`inline-flex items-center gap-1.5 ${className}`}>{children}</div>;
  }

  return (
    <div
      className={`inline-flex items-center rounded-md shadow-xs [&>*:not(:first-child)]:-ml-px [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none ${className}`}
      role="group"
    >
      {children}
    </div>
  );
};

// 3. DropdownButton
export interface DropdownButtonItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
}

export interface DropdownButtonProps {
  label: React.ReactNode;
  items: DropdownButtonItem[];
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  items,
  variant = 'secondary',
  size = 'md',
  className = '',
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center justify-center gap-1.5 font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
          size === 'sm' ? 'px-2.5 py-1.5 text-xs h-8' : 'px-3.5 py-2 text-xs sm:text-sm h-9'
        } ${
          variant === 'primary'
            ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700'
        }`}
      >
        <span>{label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 w-48 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl z-50 py-1 animate-in fade-in zoom-in-95">
            {items.map((item, idx) => (
              <React.Fragment key={idx}>
                {item.divider && <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />}
                <button
                  type="button"
                  disabled={item.disabled}
                  onClick={() => {
                    item.onClick();
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {item.icon && <span className="w-3.5 h-3.5 shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// 4. SplitButton
export interface SplitButtonProps {
  label: React.ReactNode;
  onPrimaryClick: () => void;
  items: DropdownButtonItem[];
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export const SplitButton: React.FC<SplitButtonProps> = ({
  label,
  onPrimaryClick,
  items,
  variant = 'secondary',
  size = 'md',
  className = '',
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative inline-flex rounded-md shadow-xs ${className}`} role="group">
      <button
        type="button"
        onClick={onPrimaryClick}
        className={`inline-flex items-center px-3 font-medium rounded-l-md border-r border-zinc-300/40 dark:border-zinc-700/60 focus:outline-none ${
          size === 'sm' ? 'py-1.5 text-xs h-8' : 'py-2 text-xs sm:text-sm h-9'
        } ${
          variant === 'primary'
            ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700'
        }`}
      >
        {label}
      </button>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center px-2 rounded-r-md focus:outline-none ${
          size === 'sm' ? 'py-1.5 text-xs h-8' : 'py-2 text-xs sm:text-sm h-9'
        } ${
          variant === 'primary'
            ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700'
        }`}
      >
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-44 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl z-50 py-1">
            {items.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2"
              >
                {item.icon && <span className="w-3.5 h-3.5">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// 5. FloatingActionButton
export interface FloatingActionButtonProps {
  icon: React.ReactNode;
  label?: string;
  onClick: () => void;
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  label,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 rounded-full shadow-xl hover:scale-102 active:scale-98 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 font-medium text-xs border border-zinc-800 dark:border-zinc-200 ${className}`}
    >
      <span className="shrink-0">{icon}</span>
      {label && <span>{label}</span>}
    </button>
  );
};

// 6. CopyButton
export interface CopyButtonProps {
  value?: string;
  textToCopy?: string;
  label?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ value, textToCopy, label, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const text = value || textToCopy || '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors ${className}`}
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? 'Copied' : label || 'Copy'}</span>
    </button>
  );
};

// 7. SegmentedControl
export interface SegmentedControlOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps<T extends string = string> {
  value: T;
  onChange: (value: T) => void;
  options: SegmentedControlOption<T>[];
  size?: 'sm' | 'md';
  className?: string;
}

export const SegmentedControl = <T extends string>({
  value,
  onChange,
  options,
  size = 'md',
  className = '',
}: SegmentedControlProps<T>) => {
  return (
    <div
      className={`inline-flex p-0.5 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg border border-zinc-200/80 dark:border-zinc-700/80 ${className}`}
      role="tablist"
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-1.5 rounded-md font-medium transition-all whitespace-nowrap ${
              size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs'
            } ${
              isActive
                ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};
