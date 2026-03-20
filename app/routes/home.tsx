import { Link, useLoaderData } from "react-router";
import { useState } from "react";
import classNames from "classnames";
import PageContainer from "~/components/PageContainer";
import Page from "~/components/Page";
import Container from "~/components/Container";
import { getSanityClient } from "~/lib/client";
import { ROOT_SIDES_REQUEST, ROOT_SITE_SETTINGS_REQUEST, WRESTLING_SITE_SETTINGS_REQUEST } from "~/constants/requests";
import RichText from "~/components/RichText";
import type { RootSiteSettings, SanityCallToAction, Side, WrestlingSiteSettings } from "~/types/sanity";
import Image from "~/components/Image";
import { imageBuilder } from "~/util/imageBuilder";
import type { Route } from "../+types/root";

interface LoaderData {
  settings: RootSiteSettings;
  wrestlingSocials: WrestlingSiteSettings["socialNetworkItems"];
  sideA: Side;
  sideB: Side;
}

export async function loader() {
  try {
    const client = getSanityClient();
    const rootSettings: RootSiteSettings = await client.fetch(ROOT_SITE_SETTINGS_REQUEST);
    const wrestlingSettings: WrestlingSiteSettings = await client.fetch(WRESTLING_SITE_SETTINGS_REQUEST);

    const wrestlingSocials = wrestlingSettings?.socialNetworkItems || [];

    const sides: Side[] = await client.fetch(ROOT_SIDES_REQUEST);

    const sideA = sides[0]
    const sideB = sides[1];

    return { settings: rootSettings, wrestlingSocials, sideA, sideB };
  } catch {
    return { settings: undefined, wrestlingSocials: [], sideA: undefined, sideB: undefined };
  }
}

export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: "What are we listening to?" }];

};

export function Layout({ children }: { children: React.ReactNode }) {
  return <PageContainer>{children}</PageContainer>;
}

export default function HomeRoute() {
  const data = useLoaderData<LoaderData>();
  const settings = data?.settings;
  const socialsSideA = data?.wrestlingSocials ?? [];
  const socialsSideB: SanityCallToAction[] = [];
  const sideA = data?.sideA;
  const sideB = data?.sideB;

  const [isSideA, setIsSideA] = useState(true);

  const socials = isSideA ? socialsSideA : socialsSideB;
  const heading = isSideA ? sideA?.title : sideB?.title;
  const sub = isSideA ? sideA?.subtitle : sideB?.subtitle;
  const content = isSideA ? sideA?.content : sideB?.content;

  const image = isSideA
    ? sideA?.image
    : sideB?.image

  const bgRefA = sideA?.backgroundImage?.asset?._ref;
  const bgRefB = sideB?.backgroundImage?.asset?._ref;
  const backgroundImage = isSideA
    ? (bgRefA ? imageBuilder(bgRefA).url() : undefined)
    : (bgRefB ? imageBuilder(bgRefB).url() : undefined);

  const backgroundColor = isSideA
    ? sideA?.backgroundColor?.hex || "#000000"
    : sideB?.backgroundColor?.hex || "#FFFFFF";

  const textColor = isSideA
    ? sideA?.textColor?.hex || "#FFFFFF"
    : sideB?.textColor?.hex || "#000000";

  return (
    <Page
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-bottom bg-no-repeat"
      style={{
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        color: textColor,
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor, opacity: 0.95 }} />
      <Container className="relative z-10">
        <div className="flex items-center justify-center mb-0 md:-mb-32 lg:-mb-56">
          <Image asset={image?.asset?._ref} alt={heading} className="w-full max-w-7xl" />
        </div>
        <div className="space-y-6 text-center pb-16 max-w-xl mx-auto opacity-70">
          <div className="space-y-2">
            <h2 className="text-4xl font-semibold md:text-3xl">{sub}</h2>
          </div>
          <RichText value={content ?? []} />
        </div>
        <div className="text-center space-y-3">
          {isSideA ? (
            <>
              <Link to="/side-a" className="font-bold text-2xl md:text-4xl py-3 px-5 hover:underline">Play {heading}</Link>
              <button className="font-bold text-2xl md:text-4xl py-3 px-5 hover:underline cursor-pointer" onClick={() => setIsSideA(false)}>Check out Side B</button>
            </>
          ) : (
            <>
              <button disabled className="font-bold text-4xl md:text-4xl py-3 px-5 cursor-not-allowed">{heading} Coming Soon</button>
              <button onClick={() => setIsSideA(true)} className="font-bold text-4xl md:text-4xl py-3 px-5 cursor-pointer hover:underline">Flip to Side A</button>
            </>
          )}
        </div>
        <nav className="flex flex-col items-center justify-center gap-4 h-48">
          {socials.length > 0 && (
            <>
              <h2 className="font-bold text-sm uppercase opacity-70">FOLLOW ME</h2>
              <ul className="space-x-6">
                {socials.map((social) => (
                  <li className="inline-block" key={social.label}>
                    <Link
                      to={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classNames(
                        "text-4xl hover:underline opacity-70 hover:opacity-100 transition-opacity duration-200",
                      )}
                    >
                      <i className={classNames(social.icon.iconName, social.icon.iconStyle)} aria-hidden="true" />{" "}
                      <span className="sr-only">{social.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

        </nav>
      </Container>
    </Page>
  );
}