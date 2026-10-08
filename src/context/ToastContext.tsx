import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toastOrTitle: Omit<ToastItem, 'id'> | string, type?: ToastType) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toastOrTitle: Omit<ToastItem, 'id'> | string, toastType: ToastType = 'info') => {
      const id = Math.random().toString(36).substring(2, 9);
      let newToast: ToastItem;

      if (typeof toastOrTitle === 'string') {
        newToast = { id, title: toastOrTitle, type: toastType, duration: 3500 };
      } else {
        newToast = {
          id,
          title: toastOrTitle.title,
          message: toastOrTitle.message,
          type: toastOrTitle.type || 'info',
          duration: toastOrTitle.duration ?? 3500,
        };
      }

      setToasts((prev) => [...prev, newToast]);

      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, newToast.duration);
      }
      return id;
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-2"
        role="region"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-lg transition-all animate-in fade-in slide-in-from-bottom-2 text-xs"
          >
            <div className="shrink-0 mt-0.5 text-zinc-900 dark:text-zinc-100">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4" />}
              {toast.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
              {toast.type === 'info' && <Info className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">{toast.title}</p>
              {toast.message && (
                <p className="text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-0.5 rounded"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
