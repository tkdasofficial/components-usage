import React, { useState } from 'react';
import {
  PageHeader,
  KanbanBoard,
  KanbanColumn,
  KanbanItem,
  Button,
  Modal,
  Input,
  Select,
} from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';
import { Task } from '../types';
import { Plus, Sparkles, Filter } from 'lucide-react';

export const KanbanView: React.FC = () => {
  const { tasks, addTask, moveTaskStatus, currentUser } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('todo');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');

  const columns: KanbanColumn[] = [
    { id: 'backlog', title: 'Backlog' },
    { id: 'todo', title: 'To Do' },
    { id: 'in_progress', title: 'In Progress' },
    { id: 'in_review', title: 'In Review' },
    { id: 'done', title: 'Done' },
  ];

  const kanbanItems: KanbanItem[] = tasks.map((t) => ({
    id: t.id,
    title: t.title,
    columnId: t.status,
    priority: t.priority,
    assignee: t.assignee
      ? { name: t.assignee.name, avatar: t.assignee.avatar }
      : undefined,
    tags: t.tags,
    estimateHours: t.estimateHours,
  }));

  const handleMoveItem = (itemId: string, targetColumnId: string) => {
    moveTaskStatus(itemId, targetColumnId as Task['status']);
  };

  const handleAddItemToColumn = (columnId: string) => {
    setSelectedColumn(columnId);
    setIsModalOpen(true);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle,
      status: selectedColumn as Task['status'],
      priority: newTaskPriority,
      assignee: currentUser,
      projectId: 'p-1',
      tags: ['Feature'],
    });

    setNewTaskTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sprint Board"
        description="Visual workflow pipeline with swimlanes, bottleneck detection, and sprint velocity."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Kanban Board' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => {
                setSelectedColumn('todo');
                setIsModalOpen(true);
              }}
            >
              Add Card
            </Button>
          </div>
        }
      />

      {/* Kanban Board Container */}
      <div className="overflow-x-auto pb-4">
        <KanbanBoard
          columns={columns}
          items={kanbanItems}
          onMoveItem={handleMoveItem}
          onAddItem={handleAddItemToColumn}
        />
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Card to Board"
        description={`Creating a card in column: ${columns.find((c) => c.id === selectedColumn)?.title}`}
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Card Title"
            placeholder="e.g. Optimize vector search latency"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Column"
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              options={columns.map((c) => ({ value: c.id, label: c.title }))}
            />
            <Select
              label="Priority"
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value as any)}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'urgent', label: 'Urgent' },
              ]}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Card</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
