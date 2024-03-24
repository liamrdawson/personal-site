import { Link } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import styles from "./navigation.css?url";

const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const LINKS = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "About",
    to: "/about",
  },
  {
    name: "Articles",
    to: "/articles",
  },
];

function MobileNavigation() {
  return (
    <nav className="mobile-nav">
      {LINKS.map((link) => (
        <Link key={link.to} to={link.to}>
          {link.name}
        </Link>
      ))}
    </nav>
  );
}

export { MobileNavigation, links };
