import React from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import Page from "./components/Page";
import Container from "./components/Container";
import type { Route } from "./+types/root";
import "./app.css";
import { getSanityClient } from "./lib/client";
import type { WrestlingSiteSettings } from "./types/sanity";
import { WRESTLING_SITE_SETTINGS_REQUEST } from "./constants/requests";
import { imageBuilder } from "./util/imageBuilder";

interface LoaderData {
  favicon?: WrestlingSiteSettings["favicon"];
}

export const loader = async () => {
  try {
    const client = getSanityClient();
    const settings: WrestlingSiteSettings = await client.fetch(WRESTLING_SITE_SETTINGS_REQUEST);

    const favicon = settings?.favicon;

    return { favicon };
  } catch {
    return { favicon: undefined };
  }
};

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<LoaderData>();
  const favicon = data?.favicon;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          href={favicon ? imageBuilder(favicon.asset._ref).url() : "/favicon.png"}
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <script src="https://kit.fontawesome.com/1aad4926f4.js" crossOrigin="anonymous" defer />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Page className="flex items-center justify-center">
      <Container className="space-y-2" fluid>
        <h1 className="text-center text-4xl font-bold">{message}</h1>
        <p className="text-center text-lg">{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </Container>
    </Page>
  );
}
