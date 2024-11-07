import { ReactNode } from "react";

export const List = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="font-family-content mt-paragraph list-disc space-y-4 pl-sm font-content text-body leading-body tracking-body">
      {children}
    </ul>
  );
};
