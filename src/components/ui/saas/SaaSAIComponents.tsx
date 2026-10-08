import React, { useState } from 'react';
import {
  Sparkles,
  CornerDownLeft,
  Bot,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  FileCode,
  Wand2,
  FileText,
  Search,
} from 'lucide-react';
import { ChatMessage } from '../../../types';
import { Avatar } from '../data/DataDisplayComponents';

// 1. AIPromptBox
export interface AIPromptBoxProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  suggestedPrompts?: string[];
  className?: string;
}

export const AIPromptBox: React.FC<AIPromptBoxProps> = ({
  onSubmit,
  isLoading = false,
  placeholder = 'Ask Aether Copilot to synthesize, query code, or orchestrate tasks...',
  suggestedPrompts = [
    'Analyze vector cache hit rate across regions',
    'Generate TypeScript interface for tenant RBAC',
    'Summarize sprint 24 blockers and delivery risks',
  ],
  className = '',
}) => {
  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    if (!prompt.trim() || isLoading) return;
    onSubmit(prompt.trim());
    setPrompt('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950 p-2.5 focus-within:border-zinc-400 dark:focus-within:border-zinc-600 transition-colors shadow-xs">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder={placeholder}
          className="w-full bg-transparent text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none resize-none p-1 leading-relaxed"
        />

        <div className="flex items-center justify-between pt-1.5 border-t border-zinc-100 dark:border-zinc-900 mt-1">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
            <Sparkles className="w-3 h-3 text-zinc-900 dark:text-zinc-100" />
            <span>Aether v4 Model · 14.2ms avg</span>
          </div>

          <button
            type="button"
            disabled={!prompt.trim() || isLoading}
            onClick={handleSend}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold rounded-md hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <span>Run</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>
      </div>

      {suggestedPrompts.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {suggestedPrompts.map((sug, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSubmit(sug)}
              className="text-[11px] text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200/50 dark:border-zinc-800/60 transition-colors text-left"
            >
              {sug}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// 2. AIResponseCard
export interface AIResponseCardProps {
  title?: string;
  content: string;
  modelName?: string;
  reasoning?: string;
  citations?: string[];
  codeSnippet?: string;
  onAction?: () => void;
  actionLabel?: string;
  actions?: { label: string; onClick: () => void }[];
  className?: string;
}

export const AIResponseCard: React.FC<AIResponseCardProps> = ({
  title,
  content,
  modelName = 'Aether Neural Copilot',
  reasoning,
  citations = [],
  codeSnippet,
  onAction,
  actionLabel = 'Apply Recommendation',
  actions = [],
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900/70 p-3.5 space-y-2.5 ${className}`}
    >
      <div className="flex items-center justify-between text-xs pb-1.5 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-1.5">
          <Bot className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{title || modelName}</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          title="Copy response"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {reasoning && (
        <div>
          <button
            onClick={() => setShowReasoning(!showReasoning)}
            className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <span>Rationale analysis</span>
            {showReasoning ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {showReasoning && (
            <div className="mt-1 p-2 rounded bg-zinc-50 dark:bg-zinc-950 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
              {reasoning}
            </div>
          )}
        </div>
      )}

      <div className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">
        {content}
      </div>

      {codeSnippet && (
        <div className="p-3 rounded-md bg-zinc-900 dark:bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto border border-zinc-800">
          <pre>{codeSnippet}</pre>
        </div>
      )}

      {citations.length > 0 && (
        <div className="pt-1.5 border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-2 flex-wrap">
          <span className="font-semibold">References:</span>
          {citations.map((cite, idx) => (
            <span key={idx} className="font-mono underline">
              [{idx + 1}] {cite}
            </span>
          ))}
        </div>
      )}

      {(actions.length > 0 || onAction) && (
        <div className="flex items-center gap-2 pt-1.5">
          {onAction && (
            <button
              onClick={onAction}
              className="px-2.5 py-1 text-xs font-medium rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 transition-opacity"
            >
              {actionLabel}
            </button>
          )}
          {actions.map((act, idx) => (
            <button
              key={idx}
              onClick={act.onClick}
              className="px-2.5 py-1 text-xs font-medium rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              {act.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// 3. AIActionPanel
export interface AIActionPanelItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  onExecute: () => void;
}

export interface AIActionPanelProps {
  onAction?: (actionId: string) => void;
  onActionClick?: (actionId: string) => void;
  className?: string;
}

export const AIActionPanel: React.FC<AIActionPanelProps> = ({ onAction, onActionClick, className = '' }) => {
  const trigger = onAction || onActionClick;
  const actions: AIActionPanelItem[] = [
    {
      id: 'summarize',
      title: 'Summarize Thread',
      description: 'Condense unread comments into 3 action points',
      icon: <FileText className="w-4 h-4" />,
      onExecute: () => trigger?.('summarize'),
    },
    {
      id: 'code-review',
      title: 'Audit Pull Request',
      description: 'Run AST invariant checks and security scans',
      icon: <FileCode className="w-4 h-4" />,
      onExecute: () => trigger?.('code-review'),
    },
    {
      id: 'generate-tests',
      title: 'Synthesize Tests',
      description: 'Generate Vitest test specs with edge cases',
      icon: <Wand2 className="w-4 h-4" />,
      onExecute: () => onAction?.('generate-tests'),
    },
    {
      id: 'vector-search',
      title: 'Semantic Query',
      description: 'Search architectural RFCs and compliance guides',
      icon: <Search className="w-4 h-4" />,
      onExecute: () => onAction?.('vector-search'),
    },
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 ${className}`}>
      {actions.map((act) => (
        <div
          key={act.id}
          onClick={act.onExecute}
          className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer group flex items-start gap-2.5"
        >
          <div className="p-1.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shrink-0">
            {act.icon}
          </div>
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{act.title}</h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
              {act.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// 4. AIChat
export interface AIChatProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isResponding?: boolean;
  isStreaming?: boolean;
  suggestions?: string[];
  className?: string;
}

export const AIChat: React.FC<AIChatProps> = ({
  messages,
  onSendMessage,
  isResponding = false,
  isStreaming = false,
  suggestions = [],
  className = '',
}) => {
  const isThinking = isResponding || isStreaming;
  return (
    <div className={`flex flex-col h-full bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden ${className}`}>
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
        {messages.map((msg) => {
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 text-xs ${
                msg.isAi ? 'bg-zinc-50/70 dark:bg-zinc-900/50 -mx-4 px-4 py-3 rounded-none' : ''
              }`}
            >
              {msg.isAi ? (
                <div className="w-6 h-6 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              ) : (
                <Avatar name={msg.senderName} src={msg.senderAvatar} size="xs" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {msg.senderName}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">{msg.timestamp}</span>
                </div>
                <div className="text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </div>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {msg.attachments.map((att, aIdx) => (
                      <div
                        key={aIdx}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[10px] font-mono"
                      >
                        <FileCode className="w-3 h-3 text-zinc-500" />
                        <span>{att.name}</span>
                        <span className="text-zinc-400">({att.size})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {isThinking && (
          <div className="flex items-center gap-2 text-xs text-zinc-400 py-2">
            <Bot className="w-3.5 h-3.5 animate-pulse text-zinc-900 dark:text-zinc-100" />
            <span>Copilot is reasoning and analyzing workspace invariants...</span>
          </div>
        )}
      </div>

      {suggestions && suggestions.length > 0 && (
        <div className="px-4 py-2 bg-zinc-50/40 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {suggestions.map((sug, sIdx) => (
            <button
              key={sIdx}
              onClick={() => onSendMessage(sug)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>
      )}

      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
        <AIPromptBox onSubmit={onSendMessage} isLoading={isThinking} />
      </div>
    </div>
  );
};
