import React, { useState } from 'react';
import {
  PageHeader,
  Card,
  Grid,
  Button,
  Badge,
  AvatarGroup,
  Progress,
  Modal,
  Input,
  Textarea,
  Select,
  SegmentedControl,
  DataTable,
  ColumnDef,
} from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';
import { Project } from '../types';
import {
  Plus,
  LayoutGrid,
  List as ListIcon,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { projects, addProject, currentUser, setActiveView } = useWorkspace();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for new project
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectPriority, setNewProjectPriority] = useState<Project['priority']>('Medium');
  const [newProjectDate, setNewProjectDate] = useState('2026-12-31');

  const filteredProjects = projects.filter((p) => {
    if (filterStatus === 'all') return true;
    return p.status.toLowerCase().replace(' ', '_') === filterStatus;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    addProject({
      name: newProjectName,
      description: newProjectDesc || 'Enterprise initiative',
      status: 'Planning',
      priority: newProjectPriority,
      progress: 0,
      lead: currentUser,
      members: [currentUser],
      dueDate: newProjectDate,
    });

    setNewProjectName('');
    setNewProjectDesc('');
    setIsModalOpen(false);
  };

  const columns: ColumnDef<Project>[] = [
    {
      key: 'name',
      header: 'Project Name',
      sortable: true,
      render: (p) => (
        <div>
          <div className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
            {p.name}
          </div>
          <div className="text-xs text-zinc-400 truncate max-w-[280px]">
            {p.description}
          </div>
        </div>
      ),
    },
    {
      key: 'key',
      header: 'Key',
      sortable: true,
      render: (p) => (
        <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
          {p.key}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (p) => (
        <Badge
          variant={
            p.status === 'Completed'
              ? 'success'
              : p.status === 'In Progress'
              ? 'primary'
              : 'default'
          }
          size="sm"
        >
          {p.status}
        </Badge>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      render: (p) => (
        <Badge
          variant={
            p.priority === 'Critical'
              ? 'danger'
              : p.priority === 'High'
              ? 'warning'
              : 'outline'
          }
          size="sm"
        >
          {p.priority}
        </Badge>
      ),
    },
    {
      key: 'progress',
      header: 'Progress',
      sortable: true,
      render: (p) => (
        <div className="w-24">
          <div className="text-xs text-right font-mono text-zinc-500 mb-1">
            {p.progress}%
          </div>
          <Progress value={p.progress} size="sm" />
        </div>
      ),
    },
    {
      key: 'lead',
      header: 'Project Lead',
      render: (p) => (
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
            {p.lead.name}
          </span>
        </div>
      ),
    },
    {
      key: 'dueDate',
      header: 'Target Date',
      sortable: true,
      render: (p) => (
        <span className="text-xs font-mono text-zinc-500">{p.dueDate}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects & Initiatives"
        description="Track roadmaps, milestones, delivery health, and cross-team dependencies."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Projects' },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <SegmentedControl
              value={viewMode}
              onChange={(val) => setViewMode(val as 'grid' | 'table')}
              options={[
                { value: 'grid', label: <LayoutGrid className="w-4 h-4" /> },
                { value: 'table', label: <ListIcon className="w-4 h-4" /> },
              ]}
              size="sm"
            />
            <Button
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => setIsModalOpen(true)}
            >
              New Project
            </Button>
          </div>
        }
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          {['all', 'in_progress', 'planning', 'completed', 'on_hold'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filterStatus === tab
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          Showing {filteredProjects.length} of {projects.length}
        </span>
      </div>

      {/* Grid or Table Display */}
      {viewMode === 'grid' ? (
        <Grid cols={3} gap="lg">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold border border-zinc-200 dark:border-zinc-700">
                    {project.key}
                  </span>
                  <Badge
                    variant={
                      project.status === 'Completed'
                        ? 'success'
                        : project.status === 'In Progress'
                        ? 'primary'
                        : 'default'
                    }
                    size="sm"
                  >
                    {project.status}
                  </Badge>
                </div>

                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  {project.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs text-zinc-500 font-mono">
                    <span>Delivery Progress</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {project.progress}%
                    </span>
                  </div>
                  <Progress value={project.progress} size="sm" />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
                <AvatarGroup
                  max={3}
                  size="xs"
                  avatars={project.members.map((m) => ({ fallback: m.name, src: m.avatar }))}
                />
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{project.dueDate}</span>
                </div>
              </div>
            </div>
          ))}
        </Grid>
      ) : (
        <Card noPadding>
          <DataTable columns={columns} data={filteredProjects} pageSize={6} />
        </Card>
      )}

      {/* New Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
        description="Initialize a new tracking container for team deliverables."
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Project Title"
            placeholder="e.g. NextGen Micro-Frontend Core"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            required
          />
          <Textarea
            label="Description"
            placeholder="Brief strategic scope of this project..."
            value={newProjectDesc}
            onChange={(e) => setNewProjectDesc(e.target.value)}
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority"
              value={newProjectPriority}
              onChange={(e) => setNewProjectPriority(e.target.value as any)}
              options={[
                { value: 'Low', label: 'Low' },
                { value: 'Medium', label: 'Medium' },
                { value: 'High', label: 'High' },
                { value: 'Critical', label: 'Critical' },
              ]}
            />
            <Input
              label="Target Due Date"
              type="date"
              value={newProjectDate}
              onChange={(e) => setNewProjectDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
