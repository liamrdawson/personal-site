import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import styles from "./styles/shared.css?url";
import { Header, links as headerLinks } from "./components/header";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  ...headerLinks(),
];

export default function App() {
  return (
    <html lang="en-GB">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
