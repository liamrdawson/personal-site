import { Link } from "@remix-run/react";
import { ReactNode } from "react";

export const ContentLink = ({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) => (
  <Link
    className="border-b border-solid border-b-contentLinkUnderscore duration-250 ease-easeOutSoft hover:border-b-contentLinkUnderscoreHover"
    to={to}
  >
    {children}
  </Link>
);
