import { type ReactNode } from "react";

export const Grid = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => (
    <div className={`${className} grid grid-cols-12 gap-x-body`}>
        {children}
    </div>
);
