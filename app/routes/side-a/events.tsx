import { useLoaderData } from "react-router";
import Container from "~/components/Container";
import Page from "~/components/Page";
import {
  WRESTLING_SITE_SETTINGS_REQUEST,
  WRESTLING_SITE_EVENTS_PAGE_REQUEST,
} from "~/constants/requests";
import { getSanityClient } from "~/lib/client";
import RichText from "~/components/RichText";
import EventCalendar from "~/components/EventCalendar";
import type { WrestlingSiteSettings, WrestlingEventsPage, WrestlingEvent } from "~/types/sanity";
import type { Route } from "./+types/events";
import EventList from "~/components/EventList";

interface LoaderData {
  siteTitle: string;
  pageTitle: string;
  title?: string;
  description?: WrestlingEventsPage["content"];
  events?: WrestlingEventsPage["upcomingEvents"];
}

export async function loader() {
  try {
    const client = getSanityClient();

    const settings: WrestlingSiteSettings = await client.fetch(WRESTLING_SITE_SETTINGS_REQUEST);
    const eventsPage: WrestlingEventsPage = await client.fetch(WRESTLING_SITE_EVENTS_PAGE_REQUEST);

    const siteTitle = settings?.title;
    const pageTitle = eventsPage?.pageTitle;
    const title = eventsPage?.title;
    const description = eventsPage?.content;
    const events = eventsPage?.upcomingEvents;

    return { siteTitle, pageTitle, title, description, events };
  } catch {
    return {
      siteTitle: undefined,
      pageTitle: undefined,
      title: undefined,
      description: undefined,
      events: undefined,
    };
  }
}

export const meta: Route.MetaFunction = ({ data }) => {
  const siteTitle = data?.siteTitle ?? "Shalancé Royal";
  const pageTitle = data?.pageTitle ?? "Events";
  return [{ title: `${siteTitle} | ${pageTitle}` }];
};

export default function Events() {
  const data = useLoaderData<LoaderData>();
  const title = data?.title;
  const description = data?.description;
  const events = data?.events;

  const calendarEvents = (events ?? []).map((event: WrestlingEvent) => ({
    title: event.eventTitle,
    start: new Date(event.eventStartDate),
    end: new Date(event.eventEndDate ?? event.eventStartDate),
    allDay: !event.eventEndDate,
    location: event.eventLocation,
    eventUrl: event.eventUrl,
  }));

  return (
    <Page>
      <Container className="py-16 space-y-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{title}</h1>
          <RichText value={description ?? []} />
        </div>
        <EventCalendar events={calendarEvents} />
        {calendarEvents.length > 0 ? (
          <EventList title="Upcoming Events" events={calendarEvents} />
        ) : (
          <p className="py-12 text-center text-slate-400">No upcoming events scheduled.</p>
        )}
      </Container>
    </Page>
  );
}
