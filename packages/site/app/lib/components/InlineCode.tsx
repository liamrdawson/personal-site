import { type ReactNode } from "react";

export const InlineCode = ({ children }: { children: ReactNode }) => (
  <code className="rounded bg-dark px-[4px] py-[4px] text-small text-light">
    {children}
  </code>
);
