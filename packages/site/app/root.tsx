import "./styles/global.css";
import "@fontsource-variable/newsreader";

import { useState } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import Footer from "./lib/components/Footer";
import Header from "./lib/components/Header";
import { Heading } from "./lib/components/Heading";
import { Text } from "./lib/components/Text";
import { TextLink } from "./lib/components/TextLink";

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <main className="mt-layoutSection flex-1 text-dark selection:bg-text selection:text-background">
        <Heading level="h1">{error.status}</Heading>
        <Text
          variant="content"
          size="default"
          className="mt-paragraph animate-fade-in opacity-0"
        >
          Whoops, we broke the internet (
          {error.status === 404 ? "Page not found" : error.statusText}).
        </Text>
        <TextLink
          to="/"
          prefetch="render"
          variant="ui"
          className="text-body font-strong inline-block mt-paragraph animate-fade-in opacity-0"
        >
          Start over
        </TextLink>
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <Heading level="h1">Error</Heading>
        <Text
          variant="content"
          size="default"
          className="mt-paragraph animate-fade-in opacity-0"
        >
          {error.message}
        </Text>
        <Text
          variant="content"
          size="default"
          className="mt-paragraph animate-fade-in opacity-0"
        >
          The stack trace is:
        </Text>
        <pre className="text-body font-family-default">{error.stack}</pre>
      </div>
    );
  } else {
    return <Heading level="h1">Unknown Error</Heading>;
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [footerIsInView, setFooterIsInView] = useState(false);
  return (
    <html lang="en" className="text-base">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="mx-auto flex min-h-[120vh] w-[90%] max-w-max-body flex-col bg-background antialiased">
        <Header footerIsInView={footerIsInView} />
        {children}
        <Footer setFooterIsInView={setFooterIsInView} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
