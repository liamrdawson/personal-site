import { Link } from "@remix-run/react";

import { Grid } from "./Grid";
import { Text } from "./Text";
import { TextLink } from "./TextLink";

const Header = () => (
  <header>
    <Grid>
      <div className="font-family-default fixed bottom-0 left-0 w-full pb-xl">
        <div className="relative mx-auto flex w-fit flex-col items-center justify-center">
          <button className="font-family-default z-20 flex h-48 w-fit flex-col justify-center rounded-md bg-dark p-sm text-large font-strong text-light">
            Menu
          </button>
          <nav className="absolute top-0 z-10 w-full rounded-md border-4 border-solid border-dark bg-dark">
            <ul className="flex flex-col rounded-sm border-4 border-solid border-light bg-light text-center text-body font-strong">
              <TextLink to="/" variant="ui">
                Home
              </TextLink>
              <TextLink to="/about" variant="ui">
                About
              </TextLink>
            </ul>
          </nav>
        </div>
      </div>
      <div className="col-span-6 col-start-1 border-b border-solid border-dark pb-md pt-xl text-center md:col-span-12">
        <Link to="/">
          <Text variant="display" size="display">
            LIAM DAWSON
          </Text>
          <Text
            variant="content"
            size="default"
            className="italic leading-subheading"
          >
            <i>eCommerce Developer</i>
          </Text>
        </Link>
      </div>
    </Grid>
  </header>
);

export default Header;
