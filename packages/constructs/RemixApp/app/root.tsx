import "./styles/global.css";

import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export function Layout({ children }: { children: React.ReactNode }) {
  const thisYear = new Date().getFullYear();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header className="grid header_container">
          <div className="site_title">
            <Link to="/">
              <p className="h1">LIAM DAWSON</p>
              <p className="subheading">
                <i>eCommerce Developer</i>
              </p>
            </Link>
          </div>
        </header>
        {children}
        <footer>
          <div className="grid">
            <ul className="footer_socials">
              <li>
                <a href="mailto:liamrdawson@gmail.com">Email</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/liamrdawson/">linkedin</a>
              </li>
              <li>
                <a href="https://www.instagram.com/liam_r_dawson/">Instagram</a>
              </li>
            </ul>
          </div>
          <div className="footer_copyright">
            <span>
              Copyright © {thisYear} <Link to="/">Liam Dawson</Link>
            </span>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
