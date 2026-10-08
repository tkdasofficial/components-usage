import React, { useState } from 'react';
import {
  PageHeader,
  CalendarView,
  Card,
  Badge,
  Button,
  Modal,
  Input,
  Select,
} from '../components/ui';
import { mockCalendarEvents } from '../data/mockData';
import { CalendarEvent } from '../types';
import { Plus, Calendar, Clock, MapPin, Users } from 'lucide-react';

export const CalendarViewSection: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('2026-10-15');
  const [newCategory, setNewCategory] = useState<CalendarEvent['category']>('meeting');
  const [newTime, setNewTime] = useState('10:00 AM');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEv: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title: newTitle,
      date: newDate,
      time: newTime,
      category: newCategory,
    };

    setEvents([...events, newEv]);
    setNewTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calendar & Milestones"
        description="Schedule sprints, product releases, design reviews, and engineering standups."
        breadcrumbs={[
          { label: 'Workspace', href: '#' },
          { label: 'Calendar' },
        ]}
        actions={
          <Button
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Event
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar Grid (2 Cols) */}
        <div className="lg:col-span-2">
          <CalendarView
            events={events}
            onSelectDate={(d) => console.log('Selected date:', d)}
            onSelectEvent={(ev) => setSelectedEvent(ev)}
          />
        </div>

        {/* Upcoming events sidebar (1 Col) */}
        <div className="space-y-4">
          <Card
            header={
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                  Upcoming Events
                </h3>
                <Badge variant="outline" size="sm">{events.length} Scheduled</Badge>
              </div>
            }
          >
            <div className="space-y-3">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEvent(ev)}
                  className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 hover:border-zinc-400 dark:hover:border-zinc-700 cursor-pointer transition-all space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      {ev.title}
                    </span>
                    <Badge
                      size="sm"
                      variant={
                        ev.category === 'release'
                          ? 'success'
                          : ev.category === 'sprint'
                          ? 'primary'
                          : 'outline'
                      }
                    >
                      {ev.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {ev.date}
                    </span>
                    {ev.time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ev.time}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Add Event Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Event"
        description="Add a milestone, meeting, or release date to the calendar."
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Event Title"
            placeholder="e.g. Sprint 15 Retro & Planning"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <Input
              label="Time"
              placeholder="e.g. 2:00 PM EST"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </div>
          <Select
            label="Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as any)}
            options={[
              { value: 'meeting', label: 'Meeting' },
              { value: 'sprint', label: 'Sprint' },
              { value: 'release', label: 'Release' },
              { value: 'milestone', label: 'Milestone' },
            ]}
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule</Button>
          </div>
        </form>
      </Modal>

      {/* Detail Modal */}
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.title}
          description={`Category: ${selectedEvent.category.toUpperCase()}`}
        >
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <Calendar className="w-4 h-4" />
              <span>Date: {selectedEvent.date}</span>
            </div>
            {selectedEvent.time && (
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <Clock className="w-4 h-4" />
                <span>Time: {selectedEvent.time}</span>
              </div>
            )}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
              <Button onClick={() => setSelectedEvent(null)}>Done</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
