import { Link } from "@remix-run/react";

const Header = () => (
  <header>
    <div className="site_title">
      <Link to="/">
        <p className="h1">LIAM DAWSON</p>
        <p className="subheading">
          <i>eCommerce Developer</i>
        </p>
      </Link>
    </div>
  </header>
);

export default Header;
