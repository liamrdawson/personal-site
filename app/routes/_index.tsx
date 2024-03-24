import { Header, links as headerLinks } from "../components/header";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [...headerLinks()];

export default function Index() {
  return (
    <main>
      <Header />
      <h2>Testing</h2>
    </main>
  );
}
