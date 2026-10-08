import React, { useState } from 'react';
import {
  PageHeader,
  Card,
  Avatar,
  Badge,
  Button,
  Input,
} from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';
import {
  Send,
  Hash,
  Sparkles,
  Paperclip,
  Smile,
  Bot,
  User as UserIcon,
} from 'lucide-react';

export const ChatView: React.FC = () => {
  const { chatMessages, sendChatMessage, currentUser } = useWorkspace();
  const [activeChannel, setActiveChannel] = useState('#general');
  const [inputText, setInputText] = useState('');

  const channels = ['#general', '#engineering', '#design-systems', '#releases'];
  const directMessages = ['Elena Rostova', 'Marcus Vance', 'Sarah Jenkins'];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendChatMessage(inputText, inputText.toLowerCase().startsWith('@copilot') || inputText.toLowerCase().startsWith('/ai'));
    setInputText('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Messaging & Copilot Chat"
        description="Real-time communication channels with threaded discussions and native Copilot invocation."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Chat & Messaging' },
        ]}
      />

      {/* Chat shell */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[650px] bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        {/* Left Sidebar Channels */}
        <div className="p-3 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-2">
                Channels
              </p>
              <div className="space-y-1">
                {channels.map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setActiveChannel(ch)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      activeChannel === ch
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <Hash className="w-3.5 h-3.5" />
                    {ch.replace('#', '')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-2">
                Direct Messages
              </p>
              <div className="space-y-1">
                {directMessages.map((dm) => (
                  <button
                    key={dm}
                    onClick={() => setActiveChannel(`@${dm}`)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      activeChannel === `@${dm}`
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="truncate">{dm}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
              Pro Tip
            </div>
            <p className="text-[11px] text-zinc-500 leading-normal">
              Type <span className="font-mono bg-zinc-200 dark:bg-zinc-700 px-1 py-0.5 rounded">@copilot</span> to prompt the workspace agent in any channel.
            </p>
          </div>
        </div>

        {/* Right Main Chat Area (3 Cols) */}
        <div className="md:col-span-3 flex flex-col justify-between h-full bg-white dark:bg-zinc-900">
          {/* Channel Header */}
          <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                {activeChannel}
              </span>
              <span className="text-xs text-zinc-400">| Active team room</span>
            </div>
            <Badge variant="outline" size="sm">Synchronized</Badge>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isAi ? 'bg-zinc-50/80 dark:bg-zinc-800/30 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800' : ''}`}
              >
                {msg.isAi ? (
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                ) : (
                  <Avatar fallback={msg.senderName} src={msg.senderAvatar} size="sm" />
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                      {msg.senderName}
                    </span>
                    {msg.isAi && <Badge variant="primary" size="sm">AI Agent</Badge>}
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeChannel}...`}
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
            />
            <Button size="sm" type="submit" disabled={!inputText.trim()}>
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
