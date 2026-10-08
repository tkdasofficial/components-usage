import React, { useState } from 'react';
import {
  PageHeader,
  Card,
  Tabs,
  Grid,
  Button,
  IconButton,
  ButtonGroup,
  DropdownButton,
  SplitButton,
  FloatingActionButton,
  CopyButton,
  SegmentedControl,
  Badge,
  Avatar,
  AvatarGroup,
  Progress,
  EmptyState,
  Skeleton,
  CodeBlock,
  MiniChart,
  Tag,
  Timeline,
  ActivityFeed,
  Input,
  Textarea,
  Select,
  Combobox,
  MultiSelect,
  Checkbox,
  RadioGroup,
  Switch,
  Slider,
  DatePicker,
  DateRangePicker,
  TimePicker,
  FileUpload,
  SearchInput,
  PinInput,
  Modal,
  Dialog,
  Drawer,
  Popover,
  Tooltip,
  ContextMenu,
  Sheet,
  Alert,
  Banner,
  ConfirmationDialog,
  ErrorState,
  SuccessState,
  WarningState,
  ProgressIndicator,
  AIChat,
  AIPromptBox,
  AIResponseCard,
  AIActionPanel,
  PricingCard,
  BillingSummary,
  FileCard,
  KnowledgeArticleCard,
} from '../components/ui';
import { useToast } from '../context/ToastContext';
import {
  Sparkles,
  Heart,
  Share2,
  Trash2,
  Download,
  Terminal,
  Layers,
  Sliders,
  Bell,
  Box,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export const ComponentLibraryView: React.FC = () => {
  const { addToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('actions');

  // Interactive Component State
  const [inputText, setInputText] = useState('Production component');
  const [switchVal, setSwitchVal] = useState(true);
  const [sliderVal, setSliderVal] = useState(65);
  const [selectedSingle, setSelectedSingle] = useState('react');
  const [selectedMulti, setSelectedMulti] = useState(['react', 'typescript']);
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [radioVal, setRadioVal] = useState('option-1');
  const [pinVal, setPinVal] = useState('');
  const [segmentedVal, setSegmentedVal] = useState('day');

  // Modal / Overlay States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const categories = [
    { id: 'actions', label: 'Actions (8)' },
    { id: 'layout', label: 'Layout (13)' },
    { id: 'data', label: 'Content & Data (16)' },
    { id: 'forms', label: 'Forms & Inputs (15)' },
    { id: 'overlays', label: 'Overlays (8)' },
    { id: 'feedback', label: 'Feedback (9)' },
    { id: 'saas', label: 'SaaS Modules (15)' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Component Design System"
        description="Comprehensive catalogue of 84 production-grade, modular, and unstyled-accessible React components."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Component System' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="md">84 Components Ready</Badge>
          </div>
        }
      />

      <Tabs
        tabs={categories}
        activeTab={activeCategory}
        onChange={(cat) => setActiveCategory(cat)}
      />

      {/* 1. Actions */}
      {activeCategory === 'actions' && (
        <div className="space-y-6">
          <Card
            header={
              <div>
                <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                  Buttons & Triggers
                </h3>
                <p className="text-xs text-zinc-400">Tactile primary, secondary, danger, and icon variants</p>
              </div>
            }
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">Button Variants</span>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="primary" isLoading>Loading</Button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">Sizes & Icons</span>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button leftIcon={<Sparkles className="w-4 h-4" />}>With Icon</Button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">IconButton & CopyButton</span>
                <div className="flex flex-wrap gap-3 items-center">
                  <IconButton icon={<Heart className="w-4 h-4" />} aria-label="Like" variant="outline" />
                  <IconButton icon={<Share2 className="w-4 h-4" />} aria-label="Share" variant="secondary" />
                  <IconButton icon={<Trash2 className="w-4 h-4" />} aria-label="Delete" variant="danger" />
                  <CopyButton textToCopy="npm install @aether/core" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">Segmented Control & Button Group</span>
                <div className="flex flex-wrap gap-6 items-center">
                  <SegmentedControl
                    value={segmentedVal}
                    onChange={(v) => setSegmentedVal(v)}
                    options={[
                      { value: 'day', label: 'Day' },
                      { value: 'week', label: 'Week' },
                      { value: 'month', label: 'Month' },
                      { value: 'year', label: 'Year' },
                    ]}
                  />
                  <ButtonGroup>
                    <Button variant="outline" size="sm">Left</Button>
                    <Button variant="outline" size="sm">Middle</Button>
                    <Button variant="outline" size="sm">Right</Button>
                  </ButtonGroup>
                  <DropdownButton
                    label="Actions"
                    items={[
                      { label: 'Export JSON', onClick: () => addToast('Exported JSON', 'info') },
                      { label: 'Export CSV', onClick: () => addToast('Exported CSV', 'info') },
                      { label: 'Delete', danger: true, onClick: () => addToast('Deleted', 'error') },
                    ]}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 2. Layout */}
      {activeCategory === 'layout' && (
        <div className="space-y-6">
          <Card
            header={
              <div>
                <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                  Layout & Structural Primitives
                </h3>
                <p className="text-xs text-zinc-400">Grids, headers, breadcrumbs, containers, and dividers</p>
              </div>
            }
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">Grid System</span>
                <Grid cols={3} gap="md">
                  <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-center text-xs font-mono">Col 1 of 3</div>
                  <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-center text-xs font-mono">Col 2 of 3</div>
                  <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-center text-xs font-mono">Col 3 of 3</div>
                </Grid>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">Code Block</span>
                <CodeBlock
                  language="tsx"
                  code={`import { Button, DataTable } from '@/components/ui';

export const MySaaSView = () => {
  return <Button variant="primary">Launch</Button>;
};`}
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 3. Content & Data */}
      {activeCategory === 'data' && (
        <div className="space-y-6">
          <Card
            header={
              <div>
                <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                  Data Displays, Badges & Avatars
                </h3>
                <p className="text-xs text-zinc-400">Badges, stat cards, progress bars, skeletons, and empty states</p>
              </div>
            }
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">Badge Variants</span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">Avatars & Avatar Group</span>
                <div className="flex items-center gap-6">
                  <Avatar fallback="Alex Morgan" size="md" />
                  <Avatar fallback="Sarah Chen" size="lg" />
                  <AvatarGroup
                    max={3}
                    avatars={[
                      { fallback: 'Marcus Vance' },
                      { fallback: 'Elena Rostova' },
                      { fallback: 'David Kim' },
                      { fallback: 'Lisa Wong' },
                    ]}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">Progress Bars</span>
                <div className="space-y-2 max-w-md">
                  <Progress value={35} size="sm" />
                  <Progress value={75} size="md" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">Empty State Component</span>
                <EmptyState
                  title="No issues found"
                  description="Your backlog is pristine. There are zero unresolved engineering tasks."
                  action={<Button size="sm">Create Task</Button>}
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 4. Forms & Inputs */}
      {activeCategory === 'forms' && (
        <div className="space-y-6">
          <Card
            header={
              <div>
                <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                  Form Controls & Inputs
                </h3>
                <p className="text-xs text-zinc-400">Inputs, select, combobox, multiselect, switch, slider, and pickers</p>
              </div>
            }
          >
            <div className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Text Input"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type here..."
                />
                <Select
                  label="Select Dropdown"
                  value={selectedSingle}
                  onChange={(e) => setSelectedSingle(e.target.value)}
                  options={[
                    { value: 'react', label: 'React' },
                    { value: 'vue', label: 'Vue.js' },
                    { value: 'svelte', label: 'Svelte' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MultiSelect
                  label="Multi Select"
                  values={selectedMulti}
                  onChange={(vals) => setSelectedMulti(vals)}
                  options={[
                    { value: 'react', label: 'React' },
                    { value: 'typescript', label: 'TypeScript' },
                    { value: 'tailwind', label: 'Tailwind CSS' },
                    { value: 'graphql', label: 'GraphQL' },
                  ]}
                />
                <DatePicker
                  label="Date Picker"
                  value="2026-10-08"
                  onChange={() => {}}
                />
              </div>

              <div className="grid grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-500 uppercase">Switch</span>
                  <div className="flex items-center gap-3">
                    <Switch checked={switchVal} onChange={() => setSwitchVal(!switchVal)} />
                    <span className="text-xs text-zinc-700 dark:text-zinc-300">
                      {switchVal ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-500 uppercase">Slider ({sliderVal}%)</span>
                  <Slider value={sliderVal} onChange={(v) => setSliderVal(v)} min={0} max={100} />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">Checkbox & Radio</span>
                <div className="flex items-center gap-6">
                  <Checkbox
                    label="Accept terms & SLAs"
                    checked={checkboxVal}
                    onChange={(e) => setCheckboxVal(e.target.checked)}
                  />
                  <RadioGroup
                    name="demo-radio"
                    value={radioVal}
                    onChange={(v) => setRadioVal(v)}
                    options={[
                      { value: 'option-1', label: 'Option A' },
                      { value: 'option-2', label: 'Option B' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 5. Overlays */}
      {activeCategory === 'overlays' && (
        <div className="space-y-6">
          <Card
            header={
              <div>
                <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                  Overlays, Drawers & Modals
                </h3>
                <p className="text-xs text-zinc-400">Modal dialogs, slide-out sheets, tooltips, popovers, and context menus</p>
              </div>
            }
          >
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
                <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>Open Drawer</Button>
                <Button variant="outline" onClick={() => setIsSheetOpen(true)}>Open Sheet</Button>
                <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>Confirmation Dialog</Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <Tooltip content="Tooltip explanation hint">
                  <Button variant="outline" size="sm">Hover for Tooltip</Button>
                </Tooltip>

                <Popover
                  trigger={<Button variant="secondary" size="sm">Click Popover</Button>}
                  content={
                    <div className="p-3 text-xs space-y-1">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">Popover Content</p>
                      <p className="text-zinc-500">Accessible floating card container.</p>
                    </div>
                  }
                />
              </div>
            </div>
          </Card>

          {/* Overlays markup */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Standard Modal Window"
            description="High-contrast backdrop with smooth mount transitions."
          >
            <div className="py-2 text-sm text-zinc-600 dark:text-zinc-400">
              This modal adheres to accessibility standards, trapping focus and allowing dismissal via Escape key or backdrop click.
            </div>
            <div className="pt-4 flex justify-end gap-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button onClick={() => setIsModalOpen(false)}>Dismiss</Button>
            </div>
          </Modal>

          <Dialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            title="Compact Alert Dialog"
          >
            <div className="py-2 text-sm text-zinc-600 dark:text-zinc-400">
              Action executed successfully. No further manual intervention required.
            </div>
            <div className="pt-4 flex justify-end">
              <Button size="sm" onClick={() => setIsDialogOpen(false)}>OK</Button>
            </div>
          </Dialog>

          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            title="Slide-out Drawer"
          >
            <div className="p-4 text-sm text-zinc-600 dark:text-zinc-400 space-y-3">
              <p>Useful for detail sidebars, filtering controls, and mobile navigation overlays.</p>
              <Button onClick={() => setIsDrawerOpen(false)} className="w-full">Close Drawer</Button>
            </div>
          </Drawer>

          <ConfirmationDialog
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={() => {
              addToast('Resource deleted', 'error');
              setIsConfirmOpen(false);
            }}
            title="Delete Database Record?"
            description="Are you sure you want to permanently delete this resource? This action cannot be undone."
          />
        </div>
      )}

      {/* 6. Feedback */}
      {activeCategory === 'feedback' && (
        <div className="space-y-6">
          <Card
            header={
              <div>
                <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                  Feedback, Alerts & Toasts
                </h3>
                <p className="text-xs text-zinc-400">System alerts, toast notifications, banners, and error states</p>
              </div>
            }
          >
            <div className="space-y-4 max-w-2xl">
              <div className="flex gap-2">
                <Button size="sm" onClick={() => addToast('Task updated successfully', 'success')}>Trigger Success Toast</Button>
                <Button size="sm" variant="outline" onClick={() => addToast('Connection failed. Retrying...', 'error')}>Trigger Error Toast</Button>
                <Button size="sm" variant="ghost" onClick={() => addToast('New update available for v2.4.0', 'info')}>Trigger Info Toast</Button>
              </div>

              <Alert variant="info" title="System Notice">
                Sprint 15 retrospective will commence in 30 minutes in #engineering room.
              </Alert>

              <Alert variant="success" title="Deployment Successful">
                Cluster edge services deployed in 1.4s with 100% health checks passed.
              </Alert>

              <Alert variant="warning" title="Compute Limit Warning">
                Workspace has reached 80% of monthly Gemini 2.5 token allocation.
              </Alert>

              <Alert variant="error" title="Critical Exception">
                Unauthorized access attempt blocked on API gateway endpoint /v1/auth.
              </Alert>
            </div>
          </Card>
        </div>
      )}

      {/* 7. SaaS Modules */}
      {activeCategory === 'saas' && (
        <div className="space-y-6">
          <Card
            header={
              <div>
                <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100">
                  Specialized SaaS & Copilot Modules
                </h3>
                <p className="text-xs text-zinc-400">Full domain components: AI response cards, billing summary, file cards</p>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AIResponseCard
                title="Automated Test Generation"
                reasoning="Identified untested branch in authMiddleware.ts line 42."
                content="Generated end-to-end test spec asserting revoked JWT tokens are rejected with HTTP 401."
                codeSnippet={`describe('authMiddleware', () => {
  it('rejects expired bearer token', async () => {
    const res = await request(app).get('/api/me').set('Authorization', 'Bearer expired');
    expect(res.status).toBe(401);
  });
});`}
              />

              <div className="space-y-4">
                <FileCard
                  file={{
                    id: 'f-demo',
                    name: 'Architecture-RFC-v2.pdf',
                    size: '4.2 MB',
                    type: 'pdf',
                    updatedAt: '2 hours ago',
                    owner: 'Sarah Jenkins',
                  }}
                  onOpen={(f) => addToast(`Opening ${f.name}`, 'info')}
                />

                <FileCard
                  file={{
                    id: 'f-demo2',
                    name: 'Design-Tokens-2026.zip',
                    size: '18.9 MB',
                    type: 'archive',
                    updatedAt: 'Yesterday',
                    owner: 'Alex Morgan',
                  }}
                  onOpen={(f) => addToast(`Opening ${f.name}`, 'info')}
                />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
