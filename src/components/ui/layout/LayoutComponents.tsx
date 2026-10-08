import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

// 1. Container
export interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, size = 'xl', className = '' }) => {
  const sizeMap = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };
  return <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeMap[size]} ${className}`}>{children}</div>;
};

// 2. PageHeader (Decluttered, crisp typography)
export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string; onClick?: () => void }[];
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badge,
  actions,
  breadcrumbs,
  className = '',
}) => {
  return (
    <div className={`border-b border-zinc-200 dark:border-zinc-800/80 pb-4 pt-1 ${className}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="mb-2">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{title}</h1>
            {badge && <div>{badge}</div>}
          </div>
          {description && (
            <p className="mt-0.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};

// 3. Breadcrumbs
export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, showHomeIcon = true, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-1.5 text-xs text-zinc-500 dark:text-zinc-400 ${className}`}>
      {showHomeIcon && (
        <span className="flex items-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">
          <Home className="w-3.5 h-3.5" />
        </span>
      )}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {(showHomeIcon || index > 0) && (
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 shrink-0" />
            )}
            {isLast ? (
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate max-w-xs" aria-current="page">
                {item.label}
              </span>
            ) : item.onClick ? (
              <button
                type="button"
                onClick={item.onClick}
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors truncate max-w-xs"
              >
                {item.label}
              </button>
            ) : item.href ? (
              <a href={item.href} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors truncate max-w-xs">
                {item.label}
              </a>
            ) : (
              <span className="truncate max-w-xs">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

// 4. Tabs
export interface TabItem {
  id: string;
  label: string;
  count?: number | string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items?: TabItem[];
  tabs?: TabItem[];
  activeId?: string;
  activeTab?: string;
  onChange: (id: string) => void;
  variant?: 'line' | 'enclosed';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  tabs,
  activeId,
  activeTab,
  onChange,
  variant = 'line',
  className = '',
}) => {
  const tabList = tabs || items || [];
  const currentActive = activeTab || activeId || tabList[0]?.id || '';

  if (variant === 'enclosed') {
    return (
      <div className={`flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg border border-zinc-200 dark:border-zinc-800 ${className}`}>
        {tabList.map((tab) => {
          const isActive = tab.id === currentActive;
          return (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                isActive
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {tab.icon && <span className="w-3.5 h-3.5 shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="text-[10px] tabular-nums font-mono opacity-80">{tab.count}</span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto no-scrollbar ${className}`}>
      <div className="flex space-x-6">
        {tabList.map((tab) => {
          const isActive = tab.id === currentActive;
          return (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap -mb-px ${
                isActive
                  ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 font-semibold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {tab.icon && <span className="w-4 h-4 shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="text-xs tabular-nums text-zinc-400 dark:text-zinc-500 font-mono">({tab.count})</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// 5. Divider
export interface DividerProps {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ label, orientation = 'horizontal', className = '' }) => {
  if (orientation === 'vertical') {
    return <div className={`w-px h-full min-h-[1.5rem] bg-zinc-200 dark:bg-zinc-800 ${className}`} />;
  }

  if (!label) {
    return <hr className={`border-0 h-px bg-zinc-200 dark:bg-zinc-800 w-full my-4 ${className}`} />;
  }

  return (
    <div className={`relative flex items-center my-4 ${className}`}>
      <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
      <span className="flex-shrink mx-3 text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
        {label}
      </span>
      <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
    </div>
  );
};

// 6. SplitPane
export interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftWidthPercent?: number;
  className?: string;
}

export const SplitPane: React.FC<SplitPaneProps> = ({ left, right, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${className}`}>
      <div className="lg:col-span-4">{left}</div>
      <div className="lg:col-span-8">{right}</div>
    </div>
  );
};

// 7. CommandBar
export interface CommandBarAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onClick: () => void;
}

export interface CommandBarProps {
  actions: CommandBarAction[];
  className?: string;
}

export const CommandBar: React.FC<CommandBarProps> = ({ actions, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md rounded-lg ${className}`}
    >
      {actions.map((act) => (
        <button
          key={act.id}
          type="button"
          onClick={act.onClick}
          className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
        >
          {act.icon && <span className="w-3.5 h-3.5">{act.icon}</span>}
          <span>{act.label}</span>
          {act.shortcut && (
            <kbd className="text-[10px] font-mono px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-400">
              {act.shortcut}
            </kbd>
          )}
        </button>
      ))}
    </div>
  );
};

// 8. BottomNavigation
export interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
  active?: boolean;
  onClick: () => void;
}

export interface BottomNavigationProps {
  items: BottomNavItem[];
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ items, className = '' }) => {
  return (
    <nav
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 px-2 py-1.5 flex items-center justify-around ${className}`}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={item.onClick}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-md transition-colors ${
            item.active
              ? 'text-zinc-950 dark:text-white font-semibold'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          <div className="relative">
            <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
            {item.badge !== undefined && (
              <span className="absolute -top-1 -right-2 text-[10px] font-mono bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-1 rounded-full leading-tight">
                {item.badge}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 truncate">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

// 9. NavigationMenu
export interface NavMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export interface NavigationMenuProps {
  items: NavMenuItem[];
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center gap-1 ${className}`}>
      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={item.onClick}
          className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
            item.active
              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900'
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

// 10. Footer
export interface FooterProps {
  brandName?: string;
  links?: { label: string; href?: string; onClick?: () => void }[];
  actions?: React.ReactNode;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  brandName = 'Aether Workspace',
  links = [],
  actions,
  className = '',
}) => {
  return (
    <footer className={`border-t border-zinc-200 dark:border-zinc-800 py-6 px-4 sm:px-6 lg:px-8 text-xs text-zinc-500 dark:text-zinc-400 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{brandName}</span>
          <span aria-hidden="true">·</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          {links.map((link, idx) => (
            <button
              key={idx}
              onClick={link.onClick}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {link.label}
            </button>
          ))}
          {actions && <div className="ml-2">{actions}</div>}
        </div>
      </div>
    </footer>
  );
};
