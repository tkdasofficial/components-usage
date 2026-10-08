import React, { useState } from 'react';
import {
  PageHeader,
  Card,
  Button,
  Badge,
  Modal,
  Input,
  Select,
  DocumentEditor,
  KnowledgeArticleCard,
} from '../components/ui';
import { useWorkspace } from '../context/WorkspaceContext';
import { DocumentItem } from '../types';
import { Plus, BookOpen, FileText, Search, Star } from 'lucide-react';

export const DocumentsView: React.FC = () => {
  const { documents, addDocument, updateDocument } = useWorkspace();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem>(documents[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Architecture');
  const [newContent, setNewContent] = useState('');

  const categories = ['All', 'Architecture', 'Roadmap', 'Design System', 'Operations'];

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addDocument(newTitle, newContent || '# ' + newTitle, newCategory);
    setNewTitle('');
    setNewContent('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Knowledge Base & Documents"
        description="Engineering specs, system RFCs, architecture blueprints, and product guides."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Documents' },
        ]}
        actions={
          <Button
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsModalOpen(true)}
          >
            New Document
          </Button>
        }
      />

      {/* Main split: Document Directory vs Active Document Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[650px]">
        {/* Document list (4 cols) */}
        <div className="lg:col-span-4 space-y-4 flex flex-col">
          {/* Search & Filter */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden"
            />
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Doc cards */}
          <div className="space-y-2.5 overflow-y-auto max-h-[550px] pr-1">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedDoc?.id === doc.id
                    ? 'border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-800 shadow-xs'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Badge variant="outline" size="sm">{doc.category}</Badge>
                  <span className="text-[10px] text-zinc-400 font-mono">{doc.updatedAt}</span>
                </div>
                <h4 className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                  {doc.title}
                </h4>
                <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1 leading-normal">
                  {doc.content.replace(/^[#*-\s]+/gm, '')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Document Editor (8 cols) */}
        <div className="lg:col-span-8 h-full">
          {selectedDoc ? (
            <DocumentEditor
              key={selectedDoc.id}
              document={selectedDoc}
              onSave={(updated) => updateDocument(selectedDoc.id, updated)}
            />
          ) : (
            <div className="h-full flex items-center justify-center p-8 border border-dashed rounded-xl text-zinc-400 text-sm">
              Select or create a document to view details
            </div>
          )}
        </div>
      </div>

      {/* New Document Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Document"
        description="Add a technical spec, architectural blueprint, or knowledge article."
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Document Title"
            placeholder="e.g. Microservices Reliability Guidelines"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <Select
            label="Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            options={[
              { value: 'Architecture', label: 'Architecture' },
              { value: 'Roadmap', label: 'Roadmap' },
              { value: 'Design System', label: 'Design System' },
              { value: 'Operations', label: 'Operations' },
              { value: 'Security', label: 'Security' },
            ]}
          />
          <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Document</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
