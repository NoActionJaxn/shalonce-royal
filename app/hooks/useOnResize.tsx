import React from "react";
import debounce from "lodash.debounce";
export interface useOnResizeProps {
  onResize: () => void;
}

export default function useOnResize({ onResize }: useOnResizeProps) {
  React.useEffect(() => {
    const debouncedOnResize = debounce(onResize, 200);

    window.addEventListener("resize", debouncedOnResize);
    return () => {
      window.removeEventListener("resize", debouncedOnResize);
      debouncedOnResize.cancel();
    };
  }, [onResize]);
}
