import React, { useState } from 'react';
import {
  PageHeader,
  Card,
  Grid,
  Button,
  SegmentedControl,
  Progress,
  Modal,
  FileUpload,
  FileCard,
} from '../components/ui';
import { mockFiles } from '../data/mockData';
import { FileItem } from '../types';
import {
  UploadCloud,
  FolderPlus,
  LayoutGrid,
  List as ListIcon,
  HardDrive,
  CheckCircle2,
} from 'lucide-react';

export const FileManagerView: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredFiles = files.filter((f) => {
    if (filterType === 'all') return true;
    return f.type === filterType;
  });

  const handleDelete = (file: FileItem) => {
    setFiles(files.filter((f) => f.id !== file.id));
  };

  const handleSimulatedUpload = (uploaded: File[]) => {
    if (uploaded.length === 0) return;
    const newItems: FileItem[] = uploaded.map((f, i) => ({
      id: `file-${Date.now()}-${i}`,
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      type: f.name.endsWith('.pdf')
        ? 'pdf'
        : f.name.endsWith('.png') || f.name.endsWith('.jpg')
        ? 'image'
        : 'doc',
      updatedAt: 'Just now',
      owner: 'Alex Morgan',
    }));
    setFiles([...newItems, ...files]);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Asset & File Storage"
        description="Encrypted artifact repositories, build distributions, design assets, and logs."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'File Manager' },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <SegmentedControl
              value={viewMode}
              onChange={(v) => setViewMode(v as 'grid' | 'list')}
              options={[
                { value: 'grid', label: <LayoutGrid className="w-4 h-4" /> },
                { value: 'list', label: <ListIcon className="w-4 h-4" /> },
              ]}
              size="sm"
            />
            <Button
              size="sm"
              leftIcon={<UploadCloud className="w-3.5 h-3.5" />}
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload Assets
            </Button>
          </div>
        }
      />

      {/* Storage Quota Header Banner */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
              Workspace Object Storage
            </div>
            <div className="text-xs text-zinc-400">
              18.4 GB used of 50.0 GB Tier quota (36.8%)
            </div>
          </div>
        </div>
        <div className="w-full sm:w-64 space-y-1">
          <Progress value={36.8} size="sm" />
          <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
            <span>18.4 GB</span>
            <span>50.0 GB Limit</span>
          </div>
        </div>
      </div>

      {/* Type filter tabs */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          {['all', 'folder', 'pdf', 'image', 'code', 'archive'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filterType === type
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          {filteredFiles.length} files
        </span>
      </div>

      {/* File Items */}
      {viewMode === 'grid' ? (
        <Grid cols={4} gap="md">
          {filteredFiles.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onDelete={handleDelete}
              onOpen={(f) => alert(`Opening ${f.name}`)}
            />
          ))}
        </Grid>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800">
          {filteredFiles.map((f) => (
            <div
              key={f.id}
              className="p-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-zinc-400 uppercase">
                  {f.type}
                </span>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {f.name}
                </span>
              </div>
              <div className="flex items-center gap-6 text-xs text-zinc-400 font-mono">
                <span>{f.size}</span>
                <span>{f.updatedAt}</span>
                <span>{f.owner}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Assets"
        description="Drag files or select from your local device."
      >
        <div className="space-y-4">
          <FileUpload
            onFilesSelected={handleSimulatedUpload}
            maxSizeMb={50}
            accept=".pdf,.png,.jpg,.svg,.zip,.ts,.tsx"
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsUploadModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
