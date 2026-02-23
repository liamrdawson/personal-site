import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "../utils/cn";
import { Grid } from "./Grid";

const textVariants = cva("block", {
    variants: {
        variant: {
            content: "font-content font-family-content",
            ui: "font-default font-family-default",
            display: "font-display font-family-display",
            quote: "font-content font-family-content italic mt-paragraph",
        },
        size: {
            sm: "text-small leading-small tracking-small",
            default: "text-body leading-body tracking-body",
            lg: "text-large leading-large tracking-large",
            display:
                "text-display leading-display tracking-display selection:text-background selection:bg-text",
        },
    },
    defaultVariants: {
        variant: "content",
        size: "default",
    },
    compoundVariants: [
        {
            variant: ["content", "ui", "display"],
            class: "col-span-full",
        },
        {
            variant: ["quote"],
            class: "col-start-2 col-end-12",
        },
    ],
});

type TextVariantProps = Omit<VariantProps<typeof textVariants>, "variant"> & {
    variant: Required<VariantProps<typeof textVariants>>["variant"];
};

type TextElement = "p" | "span" | "blockquote";

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
    return (
        <Grid>
            <Element
                className={cn(textVariants({ variant, size }), className ?? "")}
                {...props}
            >
                {children}
            </Element>
        </Grid>
    );
}
