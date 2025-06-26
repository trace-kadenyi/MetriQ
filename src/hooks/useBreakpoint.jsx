import { useEffect, useState } from "react";

export default function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("lg");

  useEffect(() => {
    const getBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) return "sm"; // Tailwind: sm < 640px
      if (width < 768) return "md"; // Tailwind: md < 768px
      if (width < 1024) return "lg"; // Tailwind: lg < 1024px
      return "xl";
    };

    const update = () => setBreakpoint(getBreakpoint());
    update(); // Set on mount
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return breakpoint;
}
