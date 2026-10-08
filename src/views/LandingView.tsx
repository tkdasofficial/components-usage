import React from 'react';
import {
  Navbar,
  Button,
  Grid,
  Card,
  Badge,
  PricingCard,
} from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';
import {
  Sparkles,
  ArrowRight,
  Bot,
  Zap,
  Shield,
  Layers,
  Terminal,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { setActiveView } = useWorkspace();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      {/* Landing Navbar */}
      <Navbar
        onOpenApp={() => setActiveView('dashboard')}
        onOpenComponents={() => setActiveView('showcase')}
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Autonomous AI Workspace</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-tight">
          Where engineering velocity meets{' '}
          <span className="underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-8">
            intelligent automation
          </span>
          .
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Aether brings project orchestration, real-time messaging, deep documentation, and Gemini 2.5 powered Hyper Copilot into a unified, pixel-perfect operational surface.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => setActiveView('dashboard')}
          >
            Launch Workspace
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setActiveView('showcase')}
          >
            Explore 80+ Components
          </Button>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="pt-8">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-3 sm:p-6 shadow-2xl overflow-hidden text-left">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="text-xs font-mono text-zinc-400 ml-2">aether-workspace // v2.4.0</span>
              </div>
              <Badge variant="primary" size="sm">Live Session</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Bot className="w-4 h-4" />
                  Hyper Copilot
                </div>
                <p className="text-xs text-zinc-500">Autonomous reasoning across 42 sprint tasks, predicting blockers with 98% accuracy.</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Zap className="w-4 h-4" />
                  Realtime Sync
                </div>
                <p className="text-xs text-zinc-500">Instant cross-device operational state, offline resilience, and zero latency overhead.</p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Shield className="w-4 h-4" />
                  Enterprise RBAC
                </div>
                <p className="text-xs text-zinc-500">SOC2 compliant access policies, cryptographically signed audit logs, and Okta SSO.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-zinc-100 dark:border-zinc-900">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Engineered for High-Output Product Teams
          </h2>
          <p className="text-sm text-zinc-500 max-w-xl mx-auto">
            Everything your team needs to plan, build, coordinate, and ship without switching between ten fragmented tabs.
          </p>
        </div>

        <Grid cols={3} gap="lg">
          {[
            { title: 'Unified Data Tables', desc: 'Sortable, filterable, selectable high-throughput tables with keyboard navigation.', icon: <Layers className="w-5 h-5" /> },
            { title: 'Interactive Kanban', desc: 'Drag-and-drop task boards with priority tagging, custom swimlanes, and velocity charts.', icon: <Zap className="w-5 h-5" /> },
            { title: 'Copilot AI Agents', desc: 'Multi-turn intelligent assistants that draft RFCs, review pull requests, and orchestrate sprints.', icon: <Bot className="w-5 h-5" /> },
            { title: 'Granular Permissions', desc: 'Role-based access matrix with Owner, Admin, Member, and Viewer policies.', icon: <Shield className="w-5 h-5" /> },
            { title: 'Encrypted Asset Vault', desc: 'Multi-format file management supporting code artifacts, documentation, and design assets.', icon: <Terminal className="w-5 h-5" /> },
            { title: '80+ Reusable Components', desc: 'Extensible, type-safe, accessible component library crafted for production SaaS products.', icon: <Cpu className="w-5 h-5" /> },
          ].map((feat, i) => (
            <div key={i} className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-2">
              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 w-fit text-zinc-900 dark:text-zinc-100 mb-3">
                {feat.icon}
              </div>
              <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{feat.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </Grid>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-400">
        <p>© 2026 Aether Workspace Inc. Designed with precision, minimal noise, and maximum clarity.</p>
      </footer>
    </div>
  );
};
