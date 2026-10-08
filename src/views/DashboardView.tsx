import React, { useState } from 'react';
import {
  PageHeader,
  StatCard,
  Grid,
  Card,
  DataTable,
  ColumnDef,
  Badge,
  Avatar,
  AvatarGroup,
  MiniChart,
  Button,
  Tabs,
  ActivityFeed,
  AIActionPanel,
} from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';
import { Project, Task } from '../types';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Plus,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    projects,
    tasks,
    activities,
    setActiveView,
    activeWorkspace,
  } = useWorkspace();

  const [activeTab, setActiveTab] = useState('overview');

  const pendingTasksCount = tasks.filter((t) => t.status !== 'done').length;
  const completedTasksCount = tasks.filter((t) => t.status === 'done').length;
  const inProgressProjects = projects.filter((p) => p.status === 'In Progress').length;

  const projectColumns: ColumnDef<Project>[] = [
    {
      key: 'name',
      header: 'Project Name',
      sortable: true,
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-mono font-bold text-xs text-zinc-900 dark:text-zinc-100">
            {p.key}
          </div>
          <div>
            <div className="font-medium text-zinc-900 dark:text-zinc-100 text-sm hover:underline cursor-pointer" onClick={() => setActiveView('projects')}>
              {p.name}
            </div>
            <div className="text-xs text-zinc-400 dark:text-zinc-500 truncate max-w-[200px]">
              {p.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (p) => {
        const variant =
          p.status === 'In Progress'
            ? 'primary'
            : p.status === 'Completed'
            ? 'success'
            : 'default';
        return <Badge variant={variant} size="sm">{p.status}</Badge>;
      },
    },
    {
      key: 'progress',
      header: 'Progress',
      sortable: true,
      render: (p) => (
        <div className="w-28 space-y-1">
          <div className="flex justify-between text-xs text-zinc-500 font-mono">
            <span>{p.progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-500"
              style={{ width: `${p.progress}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'members',
      header: 'Team',
      render: (p) => (
        <AvatarGroup
          max={3}
          size="xs"
          avatars={p.members.map((m) => ({ fallback: m.name, src: m.avatar }))}
        />
      ),
    },
    {
      key: 'dueDate',
      header: 'Target Date',
      sortable: true,
      render: (p) => (
        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          {p.dueDate}
        </span>
      ),
    },
  ];

  const recentTasksColumns: ColumnDef<Task>[] = [
    {
      key: 'title',
      header: 'Task Title',
      sortable: true,
      render: (t) => (
        <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
          {t.title}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (t) => {
        const formatted = t.status.replace('_', ' ');
        const variant =
          t.status === 'done'
            ? 'success'
            : t.status === 'in_progress'
            ? 'primary'
            : t.status === 'in_review'
            ? 'warning'
            : 'default';
        return <Badge variant={variant} size="sm">{formatted}</Badge>;
      },
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (t) => {
        const color =
          t.priority === 'urgent'
            ? 'text-red-500'
            : t.priority === 'high'
            ? 'text-amber-500'
            : 'text-zinc-400';
        return <span className={`text-xs font-semibold uppercase ${color}`}>{t.priority}</span>;
      },
    },
    {
      key: 'assignee',
      header: 'Assignee',
      render: (t) =>
        t.assignee ? (
          <div className="flex items-center gap-1.5">
            <Avatar fallback={t.assignee.name} size="xs" src={t.assignee.avatar} />
            <span className="text-xs text-zinc-600 dark:text-zinc-400">{t.assignee.name}</span>
          </div>
        ) : (
          <span className="text-xs text-zinc-400">Unassigned</span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back to ${activeWorkspace.name}`}
        description="Monitor system health, team delivery, tasks velocity, and run AI copilot operations."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Executive Dashboard' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={() => setActiveView('copilot')}
            >
              Ask Copilot
            </Button>
            <Button
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => setActiveView('projects')}
            >
              New Project
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <Grid cols={4} gap="md">
        <StatCard
          title="Active Projects"
          value={inProgressProjects.toString()}
          change={+14}
          period="vs last month"
          icon={<FolderGit2 className="w-5 h-5" />}
          sparklineData={[4, 6, 8, 7, 9, 12, inProgressProjects]}
        />
        <StatCard
          title="Tasks Completed"
          value={completedTasksCount.toString()}
          change={+22}
          period="this sprint"
          icon={<CheckCircle2 className="w-5 h-5" />}
          sparklineData={[12, 18, 20, 24, 28, 30, completedTasksCount]}
        />
        <StatCard
          title="Pending Items"
          value={pendingTasksCount.toString()}
          change={-5}
          period="vs last week"
          icon={<Clock className="w-5 h-5" />}
          sparklineData={[30, 28, 26, 25, 22, 20, pendingTasksCount]}
        />
        <StatCard
          title="Velocity Rate"
          value="94.8%"
          change={+3.2}
          period="on-track"
          icon={<TrendingUp className="w-5 h-5" />}
          sparklineData={[80, 84, 86, 88, 91, 92, 95]}
        />
      </Grid>

      {/* Main Content Split: Tables & AI / Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card
            header={
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Active Projects
                  </h3>
                  <p className="text-xs text-zinc-400">Team delivery status across key initiatives</p>
                </div>
                <Button variant="ghost" size="xs" onClick={() => setActiveView('projects')}>
                  View all <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            }
            noPadding
          >
            <DataTable
              columns={projectColumns}
              data={projects.slice(0, 4)}
              pageSize={4}
              searchable={false}
            />
          </Card>

          <Card
            header={
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Priority Queue
                  </h3>
                  <p className="text-xs text-zinc-400">High impact tasks requiring attention</p>
                </div>
                <Button variant="ghost" size="xs" onClick={() => setActiveView('tasks')}>
                  View tasks <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            }
            noPadding
          >
            <DataTable
              columns={recentTasksColumns}
              data={tasks.slice(0, 5)}
              pageSize={5}
              searchable={false}
            />
          </Card>
        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-6">
          {/* AI Copilot Quick Assist Panel */}
          <AIActionPanel
            onActionClick={(action) => {
              setActiveView('copilot');
            }}
          />

          {/* Activity Stream */}
          <Card
            header={
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Live Workspace Feed
                  </h3>
                  <p className="text-xs text-zinc-400">Recent actions across all team spaces</p>
                </div>
                <Badge variant="outline" size="sm">Real-time</Badge>
              </div>
            }
          >
            <ActivityFeed
              items={activities.slice(0, 5).map((act) => ({
                id: act.id,
                user: act.user.name,
                avatar: act.user.avatar,
                action: act.action,
                target: act.target,
                time: act.timestamp,
              }))}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
