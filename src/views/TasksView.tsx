import React, { useState } from 'react';
import {
  PageHeader,
  DataTable,
  ColumnDef,
  Badge,
  Avatar,
  Button,
  Modal,
  Input,
  Select,
  Textarea,
  SegmentedControl,
} from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';
import { Task } from '../types';
import {
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  Filter,
} from 'lucide-react';

export const TasksView: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, currentUser, projects } = useWorkspace();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<Task['priority']>('medium');
  const [newProjectId, setNewProjectId] = useState(projects[0]?.id || 'p-1');
  const [newDueDate, setNewDueDate] = useState('2026-10-30');

  const filteredTasks = tasks.filter((t) => {
    if (filterStatus === 'all') return true;
    return t.status === filterStatus;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask({
      title: newTitle,
      description: newDesc,
      status: 'todo',
      priority: newPriority,
      assignee: currentUser,
      projectId: newProjectId,
      dueDate: newDueDate,
      tags: ['Engineering'],
    });

    setNewTitle('');
    setNewDesc('');
    setIsModalOpen(false);
  };

  const columns: ColumnDef<Task>[] = [
    {
      key: 'title',
      header: 'Task Title',
      sortable: true,
      render: (t) => (
        <div>
          <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
            {t.title}
          </div>
          {t.description && (
            <div className="text-xs text-zinc-400 truncate max-w-[320px]">
              {t.description}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (t) => {
        const statusMap: Record<Task['status'], { label: string; variant: 'default' | 'primary' | 'warning' | 'success' }> = {
          backlog: { label: 'Backlog', variant: 'default' },
          todo: { label: 'To Do', variant: 'default' },
          in_progress: { label: 'In Progress', variant: 'primary' },
          in_review: { label: 'In Review', variant: 'warning' },
          done: { label: 'Done', variant: 'success' },
        };
        const conf = statusMap[t.status] || { label: t.status, variant: 'default' };
        return (
          <select
            value={t.status}
            onChange={(e) => updateTask(t.id, { status: e.target.value as any })}
            className="text-xs font-medium py-1 px-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 cursor-pointer"
          >
            <option value="backlog">Backlog</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="in_review">In Review</option>
            <option value="done">Done</option>
          </select>
        );
      },
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      render: (t) => {
        const variant =
          t.priority === 'urgent'
            ? 'danger'
            : t.priority === 'high'
            ? 'warning'
            : 'outline';
        return <Badge variant={variant} size="sm">{t.priority}</Badge>;
      },
    },
    {
      key: 'assignee',
      header: 'Assignee',
      render: (t) =>
        t.assignee ? (
          <div className="flex items-center gap-2">
            <Avatar fallback={t.assignee.name} src={t.assignee.avatar} size="xs" />
            <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-[100px]">
              {t.assignee.name}
            </span>
          </div>
        ) : (
          <span className="text-xs text-zinc-400">Unassigned</span>
        ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
      render: (t) => (
        <span className="text-xs font-mono text-zinc-500">
          {t.dueDate || '—'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (t) => (
        <button
          onClick={() => deleteTask(t.id)}
          className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition-colors"
          title="Delete task"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks & Issues"
        description="Comprehensive task backlog, status tracking, sprint assignments, and velocity control."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Tasks' },
        ]}
        actions={
          <Button
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsModalOpen(true)}
          >
            Create Task
          </Button>
        }
      />

      {/* Filter status buttons */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {['all', 'backlog', 'todo', 'in_progress', 'in_review', 'done'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filterStatus === status
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          {filteredTasks.length} tasks
        </span>
      </div>

      {/* Tasks Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <DataTable
          columns={columns}
          data={filteredTasks}
          pageSize={8}
          selectable
        />
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
        description="Add a work item to the sprint backlog or project queue."
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Task Summary"
            placeholder="e.g. Implement OAuth token refresh flow"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <Textarea
            label="Details & Acceptance Criteria"
            placeholder="Provide context, acceptance criteria, or design links..."
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority"
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as any)}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'urgent', label: 'Urgent' },
              ]}
            />
            <Input
              label="Due Date"
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
