import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main>
      <h2>Full Stack Developer</h2>
      <strong>
        Liam Dawson is an. He currently lives in Winchester, England.{" "}
        <Link to="/about">
          <em>Learn more</em>
        </Link>
      </strong>
    </main>
  );
}
