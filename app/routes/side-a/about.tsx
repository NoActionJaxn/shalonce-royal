import { useLoaderData } from "react-router";
import Container from "~/components/Container";
import Page from "~/components/Page";
import RichText from "~/components/RichText";
import Image from "~/components/Image";
import GridGallery from "~/components/GridGallery";
import { getSanityClient } from "~/lib/client";
import { WRESTLING_SITE_SETTINGS_REQUEST, WRESTLING_SITE_ABOUT_PAGE_REQUEST, WRESTLING_SITE_GALLERY_PAGE_REQUEST } from "~/constants/requests";
import type { SanityImage, WrestlingAboutPage, WrestlingGalleryPage, WrestlingSiteSettings } from "~/types/sanity";
import type { Route } from "../side-a/+types/about";
import { LinkButton } from "~/components/Buttons";

interface LoaderData {
  siteTitle: string;
  pageTitle: string;
  about: {
    title: string;
    subtitle: string;
    content: any[];
    featuredImage?: WrestlingAboutPage["featuredImage"];
  }
  gallery?: SanityImage[];
}

export async function loader() {
  try {
    const client = getSanityClient();

    const settings: WrestlingSiteSettings = await client.fetch(WRESTLING_SITE_SETTINGS_REQUEST);
    const about: WrestlingAboutPage = await client.fetch(WRESTLING_SITE_ABOUT_PAGE_REQUEST);
    const galleryItems: WrestlingGalleryPage = await client.fetch(WRESTLING_SITE_GALLERY_PAGE_REQUEST);

    const siteTitle = settings?.title;
    const pageTitle = about?.pageTitle;

    const aboutContent = {
      title: about?.title,
      subtitle: about?.subtitle,
      content: about?.content,
      featuredImage: about?.featuredImage,
    }

    const gallery = galleryItems?.galleryImages?.slice(0, 10) ?? [];

    return { siteTitle, pageTitle, about: aboutContent, gallery };
  } catch {
    return { siteTitle: undefined, pageTitle: undefined, about: { title: '', subtitle: '', content: [], featuredImage: undefined }, gallery: [] };
  }
}

export const meta: Route.MetaFunction = ({ data }) => {
  const siteTitle = data?.siteTitle ?? "Shalancé Royal";
  const pageTitle = data?.pageTitle ?? "About";
  return [
    { title: `${siteTitle} | ${pageTitle}` },
  ];
}

export default function About() {
  const data = useLoaderData<LoaderData>();
  const about = data?.about;
  const gallery = data?.gallery;

  return (
    <>
      <Page className="flex flex-col gap-4 items-center justify-center">
        <Container className="pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mx-auto max-w-md md:max-w-lg overflow-hidden shadow-2xl ring-1 ring-black/10">
                <div className="aspect-3/4">
                  <Image className="h-full w-full object-cover" asset={about?.featuredImage?.asset._ref} alt={about?.title} />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{about?.title}</h1>
                <h2 className="text-2xl md:text-3xl opacity-90">{about?.subtitle}</h2>
              </div>
              <div className="bg-black/30 text-white p-6 backdrop-blur-sm">
                <RichText value={about?.content ?? []} />
              </div>
            </div>
          </div>
        </Container>
        <Container>
          {gallery && gallery.length > 0 && (
            <div className="mt-8 space-y-8">
              <GridGallery images={gallery} title="Gallery" />
              <div className="flex justify-end">
                <LinkButton to="/side-a/gallery">View Full Gallery</LinkButton>
              </div>
            </div>
          )}
        </Container>
      </Page>
    </>
  );
}