import React, { useState } from 'react';
import {
  PageHeader,
  Card,
  Grid,
  Button,
  Badge,
  Modal,
  Switch,
} from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';
import { Integration } from '../types';
import {
  Cable,
  CheckCircle2,
  ExternalLink,
  Shield,
  Layers,
  Settings,
} from 'lucide-react';

export const IntegrationsView: React.FC = () => {
  const { integrations, toggleIntegration } = useWorkspace();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const categories = ['All', 'Developer Tools', 'Communication', 'Storage', 'Design'];

  const filtered = integrations.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Third-Party Integrations"
        description="Connect third-party developer ecosystems, design tooling, and cloud infrastructure."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Integrations' },
        ]}
      />

      {/* Category filters */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Integration Grid */}
      <Grid cols={3} gap="lg">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  {item.name.charAt(0)}
                </div>
                <Badge
                  variant={item.connected ? 'success' : 'default'}
                  size="sm"
                >
                  {item.connected ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>

              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400">
                {item.lastSynced ? `Synced ${item.lastSynced}` : 'Not configured'}
              </span>
              <Button
                size="xs"
                variant={item.connected ? 'outline' : 'primary'}
                onClick={() => toggleIntegration(item.id)}
              >
                {item.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
};
