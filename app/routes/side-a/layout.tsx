import { useState } from "react";
import { isRouteErrorResponse, Link, Outlet, useLoaderData, useRouteError } from "react-router";
import { getSanityClient } from "~/lib/client";
import { WRESTLING_SITE_SETTINGS_REQUEST } from "~/constants/requests";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import MobileMenu from "~/components/MobileMenu";
import PageContainer from "~/components/PageContainer";
import Page from "~/components/Page";
import Container from "~/components/Container";
import { CartProvider } from "~/context/CartContext";
import CartDrawer from "~/components/CartDrawer";
import useOnResize from "~/hooks/useOnResize";
import type { CallToAction } from "~/types/cta";
import type { SanityImage, WrestlingSiteSettings } from "~/types/sanity";

interface LoaderData {
  description?: string;
  logo?: SanityImage;
  menu: CallToAction[];
  socials: CallToAction[];
}

export async function loader(): Promise<LoaderData> {
  try {
    const client = getSanityClient();
    const settings: WrestlingSiteSettings = await client.fetch(WRESTLING_SITE_SETTINGS_REQUEST);

    const menu: CallToAction[] = (settings?.menuItems ?? []).map((item) => ({
      label: item.label,
      path: item.url,
    }));

    const socials: CallToAction[] = (settings?.socialNetworkItems ?? []).map((item) => ({
      label: item.label,
      path: item.url,
      icon: {
        prefix: item.icon.iconStyle,
        iconName: item.icon.iconName,
      },
    }));

    const logo = settings?.logo;

    const description: string | undefined = settings?.description;

    return { menu, socials, description, logo };
  } catch {
    return { menu: [], socials: [], description: undefined, logo: undefined };
  }
}

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  useOnResize({ onResize: handleCloseMenu });

  const data = useLoaderData<LoaderData>();
  const menu = data?.menu ?? [];
  const socials = data?.socials ?? [];
  const description = data?.description;
  const logo = data?.logo;
  return (
    <CartProvider>
      <PageContainer>
        <Header logo={logo} menu={menu} isOpen={isOpen} toggleMenu={handleToggleMenu} />
        <MobileMenu menu={menu} isOpen={isOpen} setIsOpen={setIsOpen} />
        <Outlet />
        <Footer menu={menu} socials={socials} description={description} />
        <CartDrawer />
      </PageContainer>
    </CartProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  useOnResize({ onResize: handleCloseMenu });

  const data = useLoaderData<LoaderData>();
  const menu = data?.menu ?? [];
  const socials = data?.socials ?? [];
  const description = data?.description;
  const logo = data?.logo;

  let title = "Oops!";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? "404" : `${error.status}`;
    message =
      error.status === 404
        ? "The page you're looking for doesn't exist."
        : error.statusText || message;
  }

  return (
    <CartProvider>
      <PageContainer>
        <Header logo={logo} menu={menu} isOpen={isOpen} toggleMenu={handleToggleMenu} />
        <MobileMenu menu={menu} isOpen={isOpen} setIsOpen={setIsOpen} />
        <Page className="flex flex-col items-center justify-center gap-6">
          <Container className="text-center" fluid>
            <h1 className="text-6xl font-bold text-slate-900">{title}</h1>
            <p className="mt-4 text-lg text-slate-600">{message}</p>
            <Link
              to="/side-a"
              className="mt-8 inline-block rounded bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Back to Home
            </Link>
          </Container>
        </Page>
        <Footer menu={menu} socials={socials} description={description} />
      </PageContainer>
    </CartProvider>
  );
}
