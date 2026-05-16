const blobs = [
  "left-[8%] top-[14%] h-44 w-44 bg-primary/18",
  "right-[10%] top-[20%] h-52 w-52 bg-secondary/16",
  "bottom-[12%] left-[34%] h-44 w-44 bg-success/14"
];

export function FloatingBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((className) => (
        <div
          key={className}
          className={`absolute rounded-full blur-2xl will-change-auto ${className}`}
        />
      ))}
    </div>
  );
}
