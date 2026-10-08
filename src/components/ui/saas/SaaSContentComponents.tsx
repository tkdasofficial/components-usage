import React, { useState } from 'react';
import {
  Folder,
  FileText,
  FileCode,
  Image as ImageIcon,
  Archive,
  MoreVertical,
  Plus,
  Bold,
  Italic,
  List,
  Heading,
  Code,
  Eye,
  Edit3,
  ChevronRight,
  BookOpen,
  Check,
  Search,
  Sparkles,
  Download,
  Trash2,
} from 'lucide-react';
import { FileItem, DocumentItem, ActivityItem } from '../../../types';
import { Badge, Avatar } from '../data/DataDisplayComponents';
import { Button } from '../actions/Button';

// 1. File Card
export interface FileCardProps {
  file: FileItem;
  onOpen?: (file: FileItem) => void;
  onDelete?: (file: FileItem) => void;
  isSelected?: boolean;
}

export const FileCard: React.FC<FileCardProps> = ({
  file,
  onOpen,
  onDelete,
  isSelected = false,
}) => {
  const getFileIcon = (type: FileItem['type']) => {
    switch (type) {
      case 'folder':
        return <Folder className="w-8 h-8 text-amber-500 fill-amber-500/20" />;
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'code':
        return <FileCode className="w-8 h-8 text-blue-500" />;
      case 'image':
        return <ImageIcon className="w-8 h-8 text-emerald-500" />;
      case 'archive':
        return <Archive className="w-8 h-8 text-purple-500" />;
      default:
        return <FileText className="w-8 h-8 text-zinc-500" />;
    }
  };

  return (
    <div
      onClick={() => onOpen?.(file)}
      className={`group relative p-4 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
        isSelected
          ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-900 dark:border-white shadow-xs'
          : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-xs'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
          {getFileIcon(file.type)}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(file);
              }}
              className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-3">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate" title={file.name}>
          {file.name}
        </p>
        <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 mt-1">
          <span>{file.type === 'folder' ? `${file.itemsCount || 0} items` : file.size}</span>
          <span>{file.updatedAt}</span>
        </div>
      </div>
    </div>
  );
};

// 2. Document Editor Component
export interface DocumentEditorProps {
  document: DocumentItem;
  onSave?: (updatedContent: string) => void;
  readOnly?: boolean;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  document,
  onSave,
  readOnly = false,
}) => {
  const [content, setContent] = useState(document.content);
  const [isSaved, setIsSaved] = useState(true);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    onSave?.(content);
    setIsSaved(true);
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
      {/* Editor Header Toolbar */}
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="flex items-center gap-2">
          <Badge variant="outline" size="sm">{document.category}</Badge>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
            {wordCount} words
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            • Last updated {document.updatedAt}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5 bg-zinc-100 dark:bg-zinc-800 text-xs">
            <button
              onClick={() => setMode('edit')}
              className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1.5 ${
                mode === 'edit'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={() => setMode('preview')}
              className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1.5 ${
                mode === 'preview'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
          </div>

          <Button
            size="sm"
            variant={isSaved ? 'outline' : 'primary'}
            onClick={handleSave}
            disabled={readOnly || isSaved}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                Saved
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
          {document.title}
        </h1>

        {mode === 'edit' && !readOnly ? (
          <textarea
            value={content}
            onChange={handleChange}
            placeholder="Write your document content here (supports Markdown)..."
            className="w-full h-[calc(100%-4rem)] min-h-[300px] resize-none bg-transparent text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 focus:outline-hidden font-mono"
          />
        ) : (
          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

// 3. Knowledge Article Card
export interface KnowledgeArticleCardProps {
  document: DocumentItem;
  onClick?: () => void;
}

export const KnowledgeArticleCard: React.FC<KnowledgeArticleCardProps> = ({
  document,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-sm"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" size="sm">{document.category}</Badge>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">{document.updatedAt}</span>
        </div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline text-base mb-1.5">
          {document.title}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {document.content.replace(/^[#*-\s]+/gm, '')}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            fallback={document.author.name}
            src={document.author.avatar}
            size="xs"
          />
          <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
            {document.author.name}
          </span>
        </div>
        <div className="flex items-center text-xs font-medium text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
          Read article <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </div>
      </div>
    </div>
  );
};
