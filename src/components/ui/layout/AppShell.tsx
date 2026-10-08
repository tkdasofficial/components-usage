import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BottomNavigation } from './LayoutComponents';
import { useWorkspace } from '../../../context/WorkspaceContext';
import {
  LayoutDashboard,
  Bot,
  CheckSquare,
  MessageSquare,
  Component,
  X,
} from 'lucide-react';

export interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const {
    activeView,
    setActiveView,
    activeWorkspace,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    setIsCommandPaletteOpen,
  } = useWorkspace();

  const mobileNavItems = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: <LayoutDashboard className="w-4 h-4" />,
      active: activeView === 'dashboard',
      onClick: () => setActiveView('dashboard'),
    },
    {
      id: 'copilot',
      label: 'Copilot',
      icon: <Bot className="w-4 h-4" />,
      active: activeView === 'copilot',
      onClick: () => setActiveView('copilot'),
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: <CheckSquare className="w-4 h-4" />,
      active: activeView === 'tasks' || activeView === 'kanban',
      onClick: () => setActiveView('tasks'),
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: <MessageSquare className="w-4 h-4" />,
      active: activeView === 'chat',
      onClick: () => setActiveView('chat'),
    },
    {
      id: 'showcase',
      label: 'UI Core',
      icon: <Component className="w-4 h-4" />,
      active: activeView === 'showcase',
      onClick: () => setActiveView('showcase'),
    },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block shrink-0 h-full">
        <Sidebar
          activeView={activeView}
          onSelectView={(v) => setActiveView(v)}
          workspaceName={activeWorkspace.name}
          workspacePlan={activeWorkspace.plan}
        />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-72 max-w-[80vw] h-full bg-white dark:bg-zinc-950 shadow-2xl flex flex-col">
            <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="font-bold text-xs tracking-wider text-zinc-900 dark:text-zinc-100">
                NAVIGATION
              </span>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar
                activeView={activeView}
                onSelectView={(v) => {
                  setActiveView(v);
                  setIsMobileSidebarOpen(false);
                }}
                workspaceName={activeWorkspace.name}
                workspacePlan={activeWorkspace.plan}
                className="border-r-0 w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        <main className="flex-1 overflow-y-auto pb-16 lg:pb-0 relative focus:outline-none">
          {children}
        </main>

        <BottomNavigation items={mobileNavItems} />
      </div>
    </div>
  );
};
