import { Link } from "@remix-run/react";

import { Grid } from "./Grid";
import { Text } from "./Text";

const Header = () => (
  <header>
    <Grid>
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
