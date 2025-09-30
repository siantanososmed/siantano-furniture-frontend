import { useEffect, useRef, useState } from "react";

export function useGridColumns() {
  const ref = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(1);
  useEffect(() => {
    function updateCols() {
      if (ref.current) {
        requestAnimationFrame(() => {
          if (!ref.current) return;
          const computed = window.getComputedStyle(ref.current);
          const gridTemplate = computed.getPropertyValue(
            "grid-template-columns"
          );
          const count = gridTemplate.split(" ").filter(Boolean).length;
          setCols(count);
        });
      }
    }
    updateCols();

    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return { ref, cols };
}
