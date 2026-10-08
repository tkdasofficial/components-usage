import React from 'react';
import {
  Bell,
  Check,
  CheckCheck,
  Building,
  Download,
  Plus,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { NotificationItem, Workspace, User as UserType, UserRole, Invoice, Integration, AutomationWorkflow } from '../../../types';
import { Avatar } from '../data/DataDisplayComponents';

// 1. NotificationCenter
export interface NotificationCenterProps {
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  className?: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkRead,
  onMarkAllRead,
  className = '',
}) => {
  return (
    <div className={`w-full max-w-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl overflow-hidden ${className}`}>
      <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
          <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">Notifications</h4>
        </div>
        <button
          onClick={onMarkAllRead}
          className="text-[11px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1"
        >
          <CheckCheck className="w-3 h-3" />
          <span>Mark all read</span>
        </button>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80 max-h-72 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-center py-6 text-xs text-zinc-400">All caught up!</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => onMarkRead(n.id)}
              className={`p-2.5 text-xs flex items-start gap-2.5 transition-colors cursor-pointer ${
                n.read ? 'bg-transparent opacity-70' : 'bg-zinc-50/70 dark:bg-zinc-900/60'
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-zinc-900 dark:bg-zinc-100" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{n.title}</p>
                <p className="text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2 leading-relaxed">
                  {n.message}
                </p>
                <span className="text-[10px] font-mono text-zinc-400 mt-0.5 block">{n.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 2. WorkspaceSwitcher
export interface WorkspaceSwitcherProps {
  workspaces: Workspace[];
  activeWorkspaceId: string;
  onSelectWorkspace: (ws: Workspace) => void;
  onCreateNewWorkspace?: () => void;
  className?: string;
}

export const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({
  workspaces,
  activeWorkspaceId,
  onSelectWorkspace,
  onCreateNewWorkspace,
  className = '',
}) => {
  return (
    <div className={`p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl w-60 ${className}`}>
      <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
        Workspaces
      </div>
      <div className="space-y-0.5 mt-0.5">
        {workspaces.map((ws) => {
          const isActive = ws.id === activeWorkspaceId;
          return (
            <button
              key={ws.id}
              onClick={() => onSelectWorkspace(ws)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-xs text-left transition-colors ${
                isActive
                  ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-900 dark:text-zinc-100'
                  : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Building className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{ws.name}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-mono px-1 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                  {ws.plan}
                </span>
                {isActive && <Check className="w-3 h-3 text-zinc-900 dark:text-zinc-100" />}
              </div>
            </button>
          );
        })}
      </div>

      {onCreateNewWorkspace && (
        <div className="pt-1.5 mt-1.5 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={onCreateNewWorkspace}
            className="w-full flex items-center gap-2 p-1.5 rounded-md text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create new workspace</span>
          </button>
        </div>
      )}
    </div>
  );
};

// 3. UserProfileMenu
export interface UserProfileMenuProps {
  user: UserType;
  onSignOut?: () => void;
  onOpenSettings?: () => void;
  className?: string;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  user,
  onSignOut,
  onOpenSettings,
  className = '',
}) => {
  return (
    <div className={`p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl w-60 ${className}`}>
      <div className="flex items-center gap-2.5 pb-2.5 border-b border-zinc-100 dark:border-zinc-800">
        <Avatar name={user.name} src={user.avatar} size="sm" />
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 truncate">{user.name}</h4>
          <p className="text-[11px] text-zinc-400 truncate font-mono">{user.email}</p>
        </div>
      </div>

      <div className="py-1 text-xs space-y-0.5">
        <button
          onClick={onOpenSettings}
          className="w-full text-left px-2 py-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
        >
          Account Settings
        </button>
        <button
          onClick={onOpenSettings}
          className="w-full text-left px-2 py-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
        >
          Security & Keys
        </button>
      </div>

      {onSignOut && (
        <div className="pt-1.5 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={onSignOut}
            className="w-full text-left px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

// 4. RoleSelector
export interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  className?: string;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onChange, className = '' }) => {
  const roles: { role: UserRole; description: string }[] = [
    { role: 'Owner', description: 'Full administrative access and billing' },
    { role: 'Admin', description: 'Manage members, permissions, and assets' },
    { role: 'Member', description: 'Create, edit projects and run workflows' },
    { role: 'Viewer', description: 'Read-only access to documents and dashboards' },
  ];

  return (
    <div className={`space-y-1.5 ${className}`}>
      {roles.map((r) => (
        <label
          key={r.role}
          onClick={() => onChange(r.role)}
          className={`flex items-start gap-2.5 p-2 rounded-lg border cursor-pointer transition-colors ${
            value === r.role
              ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900'
              : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
          }`}
        >
          <input
            type="radio"
            checked={value === r.role}
            onChange={() => onChange(r.role)}
            className="mt-0.5 text-zinc-900 focus:ring-zinc-400"
          />
          <div className="text-xs">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{r.role}</span>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{r.description}</p>
          </div>
        </label>
      ))}
    </div>
  );
};

// 5. TeamMemberSelector
export interface TeamMemberSelectorProps {
  users: UserType[];
  selectedUserId?: string;
  onSelect: (user: UserType) => void;
  className?: string;
}

export const TeamMemberSelector: React.FC<TeamMemberSelectorProps> = ({
  users,
  selectedUserId,
  onSelect,
  className = '',
}) => {
  return (
    <div className={`divide-y divide-zinc-100 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 ${className}`}>
      {users.map((u) => {
        const isSelected = u.id === selectedUserId;
        return (
          <button
            key={u.id}
            type="button"
            onClick={() => onSelect(u)}
            className={`w-full p-2.5 flex items-center justify-between text-left text-xs transition-colors ${
              isSelected ? 'bg-zinc-50 dark:bg-zinc-800/80 font-semibold' : 'hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar name={u.name} src={u.avatar} size="xs" />
              <div className="min-w-0">
                <span className="text-zinc-900 dark:text-zinc-100 truncate block">{u.name}</span>
                <span className="text-[10px] text-zinc-400 font-mono block">{u.email}</span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {u.role}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// 6. PermissionMatrix
export interface PermissionRow {
  resource?: string;
  name?: string;
  id?: string;
  category?: string;
  enabledRoles?: string[];
  owner?: boolean;
  admin?: boolean;
  member?: boolean;
  viewer?: boolean;
}

export interface PermissionMatrixProps {
  permissions?: PermissionRow[];
  roles?: string[];
  onToggle?: (resource: string, role: string, allowed: boolean) => void;
  className?: string;
}

export const PermissionMatrix: React.FC<PermissionMatrixProps> = ({
  permissions = [
    { resource: 'Manage Workspace Billing', owner: true, admin: false, member: false, viewer: false },
    { resource: 'Invite & Revoke Members', owner: true, admin: true, member: false, viewer: false },
    { resource: 'Create & Archive Projects', owner: true, admin: true, member: true, viewer: false },
    { resource: 'Execute AI Workflows', owner: true, admin: true, member: true, viewer: false },
    { resource: 'View Documents & Readmes', owner: true, admin: true, member: true, viewer: true },
    { resource: 'Export Compliance Logs', owner: true, admin: true, member: false, viewer: false },
  ],
  roles = ['Owner', 'Admin', 'Member', 'Viewer'],
  onToggle,
  className = '',
}) => {
  return (
    <div className={`overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg ${className}`}>
      <table className="w-full text-xs text-left">
        <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-medium">
          <tr>
            <th className="py-2.5 px-3.5">Workspace Capability</th>
            {roles.map((r) => (
              <th key={r} className="py-2.5 px-3 text-center">{r}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
          {permissions.map((perm, idx) => {
            const label = perm.name || perm.resource || `Capability ${idx + 1}`;
            return (
              <tr key={perm.id || label} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40">
                <td className="py-2.5 px-3.5 font-medium text-zinc-900 dark:text-zinc-100">
                  {label}
                  {perm.category && (
                    <span className="ml-2 text-[10px] text-zinc-400 font-mono">({perm.category})</span>
                  )}
                </td>
                {roles.map((r) => {
                  const roleKey = r.toLowerCase();
                  const isChecked = perm.enabledRoles
                    ? perm.enabledRoles.includes(r)
                    : Boolean((perm as any)[roleKey]);
                  return (
                    <td key={r} className="py-2.5 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => onToggle?.(label, roleKey, e.target.checked)}
                        className="rounded text-zinc-900 focus:ring-zinc-400 cursor-pointer"
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// 7. PricingCard
export interface PricingCardProps {
  name?: string;
  tierName?: string;
  audience?: string;
  description?: string;
  price: string;
  period?: string;
  cadence?: string;
  features: string[];
  isCurrent?: boolean;
  highlighted?: boolean;
  isPopular?: boolean;
  ctaText?: string;
  onSelect?: () => void;
  onSelectPlan?: () => void;
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  tierName,
  audience,
  description,
  price,
  period,
  cadence,
  features,
  isCurrent = false,
  highlighted = false,
  isPopular = false,
  ctaText = 'Upgrade Plan',
  onSelect,
  onSelectPlan,
  className = '',
}) => {
  const title = tierName || name || 'Plan';
  const sub = description || audience || '';
  const periodText = cadence || (period ? `/ ${period}` : '/ month');
  const isHigh = highlighted || isPopular;
  const trigger = onSelect || onSelectPlan;

  return (
    <div
      className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
        isHigh
          ? 'border-zinc-900 dark:border-zinc-100 bg-white dark:bg-zinc-950 shadow-xs ring-1 ring-zinc-900 dark:ring-zinc-100'
          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70'
      } ${className}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">{title}</h3>
          {isCurrent ? (
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
              Current
            </span>
          ) : isPopular ? (
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold">
              Popular
            </span>
          ) : null}
        </div>
        {sub && <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{sub}</p>}

        <div className="my-4">
          <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 font-mono tabular-nums">
            {price}
          </span>
          <span className="text-xs text-zinc-400 ml-1.5">{periodText}</span>
        </div>

        <div className="space-y-2 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100 shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-5 mt-5">
        <button
          type="button"
          disabled={isCurrent}
          onClick={trigger}
          className={`w-full py-1.5 px-3 text-xs font-semibold rounded-md transition-all ${
            isHigh
              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90'
              : 'border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {isCurrent ? 'Current Plan' : ctaText}
        </button>
      </div>
    </div>
  );
};

// 8. BillingSummary
export interface BillingUsageItem {
  label: string;
  used: number;
  total: number;
  unit: string;
}

export interface BillingSummaryProps {
  planName: string;
  renewalDate?: string;
  nextBillingDate?: string;
  amount?: string;
  cycle?: string;
  paymentMethod?: string;
  onManagePlan?: () => void;
  usage?: BillingUsageItem[];
  onUpgrade?: () => void;
  className?: string;
}

export const BillingSummary: React.FC<BillingSummaryProps> = ({
  planName,
  renewalDate,
  nextBillingDate,
  amount,
  cycle,
  paymentMethod,
  onManagePlan,
  usage,
  onUpgrade,
  className = '',
}) => {
  const renew = nextBillingDate || renewalDate || 'Next month';

  return (
    <div className={`p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <span className="text-[10px] font-mono uppercase text-zinc-400">Current Subscription</span>
          <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{planName}</h4>
        </div>
        {(onManagePlan || onUpgrade) && (
          <button
            onClick={onManagePlan || onUpgrade}
            className="px-3 py-1.5 text-xs font-semibold rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
          >
            Manage Plan
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        {amount && (
          <div>
            <span className="text-zinc-400 block font-mono text-[10px]">RECURRING CHARGE</span>
            <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{amount}</span>
            {cycle && <span className="text-zinc-400 block text-[11px] mt-0.5">{cycle}</span>}
          </div>
        )}
        <div>
          <span className="text-zinc-400 block font-mono text-[10px]">NEXT RENEWAL</span>
          <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{renew}</span>
        </div>
        {paymentMethod && (
          <div>
            <span className="text-zinc-400 block font-mono text-[10px]">PAYMENT METHOD</span>
            <span className="font-medium text-xs text-zinc-700 dark:text-zinc-300">{paymentMethod}</span>
          </div>
        )}
      </div>

      {usage && usage.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          {usage.map((item, idx) => {
            const percent = Math.min(100, Math.round((item.used / item.total) * 100));
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-zinc-500">{item.label}</span>
                  <span className="font-mono text-zinc-700 dark:text-zinc-300">
                    {item.used}/{item.total} {item.unit}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// 9. InvoiceCard
export interface InvoiceCardProps {
  invoice: Invoice;
  onDownload?: (invoice: Invoice) => void;
  className?: string;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onDownload, className = '' }) => {
  return (
    <div className={`p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between text-xs ${className}`}>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
            {invoice.invoiceNumber}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            {invoice.status}
          </span>
        </div>
        <p className="text-zinc-400 font-mono text-[11px]">{invoice.date}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-mono font-bold text-xs text-zinc-900 dark:text-zinc-100 tabular-nums">
          ${invoice.amount.toFixed(2)}
        </span>
        {onDownload && (
          <button
            onClick={() => onDownload(invoice)}
            className="p-1 rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

// 10. IntegrationCard
export interface IntegrationCardProps {
  integration: Integration;
  onToggleConnect: (id: string) => void;
  className?: string;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  onToggleConnect,
  className = '',
}) => {
  return (
    <div className={`p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
            {integration.category}
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              integration.connected ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-300 dark:bg-zinc-700'
            }`}
          />
        </div>
        <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">{integration.name}</h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
          {integration.description}
        </p>
      </div>

      <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
        <span className="font-mono text-[10px] text-zinc-400">
          {integration.lastSynced ? `Synced ${integration.lastSynced}` : integration.authType}
        </span>
        <button
          onClick={() => onToggleConnect(integration.id)}
          className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
            integration.connected
              ? 'border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              : 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90'
          }`}
        >
          {integration.connected ? 'Disconnect' : 'Connect'}
        </button>
      </div>
    </div>
  );
};

// 11. AutomationBuilder
export interface AutomationBuilderProps {
  workflow: AutomationWorkflow;
  onToggle?: (id: string) => void;
  className?: string;
}

export const AutomationBuilder: React.FC<AutomationBuilderProps> = ({
  workflow,
  onToggle,
  className = '',
}) => {
  return (
    <div className={`p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
            <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
              {workflow.name}
            </h4>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{workflow.description}</p>
        </div>
        {onToggle && (
          <button
            onClick={() => onToggle(workflow.id)}
            className={`px-2 py-0.5 text-xs font-mono rounded ${
              workflow.enabled
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
            }`}
          >
            {workflow.enabled ? 'Active' : 'Paused'}
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-[11px] font-mono bg-zinc-50 dark:bg-zinc-950 p-2 rounded border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
        <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 shrink-0">
          Trigger: {workflow.trigger}
        </span>
        <ArrowRight className="w-3 h-3 text-zinc-400 shrink-0" />
        {workflow.condition && (
          <>
            <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 shrink-0">
              Filter: {workflow.condition}
            </span>
            <ArrowRight className="w-3 h-3 text-zinc-400 shrink-0" />
          </>
        )}
        <span className="px-1.5 py-0.5 rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold shrink-0">
          Action: {workflow.action}
        </span>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
        <span>Executed {workflow.runsCount} times</span>
        {workflow.lastRun && <span>Last run: {workflow.lastRun}</span>}
      </div>
    </div>
  );
};
