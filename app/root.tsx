
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import styles from './styles/shared.css?url'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles
  }
]

export default function App() {
  return (
    <html lang="en-GB">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
