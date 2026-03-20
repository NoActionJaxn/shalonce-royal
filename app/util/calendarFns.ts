import { dateFnsLocalizer } from "react-big-calendar";

export const locales = {
  "en-US": undefined,
};

// Minimal helpers so we can use react-big-calendar without pulling in date-fns
// We inspect the format string to approximate the expected output shape.
export function basicFormat(date: Date, formatStr: string, culture?: string) {
  const locale = culture || "en-US";

  // Weekday headers (e.g., Mon, Tue)
  if (formatStr.includes("ccc") || formatStr.includes("EEE")) {
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
  }

  // Day-of-month labels inside each square
  if (
    formatStr === "d" ||
    formatStr === "dd" ||
    (formatStr.includes("d") && !formatStr.includes("M") && !formatStr.includes("y"))
  ) {
    return String(date.getDate());
  }

  // Month header like "January 2026"
  if (formatStr.includes("MMM")) {
    return new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    }).format(date);
  }

  // Fallback: localized full date
  return new Intl.DateTimeFormat(locale).format(date);
}

export function basicParse(value: string) {
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date() : d;
}

export function basicStartOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diff = (day + 7 - 0) % 7; // week starts on Sunday
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function basicGetDay(date: Date) {
  return date.getDay();
}

export const localizer = dateFnsLocalizer({
  format: basicFormat,
  parse: basicParse,
  startOfWeek: basicStartOfWeek,
  getDay: basicGetDay,
  locales,
});
