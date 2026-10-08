import React, { useState } from 'react';
import {
  PageHeader,
  AIChat,
  AIPromptBox,
  AIResponseCard,
  CodeBlock,
  StatCard,
  Grid,
  Button,
} from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';
import { Sparkles, Bot, Zap, RefreshCw, Cpu, BrainCircuit, Terminal } from 'lucide-react';

export const CopilotView: React.FC = () => {
  const { chatMessages, sendChatMessage, isAiResponding } = useWorkspace();
  const [activeModel, setActiveModel] = useState('Gemini 2.5 Flash Ultra');
  const [aiAnalysisTab, setAiAnalysisTab] = useState<'chat' | 'playbook' | 'insights'>('chat');

  const sampleCopilotResponses = [
    {
      title: 'Architectural Analysis: Sprint Bottlenecks',
      reasoning:
        'Analyzed 42 tasks in sprint 14 against team commit telemetry. Found 3 critical path tasks blocked by pending database schema review in Aether Engine.',
      content:
        'Recommended action: Reassign task AETH-102 (Database Schema Migration) to Marcus Vance to unblock the 2 dependent front-end auth stories. Estimated time saved: 18 hours.',
      codeSnippet: `// Suggested Automation Hook: Auto-escalate blocked issues > 48h
export const onTaskBlocked = async (task: Task) => {
  if (task.blockedDurationHours > 48 && task.priority === 'urgent') {
    await notifyLead({ lead: task.projectLead, issueId: task.id });
    await assignHotfixTag(task.id);
  }
};`,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hyper Copilot Assistant"
        description="Autonomous intelligence agent for sprint planning, code review, workflow automation, and data synthesis."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Hyper Copilot' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono border border-zinc-200 dark:border-zinc-700">
              Model: {activeModel}
            </span>
            <Button
              size="sm"
              variant="outline"
              leftIcon={<BrainCircuit className="w-3.5 h-3.5" />}
              onClick={() => setActiveModel(activeModel.includes('Flash') ? 'Gemini 2.5 Pro' : 'Gemini 2.5 Flash Ultra')}
            >
              Switch Engine
            </Button>
          </div>
        }
      />

      {/* Copilot Metrics */}
      <Grid cols={3} gap="md">
        <StatCard
          title="Tokens Processed"
          value="1.84M"
          change={+38}
          period="this week"
          icon={<Cpu className="w-5 h-5" />}
          sparklineData={[12, 19, 30, 45, 60, 72, 85]}
        />
        <StatCard
          title="Automated Actions Executed"
          value="142"
          change={+16}
          period="sprint 14"
          icon={<Zap className="w-5 h-5" />}
          sparklineData={[15, 20, 22, 28, 32, 40, 52]}
        />
        <StatCard
          title="Avg Reasoning Latency"
          value="240ms"
          change={-12}
          period="instant cache"
          icon={<Terminal className="w-5 h-5" />}
          sparklineData={[400, 350, 310, 290, 260, 250, 240]}
        />
      </Grid>

      {/* Main Interactive Copilot Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Full Interactive Chat Console */}
        <div className="lg:col-span-2">
          <AIChat
            messages={chatMessages}
            onSendMessage={(msg) => sendChatMessage(msg, true)}
            isStreaming={isAiResponding}
            suggestions={[
              'Summarize sprint velocity for this week',
              'Draft release notes for v2.4.0',
              'Analyze blocker dependencies in Kanban',
              'Generate TypeScript interfaces for Billing model',
            ]}
          />
        </div>

        {/* Right Column: AI Actionable Insight Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-zinc-900 dark:text-white" />
              Proactive Recommendations
            </h3>
            <span className="text-xs text-zinc-400 font-mono">Real-time</span>
          </div>

          {sampleCopilotResponses.map((item, index) => (
            <AIResponseCard
              key={index}
              title={item.title}
              reasoning={item.reasoning}
              content={item.content}
              codeSnippet={item.codeSnippet}
              onAction={() => {
                sendChatMessage(`Execute recommended fix: Reassign task AETH-102 to Marcus Vance`);
              }}
              actionLabel="Apply Recommendation"
            />
          ))}

          {/* Prompt quick templates card */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs space-y-3">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Workspace Agent Commands
            </h4>
            <div className="space-y-2">
              {[
                { cmd: '/audit-deps', desc: 'Scan outdated packages across repositories' },
                { cmd: '/generate-prs', desc: 'Draft pull requests from completed tasks' },
                { cmd: '/sprint-standup', desc: 'Synthesize morning standup notes from team activity' },
              ].map((cmd, i) => (
                <div
                  key={i}
                  onClick={() => sendChatMessage(cmd.cmd)}
                  className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 hover:border-zinc-400 dark:hover:border-zinc-600 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">{cmd.cmd}</span>
                  <span className="text-zinc-400 text-[11px] truncate ml-2">{cmd.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
