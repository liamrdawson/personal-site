import { Link } from "@remix-run/react";

import { Grid } from "./Grid";

const Header = () => (
  <header>
    <Grid>
      <div className="col-span-6 col-start-1 border-b-2 border-solid border-dark pb-md pt-xl text-center sm:col-span-6 sm:col-start-1 md:col-span-8 md:col-start-3 xl:col-span-6 xl:col-start-4">
        <Link to="/">
          <p className="font-heading text-h1 font-h1 leading-h1 tracking-h1">
            LIAM DAWSON
          </p>
          <p className="font-content text-body italic leading-subheading">
            <i>eCommerce Developer</i>
          </p>
        </Link>
      </div>
    </Grid>
  </header>
);

export default Header;
