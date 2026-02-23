import { extendTailwindMerge } from "tailwind-merge";

const twm = extendTailwindMerge({
    extend: {
        classGroups: {
            "font-family": [
                "font-family-default",
                "font-family-heading",
                "font-family-display",
                "font-family-content",
            ],
            "font-weight": [
                "font-h1",
                "font-h2",
                "font-h3",
                "font-h4",
                "font-h5",
                "font-display",
                "font-body",
                "font-strong",
            ],
        },
    },
});

export function cn(...classes: string[]) {
    return twm(classes);
}
