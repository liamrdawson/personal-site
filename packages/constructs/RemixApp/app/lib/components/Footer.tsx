import { Link } from "@remix-run/react";

const Footer = () => {
  const thisYear = new Date().getFullYear();
  return (
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
  );
};

export default Footer;
