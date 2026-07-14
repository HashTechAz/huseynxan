import { cn } from "@/lib/cn";

type HeritagePatternProps = {
  className?: string;
};

export function HeritagePattern({ className }: HeritagePatternProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none text-antique-gold", className)}
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 40H112L136 16L160 40L184 16L208 40H320" stroke="currentColor" />
      <path d="M0 47H116L136 27L156 47L184 19L212 47H320" stroke="currentColor" opacity="0.45" />
      <path d="M148 40L160 28L172 40L160 52L148 40Z" stroke="currentColor" />
      <circle cx="160" cy="40" r="2" fill="currentColor" />
    </svg>
  );
}
