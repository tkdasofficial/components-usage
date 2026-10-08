import React from 'react';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Sparkles,
  Command,
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useWorkspace } from '../../../context/WorkspaceContext';

export interface HeaderProps {
  onToggleMobileSidebar: () => void;
  onOpenCommandPalette: () => void;
  onOpenNotifications?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  onOpenCommandPalette,
  onOpenNotifications,
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, notifications, activeView, setActiveView } = useWorkspace();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className={`h-13 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 flex items-center justify-between gap-4 sticky top-0 z-20 select-none ${className}`}
    >
      {/* Zone 1: Mobile Toggle & Brand / Location */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <span className="font-bold text-xs tracking-tight text-zinc-900 dark:text-zinc-100">
            AETHER
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 capitalize">
            {activeView.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Zone 2: Command Palette Trigger */}
      <div className="flex-1 max-w-sm mx-auto hidden md:block">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5" />
            <span>Search or command...</span>
          </div>
          <kbd className="flex items-center gap-0.5 text-[10px] font-mono bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-700 px-1 py-0.5 rounded text-zinc-500">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>

      {/* Zone 3: Actions & Profile */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="md:hidden p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        <button
          onClick={() => setActiveView('copilot')}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Copilot</span>
        </button>

        {/* Notifications Button */}
        <button
          onClick={() => (onOpenNotifications ? onOpenNotifications() : setActiveView('notifications'))}
          className="relative p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Profile Trigger */}
        <button
          onClick={() => setActiveView('settings')}
          className="flex items-center gap-2 pl-1"
          title={`Signed in as ${currentUser.name}`}
        >
          <div className="w-6 h-6 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-[10px] flex items-center justify-center overflow-hidden border border-zinc-300 dark:border-zinc-700">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              currentUser.name.substring(0, 2).toUpperCase()
            )}
          </div>
        </button>
      </div>
    </header>
  );
};
