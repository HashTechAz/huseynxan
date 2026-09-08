import Image from "next/image";

import { cn } from "@/lib/cn";

export function FounderImageSlot({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden border border-border bg-surface", className)}>
      <Image
        src="/images/founder/paris-malik-portrait.webp"
        alt="Useynkhan1792 brendinin qurucusu Paris Malik Useynqulu xan qızı"
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover object-top"
      />
    </div>
  );
}
