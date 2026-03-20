import { useLoaderData } from "react-router";
import Page from "~/components/Page";
import {
  WRESTLING_SITE_HOME_PAGE_REQUEST,
  WRESTLING_SITE_MATCHES_REQUEST,
  WRESTLING_SITE_SETTINGS_REQUEST,
  WRESTLING_SITE_EVENTS_PAGE_REQUEST,
} from "~/constants/requests";
import { getSanityClient } from "~/lib/client";
import Hero from "~/components/Hero";
import Accolades from "~/components/Accolades";
import type {
  SanityBlock,
  WrestlingEvent,
  WrestlingEventsPage,
  WrestlingHomePage,
  WrestlingMatch,
  WrestlingSiteSettings,
} from "~/types/sanity";
import type { Route } from "./+types/home";
import Container from "~/components/Container";
import MatchCard from "~/components/MatchCard";
import { LinkButton } from "~/components/Buttons";
import EventList from "~/components/EventList";

interface LoaderData {
  siteTitle: string;
  pageTitle: string;
  hero: {
    title: string;
    subTitle: string;
    content: SanityBlock[];
    backgroundImage?: WrestlingHomePage["heroBackgroundImage"];
  };
  accolades: WrestlingHomePage["accolades"];
  matches: WrestlingMatch[];
  events: {
    title: string;
    start: Date;
    end?: Date;
    allDay?: boolean;
    location?: string;
    eventUrl?: string;
  }[];
}

export async function loader() {
  try {
    const client = getSanityClient();

    const settings: WrestlingSiteSettings = await client.fetch(WRESTLING_SITE_SETTINGS_REQUEST);
    const home: WrestlingHomePage = await client.fetch(WRESTLING_SITE_HOME_PAGE_REQUEST);
    const matches: WrestlingMatch[] = await client.fetch(WRESTLING_SITE_MATCHES_REQUEST);
    const events: WrestlingEventsPage = await client.fetch(WRESTLING_SITE_EVENTS_PAGE_REQUEST);

    const siteTitle = settings?.title;
    const pageTitle = home?.pageTitle;

    const eventList =
      events?.upcomingEvents?.map((event: WrestlingEvent) => ({
        title: event.eventTitle,
        start: new Date(event.eventStartDate),
        end: new Date(event.eventEndDate ?? event.eventStartDate),
        allDay: !event.eventEndDate,
        location: event.eventLocation,
        eventUrl: event.eventUrl,
      })) || [];

    const hero = {
      title: home?.heroTitle,
      subTitle: home?.heroSubtitle,
      content: home?.heroContent,
      backgroundImage: home?.heroBackgroundImage,
    };

    return { siteTitle, pageTitle, hero, accolades: home?.accolades, matches, events: eventList };
  } catch {
    return {
      siteTitle: undefined,
      pageTitle: undefined,
      hero: { title: "", subTitle: "", content: [], backgroundImage: undefined },
      accolades: [],
      matches: [],
      events: [],
    };
  }
}

export const meta: Route.MetaFunction = ({ data }) => {
  const siteTitle = data?.siteTitle ?? "Shaloncé Royal";
  const pageTitle = data?.pageTitle ?? "Home";
  return [{ title: `${siteTitle} | ${pageTitle}` }];
};

export default function Home() {
  const data = useLoaderData<LoaderData>();
  const hero = data?.hero;
  const accolades = data?.accolades ?? [];
  const matches = data?.matches?.slice(0, 3) ?? [];
  const events = data?.events ?? [];

  return (
    <Page noPadding>
      <Hero
        backgroundImage={hero?.backgroundImage}
        title={hero?.title}
        subTitle={hero?.subTitle}
        content={hero?.content}
        className="pt-16 bg-black text-white"
        data-dark
      />
      <Accolades title="Accolades" className="bg-amber-300" accolades={accolades} />
      <Container className="py-8 space-y-4">
        <h2 className="px-2 text-2xl font-bold">Recent Matches</h2>
        {matches.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {matches.map((match) => (
              <MatchCard
                key={match.slug.current}
                slug={match.slug}
                title={match.matchTitle}
                date={match.matchDate}
                description={match.matchDescription}
                images={match.matchImages}
              />
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-slate-500">No recent matches to show.</p>
        )}
        <div className="flex justify-end">
          <LinkButton to="/side-a/matches" className="text-sm font-medium">
            View More
          </LinkButton>
        </div>
      </Container>
      <hr className="mx-16 my-8 border-gray-300" />
      <Container className="space-y-8">
        {events.length > 0 ? (
          <>
            <div>
              <EventList title="Upcoming Events" events={events} />
            </div>
            <div className="flex justify-end">
              <LinkButton to="/side-a/events" className="text-sm font-medium">
                View More
              </LinkButton>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <p className="py-8 text-center text-slate-500">No upcoming events scheduled.</p>
          </div>
        )}
      </Container>
    </Page>
  );
}
