import { HeritagePattern } from "@/components/shared/heritage-pattern";
import { cn } from "@/lib/cn";

export function FounderImageSlot({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative flex aspect-[4/5] items-center justify-center overflow-hidden border border-border bg-surface", className)}
      role="img"
      aria-label="Paris Malik Hüseynqulu xan qızının monoqramı"
    >
      <HeritagePattern className="absolute w-[30rem] rotate-90 opacity-[0.12]" />
      <div className="relative flex size-28 items-center justify-center border border-antique-gold/40 font-display text-4xl text-antique-gold">
        PM
      </div>
      <p className="absolute inset-x-6 bottom-7 text-center text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
        Paris Malik Hüseynqulu xan qızı
      </p>
    </div>
  );
}
