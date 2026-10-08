import React, { useState, useRef, useEffect } from 'react';
import {
  Check,
  ChevronDown,
  X,
  Search,
  UploadCloud,
  File,
  Calendar as CalendarIcon,
  Clock,
  Star,
} from 'lucide-react';

// 1. Input
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 select-none"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-zinc-400 pointer-events-none w-4 h-4 flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          disabled={disabled}
          className={`w-full px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-zinc-900 border rounded-md text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
            leftIcon ? 'pl-8' : ''
          } ${rightIcon ? 'pr-8' : ''} ${
            error
              ? 'border-zinc-900 dark:border-zinc-100 focus:ring-zinc-900 dark:focus:ring-zinc-100'
              : 'border-zinc-300 dark:border-zinc-700 focus:border-zinc-500 dark:focus:border-zinc-400 focus:ring-zinc-400'
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-zinc-400 pointer-events-none w-4 h-4 flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </div>
      {error ? (
        <p className="text-[11px] text-zinc-900 dark:text-zinc-100 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{helperText}</p>
      ) : null}
    </div>
  );
};

// 2. Textarea
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  showCount = false,
  maxLength,
  value,
  className = '',
  disabled,
  id,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between items-center">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {label}
          </label>
        )}
        {showCount && maxLength && (
          <span className="text-[10px] font-mono tabular-nums text-zinc-400">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={textareaId}
        disabled={disabled}
        maxLength={maxLength}
        value={value}
        rows={3}
        className={`w-full px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-zinc-900 border rounded-md text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed resize-y ${
          error
            ? 'border-zinc-900 dark:border-zinc-100 focus:ring-zinc-900'
            : 'border-zinc-300 dark:border-zinc-700 focus:border-zinc-500 dark:focus:border-zinc-400 focus:ring-zinc-400'
        } ${className}`}
        {...props}
      />
      {error ? (
        <p className="text-[11px] text-zinc-900 dark:text-zinc-100 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{helperText}</p>
      ) : null}
    </div>
  );
};

// 3. Select
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  className = '',
  disabled,
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          className={`w-full appearance-none px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-zinc-900 border rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 pr-8 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
            error
              ? 'border-zinc-900 dark:border-zinc-100'
              : 'border-zinc-300 dark:border-zinc-700 focus:border-zinc-500 dark:focus:border-zinc-400'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {error ? (
        <p className="text-[11px] text-zinc-900 dark:text-zinc-100 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{helperText}</p>
      ) : null}
    </div>
  );
};

// 4. Combobox
export interface ComboboxProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  error,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className={`w-full space-y-1 relative ${className}`} ref={wrapperRef}>
      {label && (
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-zinc-900 border rounded-md text-zinc-900 dark:text-zinc-100 flex items-center justify-between text-left transition-all ${
          error ? 'border-zinc-900 dark:border-zinc-100' : 'border-zinc-300 dark:border-zinc-700'
        }`}
      >
        <span className={selectedOption ? '' : 'text-zinc-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-xl z-50 p-1 animate-in fade-in zoom-in-95">
          <div className="relative mb-1">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter..."
              className="w-full pl-7 pr-2 py-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-900 dark:text-zinc-100 focus:outline-none"
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {filtered.length === 0 ? (
              <p className="text-center py-2 text-xs text-zinc-400">No match</p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    setQuery('');
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between ${
                    opt.value === value
                      ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-950 dark:text-white'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <span>{opt.label}</span>
                  {opt.value === value && <Check className="w-3.5 h-3.5" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 5. MultiSelect
export interface MultiSelectProps {
  label?: string;
  options: SelectOption[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  values,
  onChange,
  placeholder = 'Select items...',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggle = (val: string) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
  };

  return (
    <div className={`w-full space-y-1 relative ${className}`} ref={wrapperRef}>
      {label && (
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}
      <div
        onClick={() => setOpen(!open)}
        className="min-h-[34px] px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md flex flex-wrap items-center gap-1 cursor-pointer"
      >
        {values.length === 0 ? (
          <span className="text-xs text-zinc-400">{placeholder}</span>
        ) : (
          values.map((v) => {
            const opt = options.find((o) => o.value === v);
            return (
              <span
                key={v}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-medium"
              >
                <span>{opt ? opt.label : v}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(v);
                  }}
                  className="hover:text-black dark:hover:text-white"
                >
                  <X className="w-3 h-3" />
                </span>
              </span>
            );
          })
        )}
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-xl z-50 p-1">
          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {options.map((opt) => {
              const isSelected = values.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggle(opt.value)}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-950 dark:text-white'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// 6. Checkbox
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  className = '',
  id,
  checked,
  ...props
}) => {
  const checkboxId = id || Math.random().toString(36).substring(7);

  return (
    <div className={`flex items-start gap-2 select-none ${className}`}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        className="mt-0.5 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 focus:ring-zinc-400 dark:bg-zinc-900 h-3.5 w-3.5 shrink-0"
        {...props}
      />
      {label && (
        <div className="text-xs">
          <label htmlFor={checkboxId} className="font-medium text-zinc-900 dark:text-zinc-100 cursor-pointer">
            {label}
          </label>
          {description && (
            <p className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// 7. RadioGroup
export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  name?: string;
  label?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name = 'radio-group',
  label,
  options,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}
      <div className="space-y-1.5">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-start gap-2.5 p-2 rounded-md border cursor-pointer transition-colors ${
              opt.value === value
                ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50/50 dark:bg-zinc-900/60'
                : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={opt.value === value}
              onChange={() => onChange(opt.value)}
              className="mt-0.5 border-zinc-300 dark:border-zinc-700 text-zinc-900 focus:ring-zinc-400 dark:bg-zinc-900 shrink-0"
            />
            <div className="text-xs">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{opt.label}</span>
              {opt.description && (
                <p className="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">{opt.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

// 8. Switch
export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between gap-3 select-none ${className}`}>
      {label && (
        <div className="text-xs">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{label}</span>
          {description && (
            <p className="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">{description}</p>
          )}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`w-8 h-4.5 flex items-center rounded-full p-0.5 transition-colors focus:outline-none shrink-0 ${
          checked ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-300 dark:bg-zinc-700'
        } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div
          className={`bg-white dark:bg-zinc-900 w-3.5 h-3.5 rounded-full shadow-xs transform transition-transform ${
            checked ? 'translate-x-3.5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

// 9. Slider
export interface SliderProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange,
  className = '',
}) => {
  return (
    <div className={`w-full space-y-1 ${className}`}>
      <div className="flex justify-between items-center text-xs">
        {label && <span className="font-medium text-zinc-700 dark:text-zinc-300">{label}</span>}
        <span className="font-mono tabular-nums text-zinc-900 dark:text-zinc-100 font-semibold">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-zinc-100"
      />
    </div>
  );
};

// 10. DatePicker & DateRangePicker
export interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`w-full space-y-1 ${className}`}>
      {label && <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</label>}
      <div className="relative flex items-center">
        <CalendarIcon className="w-3.5 h-3.5 absolute left-3 text-zinc-400 pointer-events-none" />
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:border-zinc-500"
        />
      </div>
    </div>
  );
};

