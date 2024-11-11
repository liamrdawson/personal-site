import { Link } from "@remix-run/react";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

import { cn } from "../utils/cn";

const textLinkVariants = cva("duration-250 ease-easeOutSoft", {
  variants: {
    variant: {
      content:
        "text-contentLink font-family-content hover:text-contentLinkHover border-b border-solid border-b-contentLinkUnderscore hover:border-b-contentLinkUnderscoreHover",
      muted: "text-socialsLink hover:text-socialsLinkHover",
      ui: "text-defaultLink hover:text-defaultLinkHover",
      nav: "text-light hover:text-dark",
    },
  },
});

type TextLinkVariantProps = Omit<
  VariantProps<typeof textLinkVariants>,
  "variant"
> & {
  variant: Required<VariantProps<typeof textLinkVariants>>["variant"];
};

interface TextLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    TextLinkVariantProps {
  to: string;
  children: ReactNode;
  className?: string;
  prefetch: "none" | "intent" | "render" | "viewport";
}

export const TextLink = ({
  children,
  variant,
  to,
  className,
}: TextLinkProps) => (
  <Link className={cn(textLinkVariants({ variant }), className ?? "")} to={to}>
    {children}
  </Link>
);
