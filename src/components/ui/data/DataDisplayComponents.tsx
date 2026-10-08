import React, { useState } from 'react';
import {
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  Copy,
  Inbox,
} from 'lucide-react';

// 1. Card (Clean single-elevation, zero clutter)
export interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hoverable?: boolean;
  noPadding?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  hoverable = false,
  noPadding = false,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden transition-all ${
        hoverable ? 'hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xs cursor-pointer' : ''
      } ${className}`}
    >
      {header && (
        <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
          {header}
        </div>
      )}
      <div className={noPadding ? '' : 'p-4'}>{children}</div>
      {footer && (
        <div className="px-4 py-2.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          {footer}
        </div>
      )}
    </div>
  );
};

// 2. StatCard (KPI with Tabular Numerals)
export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  period?: string;
  sparkline?: number[];
  sparklineData?: number[];
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  period = 'vs last period',
  sparkline,
  sparklineData,
  icon,
  className = '',
}) => {
  const isPositive = change !== undefined && change >= 0;
  const activeSpark = sparkline || sparklineData;

  return (
    <div
      className={`p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
        <span>{title}</span>
        {icon && <span className="text-zinc-400 dark:text-zinc-500">{icon}</span>}
      </div>

      <div className="my-2.5 flex items-baseline justify-between gap-2">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-mono tabular-nums">
          {value}
        </span>
        {activeSpark && activeSpark.length > 0 && (
          <div className="w-18 h-7 shrink-0">
            <MiniChart data={activeSpark} type="line" height={28} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        {change !== undefined && (
          <span
            className={`font-semibold inline-flex items-center font-mono tabular-nums ${
              isPositive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5 inline" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5 inline" />
            )}
            {Math.abs(change)}%
          </span>
        )}
        <span aria-hidden="true">·</span>
        <span className="truncate">{period}</span>
      </div>
    </div>
  );
};

// 3. MiniChart (SVG sparklines, bar, area)
export interface MiniChartProps {
  data: number[];
  type?: 'line' | 'bar' | 'area';
  height?: number;
  className?: string;
}

export const MiniChart: React.FC<MiniChartProps> = ({
  data,
  type = 'line',
  height = 36,
  className = '',
}) => {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 120;
  const padding = 2;

  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width - padding},${height} L ${padding},${height} Z`;

  if (type === 'bar') {
    const barWidth = Math.max(3, (width - data.length * 2) / data.length);
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={`w-full h-full overflow-visible ${className}`}
        preserveAspectRatio="none"
      >
        {data.map((val, idx) => {
          const x = idx * (width / data.length) + 1;
          const barHeight = ((val - min) / range) * (height - 4) + 4;
          const y = height - barHeight;
          return (
            <rect
              key={idx}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              className="fill-zinc-800 dark:fill-zinc-200"
              rx={1}
            />
          );
        })}
      </svg>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-full overflow-visible ${className}`}
      preserveAspectRatio="none"
    >
      {type === 'area' && (
        <path d={areaD} className="fill-zinc-200/50 dark:fill-zinc-800/50" />
      )}
      <path
        d={pathD}
        fill="none"
        className="stroke-zinc-900 dark:stroke-zinc-100"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 4. Badge (Zero-Pill Discipline Compliant)
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'outline' | 'subtle' | 'solid' | 'text' | 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'subtle',
  size = 'sm',
  className = '',
}) => {
  const sizeMap = {
    sm: 'text-[11px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
  };

  const variantMap: Record<string, string> = {
    subtle: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded border border-zinc-200/60 dark:border-zinc-700/60',
    default: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded border border-zinc-200/60 dark:border-zinc-700/60',
    outline: 'border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded',
    solid: 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 rounded font-semibold',
    primary: 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 rounded font-semibold',
    text: 'text-zinc-600 dark:text-zinc-400 font-mono tracking-tight',
    success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded font-medium',
    warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded font-medium',
    danger: 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-800 rounded font-medium',
  };

  return (
    <span className={`inline-flex items-center font-medium select-none ${sizeMap[size]} ${variantMap[variant] || variantMap.subtle} ${className}`}>
      {children}
    </span>
  );
};

// 5. Avatar & AvatarGroup
export interface AvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'active' | 'busy' | 'away' | 'offline';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  fallback,
  size = 'md',
  status,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const displayName = name || fallback || 'User';

  const sizeMap = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
    xl: 'w-12 h-12 text-base',
  };

  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <div
        className={`rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold flex items-center justify-center overflow-hidden border border-zinc-300/80 dark:border-zinc-700/80 ${sizeMap[size]}`}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={displayName}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {status && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-zinc-950 ${
            size === 'xs' ? 'w-1.5 h-1.5' : 'w-2 h-2'
          } ${
            status === 'active'
              ? 'bg-zinc-900 dark:bg-zinc-100'
              : status === 'busy'
              ? 'bg-zinc-500 dark:bg-zinc-400'
              : 'bg-zinc-300 dark:bg-zinc-600'
          }`}
        />
      )}
    </div>
  );
};

export interface AvatarGroupProps {
  users?: { name?: string; fallback?: string; src?: string }[];
  avatars?: { name?: string; fallback?: string; src?: string }[];
  max?: number;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  users,
  avatars,
  max = 4,
  size = 'sm',
  className = '',
}) => {
  const list = avatars || users || [];
  const visible = list.slice(0, max);
  const remaining = list.length - max;

  return (
    <div className={`flex items-center -space-x-1.5 overflow-hidden ${className}`}>
      {visible.map((u, i) => (
        <Avatar key={i} name={u.name || u.fallback} src={u.src} size={size} className="ring-2 ring-white dark:ring-zinc-950" />
      ))}
      {remaining > 0 && (
        <div
          className={`relative z-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[10px] font-semibold ring-2 ring-white dark:ring-zinc-950 ${
            size === 'xs' ? 'w-6 h-6' : size === 'sm' ? 'w-7 h-7' : 'w-8 h-8'
          }`}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

// 6. Progress
export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  showPercent = false,
  size = 'md',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeMap = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-2.5',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center text-xs text-zinc-600 dark:text-zinc-400 mb-1">
          {label && <span>{label}</span>}
          {showPercent && <span className="font-mono tabular-nums font-semibold">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden ${sizeMap[size]}`}>
        <div
          className="bg-zinc-900 dark:bg-zinc-100 h-full transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// 7. EmptyState
export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-10 text-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 mb-3">
        {icon || <Inbox className="w-5 h-5" />}
      </div>
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      {description && (
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

// 8. Skeleton
export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
}) => {
  const variantMap = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const style: React.CSSProperties = {
    width: width !== undefined ? width : '100%',
    height: height !== undefined ? height : undefined,
  };

  return (
    <div
      className={`animate-pulse bg-zinc-200 dark:bg-zinc-800/80 ${variantMap[variant]} ${className}`}
      style={style}
    />
  );
};

// 9. LoadingState
export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading workspace data...',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-10 space-y-2.5 ${className}`}>
      <div className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-700 border-t-zinc-900 dark:border-t-zinc-100 rounded-full animate-spin" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{message}</p>
    </div>
  );
};

// 10. KeyVal
export interface KeyValProps {
  label: string;
  value: React.ReactNode;
  copyable?: boolean;
  className?: string;
}

export const KeyVal: React.FC<KeyValProps> = ({ label, value, copyable = false, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof value === 'string') {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex items-center justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-800/60 text-xs ${className}`}>
      <span className="text-zinc-500 dark:text-zinc-400 font-medium">{label}</span>
      <div className="flex items-center gap-1.5 font-mono text-zinc-900 dark:text-zinc-100 tabular-nums font-medium">
        <span>{value}</span>
        {copyable && typeof value === 'string' && (
          <button
            onClick={handleCopy}
            className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded"
            title="Copy value"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          </button>
        )}
      </div>
    </div>
  );
};

// 11. CodeBlock
export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  showLineNumbers = true,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const lines = code.trim().split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 overflow-hidden text-xs font-mono ${className}`}>
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-zinc-800 bg-zinc-900/60 text-[11px] text-zinc-400">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-zinc-100 transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-3 overflow-x-auto leading-relaxed">
        {lines.map((line, idx) => (
          <div key={idx} className="flex">
            {showLineNumbers && (
              <span className="w-7 shrink-0 text-zinc-600 select-none text-right pr-2.5 tabular-nums">
                {idx + 1}
              </span>
            )}
            <span className="flex-1 whitespace-pre">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 12. Accordion
export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="bg-white dark:bg-zinc-900">
            <button
              onClick={() => toggle(item.id)}
              className="w-full px-4 py-3 flex items-center justify-between text-left text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-3.5 pt-0.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/50">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// 13. Grid
export interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Grid: React.FC<GridProps> = ({ children, cols = 3, gap = 'md', className = '' }) => {
  const colMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12',
  };

  const gapMap = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return <div className={`grid ${colMap[cols]} ${gapMap[gap]} ${className}`}>{children}</div>;
};

// 14. List
export interface ListItem {
  id: string;
  primary: React.ReactNode;
  secondary?: React.ReactNode;
  metadata?: React.ReactNode;
  trailing?: React.ReactNode;
  leading?: React.ReactNode;
  onClick?: () => void;
}

export interface ListProps {
  items: ListItem[];
  divided?: boolean;
  className?: string;
}

export const List: React.FC<ListProps> = ({ items, divided = true, className = '' }) => {
  return (
    <div
      className={`rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden ${
        divided ? 'divide-y divide-zinc-200 dark:divide-zinc-800' : ''
      } ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.id}
          onClick={item.onClick}
          className={`p-3 flex items-center justify-between gap-3 text-xs transition-colors ${
            item.onClick ? 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer' : ''
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {item.leading && <span className="shrink-0">{item.leading}</span>}
            <div className="min-w-0">
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{item.primary}</div>
              {item.secondary && (
                <div className="text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">{item.secondary}</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            {item.metadata && <span className="text-zinc-400 dark:text-zinc-500 font-mono text-[11px]">{item.metadata}</span>}
            {item.trailing && <div>{item.trailing}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

// 15. SimpleTable
export interface SimpleTableColumn<T> {
  key: string;
  header: string;
  align?: 'left' | 'right' | 'center';
  render: (item: T) => React.ReactNode;
}

export interface SimpleTableProps<T> {
  data: T[];
  columns: SimpleTableColumn<T>[];
  keyExtractor: (item: T) => string;
  className?: string;
}

export const SimpleTable = <T,>({
  data,
  columns,
  keyExtractor,
  className = '',
}: SimpleTableProps<T>) => {
  return (
    <div className={`overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg ${className}`}>
      <table className="w-full text-xs text-left">
        <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`py-2.5 px-3.5 ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40 transition-colors">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`py-2.5 px-3.5 text-zinc-800 dark:text-zinc-200 ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 16. Timeline
export interface TimelineItem {
  id: string;
  title: string;
  timestamp: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  return (
    <div className={`relative pl-5 space-y-5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800 ${className}`}>
      {items.map((item) => (
        <div key={item.id} className="relative">
          <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-100 flex items-center justify-center text-[10px]" />
          <div>
            <div className="flex items-center justify-between text-xs gap-2">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</span>
              <span className="text-zinc-400 font-mono text-[11px]">{item.timestamp}</span>
            </div>
            {item.description && (
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// 17. ActivityFeed
export interface ActivityFeedItemData {
  id: string;
  actor: string;
  avatar?: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface ActivityFeedProps {
  activities?: ActivityFeedItemData[];
  items?: { id: string; user?: string; actor?: string; avatar?: string; action: string; target: string; time?: string; timestamp?: string }[];
  className?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, items, className = '' }) => {
  const list = activities || (items ? items.map(i => ({
    id: i.id,
    actor: i.actor || i.user || 'User',
    avatar: i.avatar,
    action: i.action,
    target: i.target,
    timestamp: i.timestamp || i.time || '',
  })) : []);

  return (
    <div className={`divide-y divide-zinc-200 dark:border-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 ${className}`}>
      {list.map((act) => (
        <div key={act.id} className="p-3 flex items-start gap-3 text-xs">
          <Avatar name={act.actor} src={act.avatar} size="xs" />
          <div className="flex-1 min-w-0">
            <p className="text-zinc-900 dark:text-zinc-100 leading-snug">
              <span className="font-semibold">{act.actor}</span>{' '}
              <span className="text-zinc-500 dark:text-zinc-400">{act.action}</span>{' '}
              <span className="font-medium text-zinc-800 dark:text-zinc-200">{act.target}</span>
            </p>
            <span className="text-[10px] text-zinc-400 font-mono mt-0.5 block">{act.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// 18. Tag
export interface TagProps {
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, onRemove, className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 ${className}`}>
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer ml-0.5"
        >
          ×
        </button>
      )}
    </span>
  );
};

