import React from 'react';
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

// 1. Alert
export interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  onDismiss?: () => void;
  action?: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  title,
  children,
  variant = 'info',
  onDismiss,
  action,
  className = '',
}) => {
  const iconMap = {
    info: <Info className="w-4 h-4 shrink-0 text-zinc-900 dark:text-zinc-100" />,
    success: <CheckCircle2 className="w-4 h-4 shrink-0 text-zinc-900 dark:text-zinc-100" />,
    warning: <AlertTriangle className="w-4 h-4 shrink-0 text-zinc-900 dark:text-zinc-100" />,
    error: <AlertCircle className="w-4 h-4 shrink-0 text-zinc-900 dark:text-zinc-100" />,
  };

  return (
    <div
      role="alert"
      className={`p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex items-start justify-between gap-3 text-xs ${className}`}
    >
      <div className="flex items-start gap-2.5 flex-1">
        <span className="mt-0.5">{iconMap[variant]}</span>
        <div className="space-y-0.5 flex-1">
          {title && (
            <h5 className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</h5>
          )}
          <div className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{children}</div>
          {action && <div className="pt-2">{action}</div>}
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          aria-label="Dismiss alert"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

// 2. Banner
export interface BannerProps {
  message: string;
  actionText?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const Banner: React.FC<BannerProps> = ({
  message,
  actionText,
  onAction,
  onDismiss,
  className = '',
}) => {
  return (
    <div
      className={`w-full py-2 px-4 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs flex items-center justify-between gap-4 font-medium ${className}`}
    >
      <div className="flex-1 flex items-center justify-center gap-2 truncate">
        <span className="truncate">{message}</span>
        {actionText && onAction && (
          <button
            onClick={onAction}
            className="underline underline-offset-2 hover:opacity-80 font-bold shrink-0 inline-flex items-center gap-1"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-0.5 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

// 3. ErrorState
export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected invariant error occurred while processing this request.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center max-w-md mx-auto my-6 space-y-2.5 ${className}`}>
      <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-900 dark:text-zinc-100">
        <AlertCircle className="w-4.5 h-4.5" />
      </div>
      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{title}</h4>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Retry Operation</span>
        </button>
      )}
    </div>
  );
};

// 4. SuccessState
export interface SuccessStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title = 'Action Completed Successfully',
  message = 'Your updates have been applied to workspace resources.',
  actionText = 'Continue',
  onAction,
  className = '',
}) => {
  return (
    <div className={`p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center max-w-md mx-auto my-6 space-y-2.5 ${className}`}>
      <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-900 dark:text-zinc-100">
        <CheckCircle2 className="w-4.5 h-4.5" />
      </div>
      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{title}</h4>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{message}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

// 5. ProgressIndicator (Multi-Step Tracker)
export interface StepItem {
  id: string;
  title: string;
  description?: string;
}

export interface ProgressIndicatorProps {
  steps: StepItem[];
  currentStepIndex: number;
  onSelectStep?: (index: number) => void;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between gap-2 overflow-x-auto pb-1 ${className}`}>
      {steps.map((step, idx) => {
        const isDone = idx < currentStepIndex;
        const isCurrent = idx === currentStepIndex;

        return (
          <React.Fragment key={step.id}>
            <div
              onClick={() => onSelectStep?.(idx)}
              className={`flex items-center gap-2 cursor-pointer group min-w-fit ${
                onSelectStep ? '' : 'pointer-events-none'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                  isDone
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                    : isCurrent
                    ? 'border-2 border-zinc-900 text-zinc-900 dark:border-white dark:text-white'
                    : 'border border-zinc-300 dark:border-zinc-700 text-zinc-400'
                }`}
              >
                {isDone ? '✓' : idx + 1}
              </div>
              <span
                className={`text-xs font-medium ${
                  isCurrent
                    ? 'text-zinc-900 dark:text-zinc-100 font-bold'
                    : isDone
                    ? 'text-zinc-700 dark:text-zinc-300'
                    : 'text-zinc-400'
                }`}
              >
                {step.title}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 min-w-[16px] ${
                  idx < currentStepIndex ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// 6. WarningState
export interface WarningStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const WarningState: React.FC<WarningStateProps> = ({
  title = 'Attention Required',
  message = 'Please review pending actions before proceeding.',
  actionText = 'Review',
  onAction,
  className = '',
}) => {
  return (
    <div className={`p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center max-w-md mx-auto my-6 space-y-2.5 ${className}`}>
      <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-900 dark:text-zinc-100">
        <AlertTriangle className="w-4.5 h-4.5" />
      </div>
      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{title}</h4>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{message}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

// 7. ConfirmationDialog
export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95 space-y-4">
        <div className="space-y-1.5">
          <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">{title}</h3>
          {description && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg text-white transition-colors ${
              variant === 'danger'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-zinc-900 dark:bg-white dark:text-zinc-950'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

