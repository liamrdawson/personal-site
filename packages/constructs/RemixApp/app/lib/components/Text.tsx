import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "~/lib/utils/cn";

const textVariants = cva("block", {
  variants: {
    variant: {
      content: "font-content font-family-content",
      ui: "font-default font-family-default",
      display: "font-display font-family-display",
    },
    size: {
      sm: "text-small leading-small tracking-small",
      default: "text-body leading-body tracking-body",
      lg: "text-large leading-large tracking-large",
      display: "text-display leading-display tracking-display",
    },
  },
  defaultVariants: {
    variant: "content",
    size: "default",
  },
});

type TextElement = "p" | "span";

type TextVariantProps = Omit<VariantProps<typeof textVariants>, "variant"> & {
  variant: Required<VariantProps<typeof textVariants>>["variant"];
};

interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>,
    TextVariantProps {
  children: React.ReactNode;
  as?: TextElement;
  className?: string;
}

export function Text({
  children,
  variant,
  size,
  as = "p",
  className,
  ...props
}: TextProps) {
  const Element = as;
  console.log(textVariants());
  return (
    <Element
      className={cn(textVariants({ variant, size }), className ?? "")}
      {...props}
    >
      {children}
    </Element>
  );
}
