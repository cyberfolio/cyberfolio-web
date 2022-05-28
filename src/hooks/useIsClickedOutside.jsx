import { useEffect } from "react";

export default function useIsClickedOutside(ref, action) {
  const handleClick = (e) => {
    if (ref?.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    action();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
