import { LinksFunction } from "@remix-run/node";
import { MobileNavigation, links as navigationLinks } from "../navigation";

const links: LinksFunction = () => [...navigationLinks()];

function Header() {
  return (
    <header>
      <MobileNavigation />
      <h1>Liam Dawson</h1>
    </header>
  );
}

export { Header, links };
