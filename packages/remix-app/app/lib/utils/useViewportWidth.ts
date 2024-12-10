import { useEffect, useState } from "react";

export function useViewportWidth() {
  const isClient = typeof window !== "undefined"; // Check if in a browser
  const [width, setWidth] = useState(isClient ? window.innerWidth : 0);

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  return width;
}

export default useViewportWidth;
