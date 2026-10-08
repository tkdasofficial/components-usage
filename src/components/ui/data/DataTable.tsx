import React, { useState, useMemo } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { EmptyState, Skeleton } from './DataDisplayComponents';

export interface ColumnDef<T> {
  key: string;
  header: string;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  render?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor?: (item: T) => string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFilter?: (item: T, query: string) => boolean;
  pageSize?: number;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  actionsSlot?: React.ReactNode;
  className?: string;
}

export const DataTable = <T,>({
  data,
  columns,
  keyExtractor,
  searchable = true,
  searchPlaceholder = 'Filter rows...',
  searchFilter,
  pageSize = 10,
  selectable = false,
  onSelectionChange,
  isLoading = false,
  emptyTitle = 'No data records found',
  emptyDescription = 'Try adjusting your search criteria or create a new entry.',
  actionsSlot,
  className = '',
}: DataTableProps<T>) => {
  const getKey = (item: T, idx: number) => {
    if (keyExtractor) return keyExtractor(item);
    return (item as any)?.id || (item as any)?.key || (item as any)?.invoiceNumber || String(idx);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filtering
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    if (searchFilter) {
      return data.filter((item) => searchFilter(item, searchQuery));
    }
    return data.filter((item) => {
      return Object.values(item as Record<string, unknown>).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [data, searchQuery, searchFilter]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];
      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      const cmp = aVal > bVal ? 1 : -1;
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortOrder === 'asc') setSortOrder('desc');
      else {
        setSortKey(null);
        setSortOrder('asc');
      }
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = paginatedData.map((item, i) => getKey(item, i));
      setSelectedIds(allIds);
      onSelectionChange?.(allIds);
    } else {
      setSelectedIds([]);
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (id: string) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];
    setSelectedIds(updated);
    onSelectionChange?.(updated);
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      {/* Top Filter & Actions Bar */}
      {(searchable || actionsSlot) && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {searchable ? (
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
              />
            </div>
          ) : (
            <div />
          )}

          {actionsSlot && <div className="flex items-center gap-2">{actionsSlot}</div>}
        </div>
      )}

      {/* Table Frame */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">
              <tr>
                {selectable && (
                  <th className="w-10 px-3 py-2.5 text-center">
                    <input
                      type="checkbox"
                      checked={
                        paginatedData.length > 0 &&
                        paginatedData.every((item, i) => selectedIds.includes(getKey(item, i)))
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 focus:ring-zinc-500 dark:bg-zinc-900"
                    />
                  </th>
                )}
                {columns.map((col) => {
                  const isSorted = sortKey === col.key;
                  return (
                    <th
                      key={col.key}
                      onClick={() => col.sortable && handleSort(col.key)}
                      className={`py-2.5 px-3.5 select-none ${
                        col.sortable ? 'cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100' : ''
                      } ${
                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                      }`}
                    >
                      <div
                        className={`inline-flex items-center gap-1.5 ${
                          col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : 'justify-start'
                        }`}
                      >
                        <span>{col.header}</span>
                        {col.sortable && (
                          <span className="text-zinc-400 shrink-0">
                            {isSorted ? (
                              sortOrder === 'asc' ? (
                                <ChevronUp className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
                              )
                            ) : (
                              <ChevronsUpDown className="w-3.5 h-3.5" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80 bg-white dark:bg-zinc-950">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, rIdx) => (
                  <tr key={rIdx}>
                    {selectable && (
                      <td className="px-3 py-2.5 text-center">
                        <Skeleton variant="circular" width={14} height={14} />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className="py-2.5 px-3.5">
                        <Skeleton height={14} width="70%" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="py-10 text-center"
                  >
                    <EmptyState
                      title={emptyTitle}
                      description={emptyDescription}
                      className="border-0 bg-transparent"
                    />
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, idx) => {
                  const id = getKey(item, idx);
                  const isSelected = selectedIds.includes(id);
                  return (
                    <tr
                      key={id}
                      className={`hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors ${
                        isSelected ? 'bg-zinc-50/80 dark:bg-zinc-900/80' : ''
                      }`}
                    >
                      {selectable && (
                        <td className="w-10 px-3 py-2.5 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectRow(id)}
                            className="rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 focus:ring-zinc-500 dark:bg-zinc-900"
                          />
                        </td>
                      )}
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`py-2.5 px-3.5 text-zinc-800 dark:text-zinc-200 ${
                            col.align === 'right'
                              ? 'text-right'
                              : col.align === 'center'
                              ? 'text-center'
                              : 'text-left'
                          }`}
                        >
                          {col.render
                            ? col.render(item)
                            : String((item as Record<string, unknown>)[col.key] ?? '')}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-3.5 py-2.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/40 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <div>
            <span>
              Showing{' '}
              <strong className="font-mono tabular-nums text-zinc-800 dark:text-zinc-200 font-semibold">
                {paginatedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
              </strong>{' '}
              to{' '}
              <strong className="font-mono tabular-nums text-zinc-800 dark:text-zinc-200 font-semibold">
                {Math.min(currentPage * pageSize, sortedData.length)}
              </strong>{' '}
              of{' '}
              <strong className="font-mono tabular-nums text-zinc-800 dark:text-zinc-200 font-semibold">
                {sortedData.length}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1 rounded border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono tabular-nums px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 rounded border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
