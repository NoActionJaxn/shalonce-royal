import { useState } from "react";
import { formatDate } from "~/util/formatDate";
import EventCard from "./EventCard";

export interface EventList {
  title?: string;
  events: {
    title: string;
    start: Date;
    end?: Date;
    allDay?: boolean;
    location?: string;
    eventUrl?: string;
  }[];
}

export default function EventList({ title, events = [] }: EventList) {
  const [visibleCount, setVisibleCount] = useState(3);

  const visibleEvents = events.slice(0, visibleCount);
  const canShowMore = events.length > visibleCount;

  return (
    <div className="space-y-4">
      <section aria-label="Upcoming events list" className="space-y-4">
        {title && <h2 className="px-2 text-2xl font-bold">{title}</h2>}
        <div className="space-y-4">
          {visibleEvents.map((event) => {
            const start = formatDate(event.start);
            const end = event.end ? formatDate(event.end) : undefined;

            return (
              <EventCard
                key={`${event.title}-${start}`}
                title={event.title}
                start={start}
                end={end}
                location={event.location}
                eventUrl={event.eventUrl}
              />
            );
          })}
        </div>
        {canShowMore && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(prev + 3, events.length))}
              className="inline-flex items-center justify-center bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Show more
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
