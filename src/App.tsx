import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { WorkspaceProvider, useWorkspace, ViewKey } from './context/WorkspaceContext';
import {
  AppShell,
  CommandPalette,
  CommandPaletteAction,
  Modal,
  Button,
  Badge,
} from './components/ui';

// Views
import { DashboardView } from './views/DashboardView';
import { CopilotView } from './views/CopilotView';
import { ProjectsView } from './views/ProjectsView';
import { TasksView } from './views/TasksView';
import { KanbanView } from './views/KanbanView';
import { CalendarViewSection } from './views/CalendarViewSection';
import { TeamView } from './views/TeamView';
import { ChatView } from './views/ChatView';
import { DocumentsView } from './views/DocumentsView';
import { FileManagerView } from './views/FileManagerView';
import { AnalyticsView } from './views/AnalyticsView';
import { AutomationsView } from './views/AutomationsView';
import { IntegrationsView } from './views/IntegrationsView';
import { BillingView } from './views/BillingView';
import { SettingsView } from './views/SettingsView';
import { ComponentLibraryView } from './views/ComponentLibraryView';
import { LandingView } from './views/LandingView';

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
  FolderArchive,
  BarChart3,
  Zap,
  Cable,
  CreditCard,
  Settings,
  Component,
  Globe,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const WorkspaceContent: React.FC = () => {
  const {
    activeView,
    setActiveView,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    isOnboardingOpen,
    setIsOnboardingOpen,
  } = useWorkspace();
  const { addToast } = useToast();

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCommandPaletteOpen]);

  const commandActions: CommandPaletteAction[] = [
    {
      id: 'cmd-dashboard',
      title: 'Go to Dashboard',
      category: 'Navigation',
      shortcut: 'G D',
      icon: <LayoutDashboard className="w-4 h-4" />,
      onSelect: () => setActiveView('dashboard'),
    },
    {
      id: 'cmd-copilot',
      title: 'Open Hyper Copilot AI',
      category: 'AI Assistant',
      shortcut: 'G C',
      icon: <Bot className="w-4 h-4" />,
      onSelect: () => setActiveView('copilot'),
    },
    {
      id: 'cmd-projects',
      title: 'Browse Projects',
      category: 'Navigation',
      shortcut: 'G P',
      icon: <FolderGit2 className="w-4 h-4" />,
      onSelect: () => setActiveView('projects'),
    },
    {
      id: 'cmd-tasks',
      title: 'View Tasks Backlog',
      category: 'Navigation',
      shortcut: 'G T',
      icon: <CheckSquare className="w-4 h-4" />,
      onSelect: () => setActiveView('tasks'),
    },
    {
      id: 'cmd-kanban',
      title: 'Open Kanban Board',
      category: 'Navigation',
      shortcut: 'G K',
      icon: <Kanban className="w-4 h-4" />,
      onSelect: () => setActiveView('kanban'),
    },
    {
      id: 'cmd-calendar',
      title: 'Schedule & Calendar',
      category: 'Navigation',
      icon: <Calendar className="w-4 h-4" />,
      onSelect: () => setActiveView('calendar'),
    },
    {
      id: 'cmd-team',
      title: 'Team & Access Control',
      category: 'Workspace',
      icon: <Users className="w-4 h-4" />,
      onSelect: () => setActiveView('team'),
    },
    {
      id: 'cmd-chat',
      title: 'Messaging & Channels',
      category: 'Collaboration',
      icon: <MessageSquare className="w-4 h-4" />,
      onSelect: () => setActiveView('chat'),
    },
    {
      id: 'cmd-documents',
      title: 'Knowledge Base & Docs',
      category: 'Documentation',
      icon: <FileText className="w-4 h-4" />,
      onSelect: () => setActiveView('documents'),
    },
    {
      id: 'cmd-files',
      title: 'Asset Storage Vault',
      category: 'Storage',
      icon: <FolderArchive className="w-4 h-4" />,
      onSelect: () => setActiveView('files'),
    },
    {
      id: 'cmd-analytics',
      title: 'Telemetry & Reports',
      category: 'Metrics',
      icon: <BarChart3 className="w-4 h-4" />,
      onSelect: () => setActiveView('analytics'),
    },
    {
      id: 'cmd-automations',
      title: 'Automations & Rules',
      category: 'Orchestration',
      icon: <Zap className="w-4 h-4" />,
      onSelect: () => setActiveView('automations'),
    },
    {
      id: 'cmd-integrations',
      title: 'Third-Party Integrations',
      category: 'Settings',
      icon: <Cable className="w-4 h-4" />,
      onSelect: () => setActiveView('integrations'),
    },
    {
      id: 'cmd-billing',
      title: 'Subscription & Invoices',
      category: 'Account',
      icon: <CreditCard className="w-4 h-4" />,
      onSelect: () => setActiveView('billing'),
    },
    {
      id: 'cmd-settings',
      title: 'Workspace Configuration',
      category: 'Account',
      icon: <Settings className="w-4 h-4" />,
      onSelect: () => setActiveView('settings'),
    },
    {
      id: 'cmd-showcase',
      title: '80+ Component Library Catalogue',
      category: 'Design System',
      shortcut: 'G S',
      icon: <Component className="w-4 h-4" />,
      onSelect: () => setActiveView('showcase'),
    },
    {
      id: 'cmd-landing',
      title: 'Product Landing Page',
      category: 'Public',
      icon: <Globe className="w-4 h-4" />,
      onSelect: () => setActiveView('landing'),
    },
    {
      id: 'cmd-export-cache',
      title: 'Purge Temporary Local Cache',
      category: 'Developer Operations',
      icon: <Sparkles className="w-4 h-4" />,
      onSelect: () => addToast('Local state cache refreshed', 'info'),
    },
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'copilot':
        return <CopilotView />;
      case 'projects':
        return <ProjectsView />;
      case 'tasks':
        return <TasksView />;
      case 'kanban':
        return <KanbanView />;
      case 'calendar':
        return <CalendarViewSection />;
      case 'team':
        return <TeamView />;
      case 'chat':
        return <ChatView />;
      case 'documents':
      case 'knowledge-base':
        return <DocumentsView />;
      case 'files':
        return <FileManagerView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'automations':
        return <AutomationsView />;
      case 'integrations':
        return <IntegrationsView />;
      case 'billing':
        return <BillingView />;
      case 'settings':
        return <SettingsView />;
      case 'showcase':
        return <ComponentLibraryView />;
      case 'landing':
        return <LandingView />;
      default:
        return <DashboardView />;
    }
  };

  // If viewing public landing page, render it unconstrained by the app shell
  if (activeView === 'landing') {
    return (
      <>
        <LandingView />
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          actions={commandActions}
        />
      </>
    );
  }

  return (
    <>
      <AppShell>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-20">
          {renderActiveView()}
        </div>
      </AppShell>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        actions={commandActions}
      />

      {/* Welcome & Onboarding Modal */}
      <Modal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        title="Welcome to Aether Workspace"
        description="Your all-in-one AI-powered operational workspace and production component library."
      >
        <div className="space-y-4 py-2">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm text-zinc-900 dark:text-zinc-100">
              <Sparkles className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
              What is included:
            </div>
            <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 list-disc list-inside">
              <li><strong className="text-zinc-900 dark:text-zinc-200">84 Production Components:</strong> Modular, unstyled-accessible React components across 8 categories.</li>
              <li><strong className="text-zinc-900 dark:text-zinc-200">Hyper Copilot Agent:</strong> Multi-turn planning, bottleneck analysis, and generative workflows.</li>
              <li><strong className="text-zinc-900 dark:text-zinc-200">Workspaces & Delivery:</strong> Projects, Kanban boards, telemetry analytics, and RBAC matrix.</li>
              <li><strong className="text-zinc-900 dark:text-zinc-200">Command Palette:</strong> Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 font-mono text-[10px]">Cmd+K</kbd> anywhere to navigate.</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsOnboardingOpen(false);
                setActiveView('showcase');
              }}
            >
              View 80+ Component Library
            </Button>
            <Button
              size="sm"
              onClick={() => setIsOnboardingOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <WorkspaceProvider>
          <WorkspaceContent />
        </WorkspaceProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
