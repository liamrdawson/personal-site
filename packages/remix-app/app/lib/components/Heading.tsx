import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "~/lib/utils/cn";

const headingVariants = cva("", {
  variants: {
    level: {
      h1: "text-h1 font-h1 leading-h1 tracking-h1 font-family-heading",
      h2: "text-h2 font-h2 leading-h2 tracking-h2 font-family-heading",
      h3: "text-h3 font-h3 leading-h3 tracking-h3 font-family-heading",
      h4: "text-h4 font-h4 leading-h4 tracking-h4 font-family-heading",
      h5: "text-h5 font-h5 leading-h5 tracking-h5 font-family-heading",
    },
  },
});

type HeadingVariantProps = Omit<
  VariantProps<typeof headingVariants>,
  "variant"
> & {
  level: "h1" | "h2" | "h3" | "h4" | "h5";
};

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    HeadingVariantProps {
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({ level, children, className }: HeadingProps) => {
  const Element = level;
  return (
    <div className="*:animate-slide-up overflow-hidden">
      <Element className={cn(headingVariants({ level }), className ?? "")}>
        {children}
      </Element>
    </div>
  );
};
