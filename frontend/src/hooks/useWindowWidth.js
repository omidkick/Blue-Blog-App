import { useEffect, useState } from "react";

export default function useWindowWidth() {
  const [width, setWidth] = useState(null); // Start with null to indicate not hydrated yet

  useEffect(() => {
    // Set initial width after hydration
    setWidth(window.innerWidth);

    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
