import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode } from "react";

import { cn } from "../utils/cn";

const listVariants = cva(
  "space-y-4 pl-sm text-body leading-body tracking-body mt-paragraph",
  {
    variants: {
      intent: {
        ui: "font-family-default",
        content: "font-family-content",
      },
      style: {
        ul: "list-disc",
        ol: "list-decimal",
      },
    },
  }
);

type ListVariantProps = VariantProps<typeof listVariants> & {
  style: "ul" | "ol";
};

interface ListProps extends ListVariantProps {
  children: ReactNode;
  className?: string;
}

export const List: React.FC<ListProps> = ({
  children,
  style = "ul",
  intent = "content",
  className,
}) => {
  const classes = cn(listVariants({ intent, style }), className ?? "");

  return style === "ul" ? (
    <ul className={classes}>{children}</ul>
  ) : (
    <ol className={classes}>{children}</ol>
  );
};
