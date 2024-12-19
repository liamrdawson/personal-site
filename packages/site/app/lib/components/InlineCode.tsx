import { type ReactNode } from "react";

export const InlineCode = ({ children }: { children: ReactNode }) => (
  <code className="rounded bg-dark px-xs py-[2px] text-small text-light">
    {children}
  </code>
);
