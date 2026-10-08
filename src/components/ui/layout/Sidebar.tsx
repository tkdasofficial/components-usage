import React from 'react';
import {
  LayoutDashboard,
  Bot,
  FolderGit2,
  CheckSquare,
  Kanban,
  Calendar,
  Users,
  MessageSquare,
  FileText,
  BookOpen,
  FolderArchive,
  Bell,
  Activity,
  BarChart3,
  Zap,
  Cable,
  CreditCard,
  Settings,
  Component,
  Globe,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { ViewKey } from '../../../context/WorkspaceContext';

export interface SidebarNavGroup {
  title: string;
  items: {
    key: ViewKey;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
  }[];
}

export interface SidebarProps {
  activeView: ViewKey;
  onSelectView: (view: ViewKey) => void;
  workspaceName: string;
  workspacePlan: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onOpenWorkspaceSwitcher?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  workspaceName,
  workspacePlan,
  isCollapsed = false,
  onOpenWorkspaceSwitcher,
  className = '',
}) => {
  const navGroups: SidebarNavGroup[] = [
    {
      title: 'Workspace',
      items: [
        { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { key: 'copilot', label: 'AI Copilot', icon: <Bot className="w-4 h-4" />, badge: 'AI' },
        { key: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" />, badge: '4' },
        { key: 'tasks', label: 'Tasks', icon: <CheckSquare className="w-4 h-4" />, badge: '6' },
        { key: 'kanban', label: 'Kanban Board', icon: <Kanban className="w-4 h-4" /> },
        { key: 'calendar', label: 'Calendar', icon: <Calendar className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Collaboration',
      items: [
        { key: 'team', label: 'Team', icon: <Users className="w-4 h-4" /> },
        { key: 'chat', label: 'Chat', icon: <MessageSquare className="w-4 h-4" /> },
        { key: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
        { key: 'knowledge-base', label: 'Knowledge Base', icon: <BookOpen className="w-4 h-4" /> },
        { key: 'files', label: 'Files', icon: <FolderArchive className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Operations',
      items: [
        { key: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: '2' },
        { key: 'activity', label: 'Audit Log', icon: <Activity className="w-4 h-4" /> },
        { key: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
        { key: 'automations', label: 'Automations', icon: <Zap className="w-4 h-4" /> },
        { key: 'integrations', label: 'Integrations', icon: <Cable className="w-4 h-4" /> },
        { key: 'billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
        { key: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Design System',
      items: [
        {
          key: 'showcase',
          label: 'Component Library',
          icon: <Component className="w-4 h-4" />,
          badge: '80+',
        },
        { key: 'landing', label: 'Landing Page', icon: <Globe className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <aside
      className={`h-full flex flex-col bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transition-all select-none ${
        isCollapsed ? 'w-16' : 'w-60'
      } ${className}`}
    >
      {/* Workspace Switcher Header */}
      <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <button
          onClick={onOpenWorkspaceSwitcher}
          className="flex items-center gap-2.5 w-full p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-left group"
        >
          <div className="w-7 h-7 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center font-bold text-xs tracking-wider shrink-0 shadow-xs">
            AE
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {workspaceName}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-zinc-400">
                <span>{workspacePlan}</span>
                <span>·</span>
                <span>Workspace</span>
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 no-scrollbar">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx}>
            {!isCollapsed && (
              <h3 className="px-2.5 mb-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                {group.title}
              </h3>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = activeView === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => onSelectView(item.key)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors group relative ${
                      isActive
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <span
                      className={`shrink-0 ${
                        isActive
                          ? 'text-white dark:text-zinc-950'
                          : 'text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}
                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-medium ${
                          isActive
                            ? 'bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Copilot Key Hint */}
      {!isCollapsed && (
        <div className="p-2.5 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
            <span>Copilot</span>
          </div>
          <kbd className="font-mono text-[10px] bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-1 py-0.5 rounded">
            ⌘K
          </kbd>
        </div>
      )}
    </aside>
  );
};
