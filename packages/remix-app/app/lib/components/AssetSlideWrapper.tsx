import { ReactNode } from "react";

export const AssetSlideWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative overflow-hidden md:col-end-5">
      <div className="animate-asset-slide-up translate-y-[102%] overflow-hidden">
        <div className="animate-asset-slide-down translate-y-[-100%] overflow-hidden align-baseline">
          {children}
        </div>
      </div>
    </div>
  );
};
