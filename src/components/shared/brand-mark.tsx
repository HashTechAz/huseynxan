import { brand } from "@/data/brand";
import { cn } from "@/lib/cn";

type BrandMarkProps = {
  className?: string;
  showSlogan?: boolean;
  inverted?: boolean;
};

export function BrandMark({ className, showSlogan = false, inverted = false }: BrandMarkProps) {
  return (
    <span className={cn("inline-flex flex-col", inverted && "text-dark-foreground", className)}>
      <span className="font-display text-lg leading-none font-semibold tracking-[0.11em] uppercase sm:text-xl sm:tracking-[0.13em]">
        {brand.name}
      </span>
      {showSlogan ? (
        <span className="mt-2 text-[0.5rem] font-semibold tracking-[0.3em] text-antique-gold uppercase">
          {brand.slogan}
        </span>
      ) : null}
    </span>
  );
}
