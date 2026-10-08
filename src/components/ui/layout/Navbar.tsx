import React from 'react';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export interface NavbarProps {
  onOpenApp?: () => void;
  onOpenComponents?: () => void;
  brandName?: string;
  links?: { label: string; href?: string; onClick?: () => void }[];
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenApp,
  onOpenComponents,
  brandName = 'AETHER',
  links = [],
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between ${className}`}
    >
      {/* Zone 1: Brand */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onOpenApp}>
          <div className="w-7 h-7 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center font-bold text-xs tracking-wider shadow-xs">
            AE
          </div>
          <span className="font-bold tracking-tight text-sm text-zinc-950 dark:text-zinc-50">
            {brandName}
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {links.map((link, idx) => (
          <button
            key={idx}
            onClick={link.onClick}
            className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {onOpenComponents && (
          <button
            onClick={onOpenComponents}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <span>80+ Components</span>
          </button>
        )}

        {onOpenApp && (
          <button
            onClick={onOpenApp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-100 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
          >
            <span>Launch App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </header>
  );
};
