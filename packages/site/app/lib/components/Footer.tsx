import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";
import { Link } from "react-router";

import { Grid } from "./Grid";
import { TextLink } from "./TextLink";

interface FooterProps {
  setFooterIsInView: Dispatch<SetStateAction<boolean>>;
}

const Footer = ({ setFooterIsInView }: FooterProps) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterIsInView(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <footer
      ref={ref}
      className="mt-layoutSection pb-md pt-lg text-small md:pb-lg md:pt-xl"
    >
      <Grid>
        <ul className="col-span-12 col-start-1 flex flex-row justify-between font-strong md:col-span-8 md:col-start-3">
          <li>
            <TextLink
              prefetch="none"
              to="mailto:liamrdawson@gmail.com"
              variant="muted"
            >
              Email
            </TextLink>
          </li>
          <li>
            <TextLink
              prefetch="none"
              to="https://www.linkedin.com/in/liamrdawson/"
              variant="muted"
            >
              LinkedIn
            </TextLink>
          </li>
          <li>
            <TextLink
              prefetch="none"
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
          Copyright © 2024 <Link to="/">Liam Dawson</Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
