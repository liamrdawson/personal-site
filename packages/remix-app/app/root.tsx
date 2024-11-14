import "./styles/global.css";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";

import Footer from "./lib/components/Footer";
import Header from "./lib/components/Header";

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
      <body className="max-w-body mx-auto flex min-h-[120vh] w-[90%] flex-col bg-background antialiased">
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