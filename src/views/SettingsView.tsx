import React, { useState } from 'react';
import {
  PageHeader,
  Card,
  Tabs,
  Input,
  Button,
  Switch,
  Badge,
  PermissionMatrix,
} from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';
import { Shield, Key, Bell, Building, Check, Copy } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { activeWorkspace, setActiveWorkspace } = useWorkspace();
  const [activeTab, setActiveTab] = useState('general');
  const [wsName, setWsName] = useState(activeWorkspace.name);
  const [wsSlug, setWsSlug] = useState(activeWorkspace.slug);

  // Security toggles
  const [enforce2FA, setEnforce2FA] = useState(true);
  const [allowPublicShares, setAllowPublicShares] = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);
  const [aiTelemetry, setAiTelemetry] = useState(true);

  // API key state
  const [apiKey] = useState('aeth_live_89f02c9183419bbce20194019');
  const [copiedKey, setCopiedKey] = useState(false);

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'permissions', label: 'Roles & Permissions' },
    { id: 'security', label: 'Security & 2FA' },
    { id: 'api-keys', label: 'API Keys & Secrets' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workspace Configuration"
        description="Fine-tune workspace identity, team access governance, cryptographic keys, and security compliance."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Settings' },
        ]}
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id)} />

      {activeTab === 'general' && (
        <div className="space-y-6 max-w-3xl">
          <Card
            header={
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Workspace Identity
                </h3>
                <p className="text-xs text-zinc-400">Public profile and identifiers for your team namespace</p>
              </div>
            }
          >
            <div className="space-y-4">
              <Input
                label="Workspace Display Name"
                value={wsName}
                onChange={(e) => setWsName(e.target.value)}
              />
              <Input
                label="Workspace Domain Slug"
                value={wsSlug}
                onChange={(e) => setWsSlug(e.target.value)}
                helperText={`https://aether.build/${wsSlug}`}
              />

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                <Button
                  onClick={() => {
                    setActiveWorkspace({ ...activeWorkspace, name: wsName, slug: wsSlug });
                    alert('Workspace saved');
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'permissions' && (
        <Card
          header={
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Enterprise Role Hierarchy
              </h3>
              <p className="text-xs text-zinc-400">Granular resource permissions across roles</p>
            </div>
          }
          noPadding
        >
          <PermissionMatrix
            roles={['Owner', 'Admin', 'Member', 'Viewer']}
            permissions={[
              { id: 'p1', name: 'Create Projects & Repositories', category: 'Projects', enabledRoles: ['Owner', 'Admin', 'Member'] },
              { id: 'p2', name: 'Delete Projects', category: 'Projects', enabledRoles: ['Owner', 'Admin'] },
              { id: 'p3', name: 'Invite External Collaborators', category: 'Access', enabledRoles: ['Owner', 'Admin'] },
              { id: 'p4', name: 'Trigger Autonomous Agent Workflows', category: 'AI Copilot', enabledRoles: ['Owner', 'Admin', 'Member'] },
              { id: 'p5', name: 'Modify Billing & Subscription', category: 'Billing', enabledRoles: ['Owner'] },
              { id: 'p6', name: 'View Audit & Telemetry Logs', category: 'Compliance', enabledRoles: ['Owner', 'Admin'] },
            ]}
          />
        </Card>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6 max-w-3xl">
          <Card
            header={
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Authentication & Security Compliance
                </h3>
                <p className="text-xs text-zinc-400">Enforce enterprise zero-trust controls</p>
              </div>
            }
          >
            <div className="space-y-6 divide-y divide-zinc-100 dark:divide-zinc-800">
              <div className="flex items-center justify-between pt-2">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Mandatory Two-Factor Authentication (2FA)
                  </h4>
                  <p className="text-xs text-zinc-500">Require all members to authenticate with WebAuthn or TOTP</p>
                </div>
                <Switch checked={enforce2FA} onChange={() => setEnforce2FA(!enforce2FA)} />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Allow Public Sharing of Documents
                  </h4>
                  <p className="text-xs text-zinc-500">Enable read-only external URLs for technical specs</p>
                </div>
                <Switch checked={allowPublicShares} onChange={() => setAllowPublicShares(!allowPublicShares)} />
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'api-keys' && (
        <div className="space-y-6 max-w-3xl">
          <Card
            header={
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Production API Credentials
                </h3>
                <p className="text-xs text-zinc-400">Use secret keys to invoke the Aether Workspace programmatic API</p>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                <div className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                  {apiKey}
                </div>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard?.writeText(apiKey);
                    setCopiedKey(true);
                    setTimeout(() => setCopiedKey(false), 2000);
                  }}
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-500 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                  {copiedKey ? 'Copied' : 'Copy Key'}
                </Button>
              </div>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Do not commit this token into public GitHub repositories. Use environment variables in production.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
