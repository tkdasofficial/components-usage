import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  User,
  Workspace,
  Project,
  Task,
  ChatMessage,
  DocumentItem,
  NotificationItem,
  ActivityItem,
  Integration,
  AutomationWorkflow,
} from '../types';
import {
  mockUsers,
  mockWorkspaces,
  mockProjects,
  mockTasks,
  mockChatMessages,
  mockDocuments,
  mockNotifications,
  mockActivities,
  mockIntegrations,
  mockAutomations,
} from '../data/mockData';

export type ViewKey =
  | 'dashboard'
  | 'copilot'
  | 'projects'
  | 'tasks'
  | 'kanban'
  | 'calendar'
  | 'team'
  | 'chat'
  | 'documents'
  | 'knowledge-base'
  | 'files'
  | 'notifications'
  | 'activity'
  | 'analytics'
  | 'automations'
  | 'integrations'
  | 'billing'
  | 'settings'
  | 'showcase'
  | 'landing';

interface WorkspaceContextType {
  activeWorkspace: Workspace;
  setActiveWorkspace: (ws: Workspace) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  activeView: ViewKey;
  setActiveView: (view: ViewKey) => void;
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'key' | 'completedTasksCount' | 'tasksCount'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTaskStatus: (taskId: string, newStatus: Task['status']) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, isAiPrompt?: boolean) => void;
  isAiResponding: boolean;
  documents: DocumentItem[];
  addDocument: (title: string, content: string, category: string) => void;
  updateDocument: (id: string, content: string) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  activities: ActivityItem[];
  automations: AutomationWorkflow[];
  toggleAutomation: (id: string) => void;
  integrations: Integration[];
  toggleIntegration: (id: string) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(mockWorkspaces[0]);
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [activeView, setActiveView] = useState<ViewKey>('dashboard');

  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [documents, setDocuments] = useState<DocumentItem[]>(mockDocuments);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);
  const [automations, setAutomations] = useState<AutomationWorkflow[]>(mockAutomations);
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const addProject = useCallback(
    (newProj: Omit<Project, 'id' | 'key' | 'completedTasksCount' | 'tasksCount'>) => {
      const id = `proj-${Date.now()}`;
      const key = newProj.name.substring(0, 3).toUpperCase();
      const proj: Project = {
        ...newProj,
        id,
        key,
        tasksCount: 0,
        completedTasksCount: 0,
      };
      setProjects((prev) => [proj, ...prev]);
    },
    []
  );

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const addTask = useCallback((taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: `tsk-${Date.now()}`,
    };
    setTasks((prev) => [newTask, ...prev]);
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        user: currentUser,
        action: 'created task',
        target: newTask.title,
        timestamp: 'Just now',
        category: 'task',
      },
      ...prev,
    ]);
  }, [currentUser]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTaskStatus = useCallback((taskId: string, newStatus: Task['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }, []);

  const sendChatMessage = useCallback(
    (text: string, isAiPrompt = false) => {
      const userMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, userMsg]);

      if (isAiPrompt || text.toLowerCase().includes('copilot') || text.toLowerCase().includes('ai')) {
        setIsAiResponding(true);
        setTimeout(() => {
          const aiMsg: ChatMessage = {
            id: `msg-${Date.now() + 1}`,
            senderId: 'ai-copilot',
            senderName: 'Aether Copilot',
            isAi: true,
            text: `Analysis complete. I inspected your query: "${text}".\n\n- Evaluated 42 project dependencies and verified type invariants.\n- Memory footprint remained stable at 14.2ms avg response time.\n- All 80+ component props adhere to monochrome accessibility tokens.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setChatMessages((prev) => [...prev, aiMsg]);
          setIsAiResponding(false);
        }, 1200);
      }
    },
    [currentUser]
  );

  const addDocument = useCallback((title: string, content: string, category: string) => {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title,
      content,
      author: currentUser,
      updatedAt: 'Just now',
      category,
      tags: ['General', category],
    };
    setDocuments((prev) => [newDoc, ...prev]);
  }, [currentUser]);

  const updateDocument = useCallback((id: string, content: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, content, updatedAt: 'Just now' } : d))
    );
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const toggleAutomation = useCallback((id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  }, []);

  const toggleIntegration = useCallback((id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              connected: !i.connected,
              lastSynced: !i.connected ? 'Just now' : undefined,
            }
          : i
      )
    );
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        activeWorkspace,
        setActiveWorkspace,
        currentUser,
        setCurrentUser,
        activeView,
        setActiveView,
        projects,
        addProject,
        updateProject,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        moveTaskStatus,
        chatMessages,
        sendChatMessage,
        isAiResponding,
        documents,
        addDocument,
        updateDocument,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        activities,
        automations,
        toggleAutomation,
        integrations,
        toggleIntegration,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return context;
};
