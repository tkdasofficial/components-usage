import React, { useState } from 'react';
import {
  PageHeader,
  Card,
  DataTable,
  ColumnDef,
  Badge,
  Avatar,
  Button,
  Modal,
  Input,
  Select,
} from '../components/ui';
import { mockUsers } from '../data/mockData';
import { User, UserRole } from '../types';
import { UserPlus, Mail, Shield, Check, Trash2 } from 'lucide-react';

export const TeamView: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('Member');
  const [inviteDept, setInviteDept] = useState('Engineering');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !inviteName.trim()) return;

    const newUser: User = {
      id: `u-${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      department: inviteDept,
      status: 'active',
      joinedDate: 'Oct 2026',
    };

    setUsers([...users, newUser]);
    setInviteEmail('');
    setInviteName('');
    setIsInviteModalOpen(false);
  };

  const columns: ColumnDef<User>[] = [
    {
      key: 'name',
      header: 'Member',
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <Avatar fallback={u.name} src={u.avatar} size="sm" />
          <div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
              {u.name}
            </div>
            <div className="text-xs text-zinc-400 font-mono">{u.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (u) => {
        const variant =
          u.role === 'Owner'
            ? 'primary'
            : u.role === 'Admin'
            ? 'success'
            : 'outline';
        return <Badge variant={variant} size="sm">{u.role}</Badge>;
      },
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      render: (u) => (
        <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
          {u.department}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              u.status === 'active'
                ? 'bg-emerald-500'
                : u.status === 'busy'
                ? 'bg-amber-500'
                : 'bg-zinc-400'
            }`}
          />
          <span className="text-xs capitalize text-zinc-500">{u.status}</span>
        </div>
      ),
    },
    {
      key: 'joinedDate',
      header: 'Joined',
      sortable: true,
      render: (u) => (
        <span className="text-xs font-mono text-zinc-400">{u.joinedDate}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (u) =>
        u.role !== 'Owner' ? (
          <button
            onClick={() => setUsers(users.filter((item) => item.id !== u.id))}
            className="p-1 text-zinc-400 hover:text-red-500 rounded"
            title="Remove member"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        ) : null,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team & Access Control"
        description="Manage workspace collaborators, enterprise role assignments, and member permissions."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Team & Members' },
        ]}
        actions={
          <Button
            size="sm"
            leftIcon={<UserPlus className="w-3.5 h-3.5" />}
            onClick={() => setIsInviteModalOpen(true)}
          >
            Invite Member
          </Button>
        }
      />

      <Card noPadding>
        <DataTable
          columns={columns}
          data={users}
          pageSize={8}
          searchable
          searchPlaceholder="Search team members by name or email..."
        />
      </Card>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite New Collaborator"
        description="Send an email invitation to join this workspace."
      >
        <form onSubmit={handleInvite} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Jane Doe"
            value={inviteName}
            onChange={(e) => setInviteName(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="jane@company.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Role"
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as UserRole)}
              options={[
                { value: 'Admin', label: 'Admin' },
                { value: 'Member', label: 'Member' },
                { value: 'Viewer', label: 'Viewer' },
              ]}
            />
            <Select
              label="Department"
              value={inviteDept}
              onChange={(e) => setInviteDept(e.target.value)}
              options={[
                { value: 'Engineering', label: 'Engineering' },
                { value: 'Product', label: 'Product' },
                { value: 'Design', label: 'Design' },
                { value: 'Operations', label: 'Operations' },
              ]}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button variant="ghost" type="button" onClick={() => setIsInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Send Invitation</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
