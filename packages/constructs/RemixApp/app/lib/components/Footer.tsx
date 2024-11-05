import { Link } from "@remix-run/react";

import { Grid } from "./Grid";
import { TextLink } from "./TextLink";

const Footer = () => {
  const thisYear = new Date().getFullYear();
  return (
    <footer className="mt-layoutSection pb-md pt-md text-small md:pb-lg md:pt-lg">
      <Grid>
        <ul className="col-span-6 col-start-1 flex flex-row justify-between font-strong md:col-span-9 md:col-start-3">
          <li>
            <TextLink to="mailto:liamrdawson@gmail.com" variant="muted">
              Email
            </TextLink>
          </li>
          <li>
            <TextLink
              to="https://www.linkedin.com/in/liamrdawson/"
              variant="muted"
            >
              linkedin
            </TextLink>
          </li>
          <li>
            <TextLink
              to="https://www.instagram.com/liam_r_dawson/"
              variant="muted"
            >
              Instagram
            </TextLink>
          </li>
        </ul>
      </Grid>
      <div className="mt-row text-center text-socialsLink">
        <span>
          Copyright © {thisYear} <Link to="/">Liam Dawson</Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
