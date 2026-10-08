import React, { useState } from 'react';
import {
  PageHeader,
  Card,
  Button,
  Badge,
  Switch,
  Modal,
  Input,
  Select,
} from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';
import { AutomationWorkflow } from '../types';
import { Zap, Play, Plus, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export const AutomationsView: React.FC = () => {
  const { automations, toggleAutomation } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTrigger, setNewTrigger] = useState('Task status changes to "done"');
  const [newAction, setNewAction] = useState('Notify channel #releases & update roadmap');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Automations & Workflows"
        description="Event-driven autonomous triggers, task lifecycle hooks, and webhook dispatchers."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Automations' },
        ]}
        actions={
          <Button
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsModalOpen(true)}
          >
            Create Workflow
          </Button>
        }
      />

      {/* Automations list */}
      <div className="space-y-4">
        {automations.map((wf) => (
          <div
            key={wf.id}
            className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                  {wf.name}
                </h3>
                <Badge variant={wf.enabled ? 'success' : 'default'} size="sm">
                  {wf.enabled ? 'Active' : 'Paused'}
                </Badge>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {wf.description}
              </p>

              {/* Trigger -> Action sequence visual */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  WHEN: {wf.trigger}
                </span>
                <ArrowRight className="w-3 h-3 text-zinc-400" />
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  THEN: {wf.action}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 self-end md:self-center shrink-0">
              <div className="text-right text-xs text-zinc-400 font-mono">
                <div>{wf.runsCount} executions</div>
                <div className="text-[10px]">Last: {wf.lastRun || 'Never'}</div>
              </div>

              <Switch
                checked={wf.enabled}
                onChange={() => toggleAutomation(wf.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* New Workflow Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Automation Rule"
        description="Set up an automated action triggered by workspace lifecycle events."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsModalOpen(false);
          }}
          className="space-y-4"
        >
          <Input
            label="Rule Name"
            placeholder="e.g. Notify on critical bug creation"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <Select
            label="Trigger Event (When...)"
            value={newTrigger}
            onChange={(e) => setNewTrigger(e.target.value)}
            options={[
              { value: 'Task status changes to "done"', label: 'Task status changes to "done"' },
              { value: 'Critical issue reported', label: 'Critical issue reported' },
              { value: 'Sprint completed', label: 'Sprint completed' },
            ]}
          />
          <Select
            label="Action (Then...)"
            value={newAction}
            onChange={(e) => setNewAction(e.target.value)}
            options={[
              { value: 'Notify channel #releases & update roadmap', label: 'Notify channel #releases & update roadmap' },
              { value: 'Send urgent alert to On-Call engineer', label: 'Send urgent alert to On-Call engineer' },
              { value: 'Trigger deployment build pipeline', label: 'Trigger deployment build pipeline' },
            ]}
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Activate Automation</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
