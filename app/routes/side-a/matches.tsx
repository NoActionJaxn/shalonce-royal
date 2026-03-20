import { Link, useLoaderData } from "react-router";
import Container from "~/components/Container";
import Page from "~/components/Page";
import RichText from "~/components/RichText";
import Image from "~/components/Image";
import { WRESTLING_SITE_SETTINGS_REQUEST, WRESTLING_SITE_MATCHES_PAGE_REQUEST, WRESTLING_SITE_MATCHES_REQUEST } from "~/constants/requests";
import { getSanityClient } from "~/lib/client";
import type { WrestlingSiteSettings, WrestlingMatchesPage, WrestlingMatch } from "~/types/sanity";
import type { Route } from "./+types/matches";
import { formatDate } from "~/util/formatDate";
import MatchCard from "~/components/MatchCard";

interface LoaderData {
  siteTitle: string;
  pageTitle: string;
  matchData: {
    title?: string;
    content?: WrestlingMatchesPage["content"];
  };
  matches: WrestlingMatch[];
}

export async function loader() {
  try {
    const client = getSanityClient();

    const settings: WrestlingSiteSettings = await client.fetch(WRESTLING_SITE_SETTINGS_REQUEST);
    const matchPage: WrestlingMatchesPage = await client.fetch(WRESTLING_SITE_MATCHES_PAGE_REQUEST);
    const matches: WrestlingMatch[] = await client.fetch(WRESTLING_SITE_MATCHES_REQUEST);

    const siteTitle = settings?.title;
    const pageTitle = matchPage?.pageTitle;

    const matchData = {
      title: matchPage?.title,
      content: matchPage?.content,
    }

    return { siteTitle, pageTitle, matchData, matches };
  } catch {
    return { siteTitle: undefined, pageTitle: undefined, matchData: { title: undefined, content: undefined }, matches: [] };
  }
}

export const meta: Route.MetaFunction = ({ data }) => {
  const siteTitle = data?.siteTitle ?? "Shalancé Royal";
  const pageTitle = data?.pageTitle ?? "Matches";

  return [
    { title: `${siteTitle} | ${pageTitle}` },
  ];
}


export default function Matches() {
  const data = useLoaderData<LoaderData>();
  const matchData = data?.matchData;
  const matches = data?.matches ?? [];
  
  return (
    <Page>
      <Container className="pt-16 space-y-4">
        <h1 className="text-4xl font-bold">{matchData?.title}</h1>
        <RichText value={matchData?.content ?? []} />
      </Container>
      <Container className="py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {matches.map((match) => (
            <MatchCard key={match.slug.current} slug={match.slug} title={match.matchTitle} date={match.matchDate} description={match.matchDescription} images={match.matchImages} />
          ))}
        </div>
      </Container>
    </Page>
  );
}
