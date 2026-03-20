import { useLoaderData } from "react-router";
import Container from "~/components/Container";
import Page from "~/components/Page";
import RichText from "~/components/RichText";
import Image from "~/components/Image";
import { getSanityClient } from "~/lib/client";
import { WRESTLING_SITE_MATCH_BY_SLUG_REQUEST, WRESTLING_SITE_SETTINGS_REQUEST } from "~/constants/requests";
import type { WrestlingMatch, WrestlingSiteSettings } from "~/types/sanity";
import type { Route } from "./+types/matches.$slug";
import { formatDate } from "~/util/formatDate";
import GridGallery from "~/components/GridGallery";

interface LoaderData {
  siteTitle: string;
  match: WrestlingMatch;
}

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const client = getSanityClient();

    const settings: WrestlingSiteSettings = await client.fetch(WRESTLING_SITE_SETTINGS_REQUEST);
    const match: WrestlingMatch = await client.fetch(WRESTLING_SITE_MATCH_BY_SLUG_REQUEST, {
      slug: params.slug,
    });

    if (!match) {
      throw new Response("Match not found", { status: 404 });
    }

    const siteTitle = settings?.title ?? "Shalancé Royal";

    return { siteTitle, match } satisfies LoaderData;
  } catch {
    return { siteTitle: undefined, match: undefined };
  }
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Shalancé Royal | Match" }];

  const { siteTitle, match } = data as LoaderData;
  const pageTitle = match.matchTitle ?? "Match";

  return [
    { title: `${siteTitle} | ${pageTitle}` },
  ];
};

export default function MatchDetail() {
  const data = useLoaderData<LoaderData>();

  const match = data?.match;
  const mainImage = match?.matchImages?.[0];

  return (
    <Page>
      <Container className="py-16 space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            {match?.matchDate ? formatDate(match.matchDate) : ''}
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            {match?.matchTitle}
          </h1>
        </header>
        {mainImage && (
          <div className="flex items-center justify-center bg-slate-200 rounded-lg" style={{ maxHeight: "40vh" }}>
            <Image
              asset={mainImage.asset._ref}
              className="max-h-[40vh] max-w-full h-auto w-auto object-contain"
              alt={match?.matchTitle || "Match image"}
            />
          </div>
        )}
        <section className="prose max-w-none">
          <RichText value={match?.matchDescription ?? []} />
        </section>
      </Container>
      <Container>
        <GridGallery images={match?.matchImages?.slice(1) ?? []} title="Match Images" />
      </Container>
    </Page>
  );
}