export interface DateRangePickerProps {
  label?: string;
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  startDate,
  endDate,
  onChange,
  className = '',
}) => {
  return (
    <div className={`w-full space-y-1 ${className}`}>
      {label && <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</label>}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => onChange(e.target.value, endDate)}
          className="flex-1 px-2.5 py-1 text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none"
        />
        <span className="text-zinc-400 text-xs">to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onChange(startDate, e.target.value)}
          className="flex-1 px-2.5 py-1 text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none"
        />
      </div>
    </div>
  );
};

// 11. TimePicker
export interface TimePickerProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`w-full space-y-1 ${className}`}>
      {label && <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</label>}
      <div className="relative flex items-center">
        <Clock className="w-3.5 h-3.5 absolute left-3 text-zinc-400 pointer-events-none" />
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none"
        />
      </div>
    </div>
  );
};

// 12. FileUpload
export interface FileUploadProps {
  label?: string;
  onUpload?: (files: FileList | null) => void;
  onFilesSelected?: (files: File[]) => void;
  maxSizeMb?: number;
  accept?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onUpload,
  onFilesSelected,
  maxSizeMb = 25,
  accept,
  className = '',
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setSelectedFileName(fileList[0].name);
    onUpload?.(fileList);
    onFilesSelected?.(Array.from(fileList));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <div className={`w-full space-y-1 ${className}`}>
      {label && <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</label>}
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          dragOver
            ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800'
            : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white/40 dark:bg-zinc-900/40'
        }`}
      >
        <UploadCloud className="w-5 h-5 text-zinc-400 mb-1.5" />
        {selectedFileName ? (
          <div className="flex items-center gap-1.5 text-xs text-zinc-900 dark:text-zinc-100 font-medium">
            <File className="w-3.5 h-3.5" />
            <span>{selectedFileName}</span>
          </div>
        ) : (
          <>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
              Click to browse or drop files here
            </p>
            <p className="text-[10px] text-zinc-400 mt-0.5">SVG, PNG, JPG, PDF up to {maxSizeMb}MB</p>
          </>
        )}
        <input type="file" accept={accept} onChange={handleChange} className="hidden" />
      </label>
    </div>
  );
};

// 13. SearchInput
export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
  ...props
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="w-3.5 h-3.5 absolute left-3 text-zinc-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-8 pr-7 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400"
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

// 14. PinInput (React 19 void return fix)
export interface PinInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export const PinInput: React.FC<PinInputProps> = ({
  length = 6,
  value,
  onChange,
  className = '',
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleCharChange = (index: number, char: string) => {
    if (!/^\d*$/.test(char)) return;
    const chars = value.split('');
    chars[index] = char.slice(-1);
    const newVal = chars.join('').padEnd(length, ' ').slice(0, length);
    onChange(newVal.trim());

    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          type="text"
          maxLength={1}
          value={value[idx] || ''}
          onChange={(e) => handleCharChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          className="w-9 h-10 text-center font-mono font-bold text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
        />
      ))}
    </div>
  );
};

// 15. Rating
export interface RatingProps {
  value: number;
  max?: number;
  onChange?: (val: number) => void;
  readOnly?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  onChange,
  readOnly = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: max }).map((_, idx) => {
        const starNum = idx + 1;
        const isFilled = starNum <= value;

        return (
          <button
            key={idx}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(starNum)}
            className={`p-0.5 ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-105'} transition-transform`}
          >
            <Star
              className={`w-3.5 h-3.5 ${
                isFilled
                  ? 'text-zinc-900 dark:text-zinc-100 fill-zinc-900 dark:fill-zinc-100'
                  : 'text-zinc-300 dark:text-zinc-700'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
