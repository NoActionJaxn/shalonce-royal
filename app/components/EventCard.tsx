import { Link } from "react-router";

export interface EventCard {
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  location?: string;
  eventUrl?: string;
}

export default function EventCard({ title, start, end, location, eventUrl }: EventCard) {
  const dateLabel = end ? `${start} – ${end}` : start;

  const CardContent = (
    <article
      key={`${title}-${start}`}
      className="flex flex-col gap-4 border border-slate-200 bg-white p-4 shadow-sm transition-shadow md:flex-row md:items-center hover:shadow-md"
    >
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-slate-500">{dateLabel}</p>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {location && <p className="text-sm text-slate-600">{location}</p>}
      </div>
    </article>
  );

  if (eventUrl) {
    return (
      <Link
        to={eventUrl}
        target="_blank"
        rel="noreferrer"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      >
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
