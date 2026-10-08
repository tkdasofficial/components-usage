import React, { useState } from 'react';
import {
  PageHeader,
  StatCard,
  Grid,
  Card,
  Button,
  Badge,
  MiniChart,
  SegmentedControl,
} from '../components/ui';
import {
  Download,
  Activity,
  Users,
  Server,
  Zap,
  TrendingUp,
  Cpu,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const usageByFeature = [
    { name: 'Copilot AI Prompt Agent', usage: '48.2%', requests: '1.24M' },
    { name: 'Code Vector Indexing', usage: '26.4%', requests: '680K' },
    { name: 'Automated CI/CD Webhooks', usage: '14.8%', requests: '380K' },
    { name: 'Realtime Document Sync', usage: '10.6%', requests: '272K' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Telemetry & Analytics"
        description="Workspace compute metrics, model inference tokens, team velocity, and API usage."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Analytics' },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <SegmentedControl
              value={timeRange}
              onChange={(v) => setTimeRange(v)}
              options={[
                { value: '7d', label: '7 Days' },
                { value: '30d', label: '30 Days' },
                { value: '90d', label: 'Quarter' },
              ]}
              size="sm"
            />
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              onClick={() => alert('Exporting Analytics CSV...')}
            >
              Export Metrics
            </Button>
          </div>
        }
      />

      {/* KPI Stats */}
      <Grid cols={4} gap="md">
        <StatCard
          title="Total API Calls"
          value="2.57M"
          change={+18.4}
          period="vs prior 30d"
          icon={<Server className="w-5 h-5" />}
          sparklineData={[12, 14, 18, 22, 25, 29, 34]}
        />
        <StatCard
          title="Active Monthly Users"
          value="1,280"
          change={+9.2}
          period="vs prior 30d"
          icon={<Users className="w-5 h-5" />}
          sparklineData={[900, 950, 1020, 1100, 1180, 1220, 1280]}
        />
        <StatCard
          title="Avg Inference Time"
          value="182ms"
          change={-14.8}
          period="faster"
          icon={<Zap className="w-5 h-5" />}
          sparklineData={[240, 230, 210, 195, 190, 185, 182]}
        />
        <StatCard
          title="Availability SLA"
          value="99.98%"
          change={+0.01}
          period="healthy"
          icon={<Activity className="w-5 h-5" />}
          sparklineData={[99.9, 99.92, 99.95, 99.96, 99.98, 99.98, 99.98]}
        />
      </Grid>

      {/* Analytics Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Consumption Trends */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Compute & Inference Trends
                </h3>
                <p className="text-xs text-zinc-400">Tokens consumed per sprint day</p>
              </div>
              <Badge variant="outline" size="sm">Gemini 2.5</Badge>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="h-44 flex items-end gap-2 pt-4">
              {[42, 58, 65, 48, 72, 85, 92, 78, 88, 95, 110, 104, 122, 138].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div
                    className="w-full bg-zinc-900 dark:bg-zinc-100 rounded-xs transition-all group-hover:bg-zinc-600 dark:group-hover:bg-zinc-300"
                    style={{ height: `${(val / 140) * 100}%` }}
                  />
                  <span className="text-[9px] font-mono text-zinc-400 truncate">
                    {idx + 1}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-zinc-400 font-mono pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <span>Day 1</span>
              <span>Daily Token Volume (Thousands)</span>
              <span>Day 14</span>
            </div>
          </div>
        </Card>

        {/* Feature Usage Breakdown */}
        <Card
          header={
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Subsystem Utilization
              </h3>
              <p className="text-xs text-zinc-400">Distribution of background workloads</p>
            </div>
          }
        >
          <div className="space-y-4">
            {usageByFeature.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-900 dark:text-zinc-100">{item.name}</span>
                  <span className="text-zinc-500 font-mono">{item.requests} ({item.usage})</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-zinc-900 dark:bg-zinc-200 rounded-full"
                    style={{ width: item.usage }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
