import { useMemo, useState } from "react";
import { Calendar } from "react-big-calendar";
import { localizer } from "~/util/calendarFns";
import CloseButton from "./CloseButton";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface CalendarEvent {
  title: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  location?: string;
  eventUrl?: string;
}

interface EventCalendarProps {
  events: CalendarEvent[];
}

export default function EventCalendar({ events }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const today = useMemo(() => new Date(), []);
  const minMonth = today.getMonth();
  const minYear = today.getFullYear();

  const handleNavigate = (nextDate: Date) => {
    const year = nextDate.getFullYear();
    const month = nextDate.getMonth();

    if (year < minYear || (year === minYear && month < minMonth)) {
      // Disallow navigating to months before the current month
      setCurrentDate(today);
      return;
    }

    setCurrentDate(nextDate);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const Toolbar = (toolbarProps: {
    label: string;
    onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
  }) => {
    const { label } = toolbarProps;

    const isAtMinMonth =
      currentDate.getFullYear() === minYear && currentDate.getMonth() === minMonth;

    const handlePrev = () => {
      if (isAtMinMonth) return;
      toolbarProps.onNavigate("PREV");
    };

    const handleNext = () => {
      toolbarProps.onNavigate("NEXT");
    };

    const handleToday = () => {
      toolbarProps.onNavigate("TODAY");
    };

    return (
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToday}
            className="rounded border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Today
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isAtMinMonth}
            className="rounded border border-slate-300 px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ‹
          </button>
          <span className="text-sm font-semibold text-slate-800">{label}</span>
          <button
            type="button"
            onClick={handleNext}
            className="rounded border border-slate-300 px-2 py-1 text-sm text-slate-700 hover:bg-slate-100"
          >
            ›
          </button>
        </div>
      </div>
    );
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="relative">
      <div className="h-150">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          onNavigate={handleNavigate}
          onSelectEvent={handleSelectEvent}
          defaultView="month"
          views={["month"]}
          components={{ toolbar: Toolbar }}
          style={{ height: "100%" }}
        />
      </div>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={handleClose}
        >
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <CloseButton onClick={handleClose} />

            <h2 className="mb-2 text-xl font-semibold text-slate-900">{selectedEvent.title}</h2>

            <p className="mb-1 text-sm font-medium text-slate-600">
              {selectedEvent.end && selectedEvent.end.getTime() !== selectedEvent.start.getTime()
                ? `${selectedEvent.start.toLocaleDateString()} – ${selectedEvent.end.toLocaleDateString()}`
                : selectedEvent.start.toLocaleDateString()}
            </p>

            {selectedEvent.location && (
              <p className="mb-3 text-sm text-slate-700">{selectedEvent.location}</p>
            )}

            {selectedEvent.eventUrl && (
              <a
                href={selectedEvent.eventUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
              >
                View Details
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
