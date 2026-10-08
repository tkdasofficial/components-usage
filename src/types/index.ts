export type ThemeMode = 'light' | 'dark';

export type UserRole = 'Owner' | 'Admin' | 'Member' | 'Viewer' | 'Guest';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  department: string;
  status: 'active' | 'offline' | 'busy' | 'away';
  joinedDate: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  logo?: string;
  memberCount: number;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'On Hold' | 'Planning';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  progress: number;
  lead: User;
  members: User[];
  dueDate: string;
  tasksCount: number;
  completedTasksCount: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: User;
  dueDate?: string;
  tags: string[];
  projectId: string;
  estimateHours?: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  category: 'sprint' | 'release' | 'meeting' | 'milestone';
  attendees?: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  isAi?: boolean;
  attachments?: { name: string; size: string; type: string }[];
  reactions?: { emoji: string; count: number; reactedByMe?: boolean }[];
}

export interface DocumentItem {
  id: string;
  title: string;
  content: string;
  author: User;
  updatedAt: string;
  category: string;
  starred?: boolean;
  tags: string[];
}

export interface FileItem {
  id: string;
  name: string;
  size: string;
  type: 'folder' | 'pdf' | 'code' | 'image' | 'archive' | 'doc';
  updatedAt: string;
  owner: string;
  itemsCount?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'mention' | 'task' | 'system' | 'billing' | 'security';
  actionUrl?: string;
}

export interface ActivityItem {
  id: string;
  user: User;
  action: string;
  target: string;
  timestamp: string;
  category: 'project' | 'task' | 'doc' | 'deploy' | 'member';
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  condition?: string;
  action: string;
  enabled: boolean;
  runsCount: number;
  lastRun?: string;
}

export interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  connected: boolean;
  icon: string;
  authType: string;
  lastSynced?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Draft' | 'Overdue';
  items: { description: string; quantity: number; unitPrice: number }[];
  pdfUrl?: string;
}

export interface MetricCardData {
  title: string;
  value: string;
  change: number;
  period: string;
  sparkline: number[];
}
