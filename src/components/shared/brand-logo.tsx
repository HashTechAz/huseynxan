import Image from "next/image";

import { cn } from "@/lib/cn";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Image
      src="/images/brand/useynkhan1792-logo.png"
      alt=""
      width={358}
      height={76}
      sizes="(min-width: 640px) 208px, 144px"
      className={cn("h-auto w-36 sm:w-48 lg:w-52", className)}
    />
  );
}
