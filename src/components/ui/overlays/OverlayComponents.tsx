import React, { useEffect, useRef, useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';

// 1. Modal
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  className = '',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeMap = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full m-4 h-[calc(100vh-2rem)]',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${sizeMap[size]} bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-2xl flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <div className="px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                {title}
              </h3>
              {description && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="p-5 overflow-y-auto max-h-[75vh] flex-1">{children}</div>

        {footer && (
          <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Dialog (Alert / Prompt Dialog)
export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message?: string;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title={title}
      footer={
        <>
          {onConfirm && (
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              {cancelLabel}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              isDestructive
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold'
                : 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
            }`}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      {message && (
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2">
          {message}
        </p>
      )}
      {children}
    </Modal>
  );
};

// 3. Drawer
export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'bottom';
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  className = '',
}) => {
  if (!isOpen) return null;

  const positionStyles = {
    right: 'top-0 right-0 bottom-0 w-80 sm:w-96 border-l',
    left: 'top-0 left-0 bottom-0 w-80 sm:w-96 border-r',
    bottom: 'bottom-0 left-0 right-0 max-h-[80vh] border-t rounded-t-xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div
        className={`fixed bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col z-10 transition-transform ${positionStyles[position]} ${className}`}
      >
        <div className="p-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

// 4. Popover
export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  align = 'left',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div
          className={`absolute top-full mt-1.5 z-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-3 animate-in fade-in zoom-in-95 min-w-[180px] ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

// 5. Tooltip
export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, className = '' }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-[11px] font-medium rounded shadow-md whitespace-nowrap z-50 pointer-events-none animate-in fade-in">
          {content}
        </div>
      )}
    </div>
  );
};

// 6. ContextMenu
export interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  children: React.ReactNode;
  className?: string;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ items, children, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setVisible(true);
  };

  useEffect(() => {
    const handleOutside = () => setVisible(false);
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, []);

  return (
    <div onContextMenu={handleContextMenu} className={className}>
      {children}
      {visible && (
        <div
          className="fixed z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-xl py-1 w-44 text-xs"
          style={{ top: position.y, left: position.x }}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              disabled={item.disabled}
              onClick={() => {
                item.onClick();
                setVisible(false);
              }}
              className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40"
            >
              {item.icon && <span className="w-3.5 h-3.5">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// 7. CommandPalette
export interface CommandPaletteAction {
  id: string;
  title: string;
  category?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  actions: CommandPaletteAction[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  actions,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = actions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase()) ||
    (act.category && act.category.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95">
        <div className="flex items-center px-4 border-b border-zinc-200 dark:border-zinc-800">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full px-3 py-3 text-xs sm:text-sm bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
            autoFocus
          />
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
            ESC
          </kbd>
        </div>

        <div className="p-1.5 max-h-72 overflow-y-auto space-y-0.5">
          {filtered.length === 0 ? (
            <p className="text-center py-6 text-xs text-zinc-400">No matching commands found</p>
          ) : (
            filtered.map((act) => (
              <button
                key={act.id}
                onClick={() => {
                  act.onSelect();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-left transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  {act.icon ? (
                    <span className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                      {act.icon}
                    </span>
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  )}
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{act.title}</span>
                    {act.category && (
                      <span className="ml-2 text-[10px] text-zinc-400 font-mono">
                        · {act.category}
                      </span>
                    )}
                  </div>
                </div>
                {act.shortcut && (
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                    {act.shortcut}
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// 8. Sheet (Bottom/Side Sheet Panel)
export interface SheetProps extends DrawerProps {}

export const Sheet: React.FC<SheetProps> = (props) => {
  return <Drawer {...props} />;
};

