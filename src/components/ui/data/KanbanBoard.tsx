import React from 'react';
import { Plus, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Avatar } from './DataDisplayComponents';

export interface KanbanItem {
  id: string;
  title: string;
  columnId: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  tags?: string[];
  assignee?: { name: string; avatar?: string };
  dueDate?: string;
  estimate?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  items: KanbanItem[];
  onMoveItem?: (itemId: string, targetColumnId: string) => void;
  onItemClick?: (item: KanbanItem) => void;
  onAddItem?: (columnId: string) => void;
  className?: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  items,
  onMoveItem,
  onItemClick,
  onAddItem,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4 ${className}`}>
      {columns.map((col, colIdx) => {
        const colItems = items.filter((i) => i.columnId === col.id);

        return (
          <div
            key={col.id}
            className="flex flex-col bg-zinc-100/60 dark:bg-zinc-900/60 rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 min-w-[250px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-2.5 px-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs tracking-tight text-zinc-900 dark:text-zinc-100">
                  {col.title}
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium tabular-nums">
                  {colItems.length}
                </span>
              </div>
              {onAddItem && (
                <button
                  type="button"
                  onClick={() => onAddItem(col.id)}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                  title="Add card"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Column Cards */}
            <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar max-h-[calc(100vh-270px)] min-h-[140px]">
              {colItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onItemClick?.(item)}
                  className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-2xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer group flex flex-col justify-between gap-2"
                >
                  <div>
                    <h4 className="text-xs font-medium text-zinc-900 dark:text-zinc-100 leading-snug">
                      {item.title}
                    </h4>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 my-1.5">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-zinc-100 dark:border-zinc-900">
                    <div className="flex items-center gap-2">
                      {item.assignee && (
                        <Avatar
                          name={item.assignee.name}
                          src={item.assignee.avatar}
                          size="xs"
                        />
                      )}
                      {item.dueDate && (
                        <span className="flex items-center gap-1 text-zinc-400 font-mono text-[10px]">
                          <Clock className="w-3 h-3" />
                          <span>{item.dueDate}</span>
                        </span>
                      )}
                    </div>

                    {/* Quick Move Action buttons */}
                    {onMoveItem && (
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        {colIdx > 0 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onMoveItem(item.id, columns[colIdx - 1].id);
                            }}
                            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                            title={`Move to ${columns[colIdx - 1].title}`}
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                        {colIdx < columns.length - 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onMoveItem(item.id, columns[colIdx + 1].id);
                            }}
                            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                            title={`Move to ${columns[colIdx + 1].title}`}
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {colItems.length === 0 && (
                <div className="h-20 flex items-center justify-center text-xs text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-800 rounded">
                  No tasks
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
