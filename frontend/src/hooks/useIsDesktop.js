import { useEffect, useState } from "react";

export const useIsDesktop = (minWidth = 769) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= minWidth);
    };

    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [minWidth]);

  return isDesktop;
};
