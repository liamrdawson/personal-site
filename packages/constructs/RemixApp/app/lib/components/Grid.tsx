import { ReactNode } from "react";

export const Grid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-6 gap-x-body md:grid-cols-12">{children}</div>
);
