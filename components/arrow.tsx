export function Arrow({ dir = "up-right" }: { dir?: "up-right" | "down" | "right" | "left" }) {
  const paths = {
    "up-right": "M4.5 11.5l7-7M5.5 4.5h6v6",
    down: "M8 3v10M3.5 8.5L8 13l4.5-4.5",
    right: "M3 8h10M8.5 3.5L13 8l-4.5 4.5",
    left: "M13 8H3M7.5 3.5L3 8l4.5 4.5",
  };
  return (
    <svg className="arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d={paths[dir]} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
