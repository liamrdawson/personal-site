import { ReactNode } from "react";

export const Grid = ({ children }: { children: ReactNode }) => (
  <div className="mx-grid-sm md:mx-grid-md grid grid-cols-6 gap-x-body md:grid-cols-12">
    {children}
  </div>
);
