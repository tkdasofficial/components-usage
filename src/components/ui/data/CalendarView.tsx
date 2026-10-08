import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { CalendarEvent } from '../../../types';

export interface CalendarViewProps {
  events: CalendarEvent[];
  onSelectDate?: (date: string) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onSelectEvent?: (event: CalendarEvent) => void;
  className?: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onSelectDate,
  onEventClick,
  onSelectEvent,
  className = '',
}) => {
  const handleEventClick = onEventClick || onSelectEvent;
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // October
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-09');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const getEventsForDay = (day: number) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
    return events.filter((e) => e.date === dateStr);
  };

  return (
    <div className={`rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs ${className}`}>
      {/* Calendar Header Controls */}
      <div className="p-3.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-zinc-500" />
          <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
            {monthNames[currentMonth]} {currentYear}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrev}
            className="p-1 rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setCurrentYear(2026);
              setCurrentMonth(9);
            }}
            className="px-2.5 py-1 text-xs font-medium rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            Today
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="p-1 rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 border-b border-zinc-200 dark:border-zinc-800 text-center bg-zinc-50 dark:bg-zinc-900/60 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 py-1.5">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Month Grid */}
      <div className="grid grid-cols-7 divide-x divide-y divide-zinc-200 dark:divide-zinc-800/70 border-b border-zinc-200 dark:border-zinc-800">
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`blank-${idx}`} className="h-20 sm:h-24 bg-zinc-50/40 dark:bg-zinc-900/20" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const formattedMonth = String(currentMonth + 1).padStart(2, '0');
          const formattedDay = String(day).padStart(2, '0');
          const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
          const isSelected = selectedDate === dateStr;
          const isToday = currentYear === 2026 && currentMonth === 9 && day === 8;
          const dayEvents = getEventsForDay(day);

          return (
            <div
              key={day}
              onClick={() => {
                setSelectedDate(dateStr);
                onSelectDate?.(dateStr);
              }}
              className={`h-20 sm:h-24 p-1.5 cursor-pointer transition-colors relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-zinc-100/70 dark:bg-zinc-900/80'
                  : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-mono font-medium inline-flex items-center justify-center w-5 h-5 rounded-full ${
                    isToday
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold'
                      : 'text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  {day}
                </span>
                {dayEvents.length > 0 && (
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {dayEvents.length}
                  </span>
                )}
              </div>

              <div className="space-y-1 overflow-hidden mt-0.5">
                {dayEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick?.(evt);
                    }}
                    className="px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-[10px] text-zinc-900 dark:text-zinc-100 truncate border border-zinc-300/40 dark:border-zinc-700/50 hover:border-zinc-500"
                    title={evt.title}
                  >
                    {evt.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
