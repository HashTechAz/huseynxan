import Image from "next/image";

import { getProductImageSrc } from "@/lib/products";
import { cn } from "@/lib/cn";
import type { ProductImage as ProductImageData } from "@/types/product";

type ProductImageProps = {
  image: ProductImageData;
  className?: string;
  imageClassName?: string;
  sizes: string;
};

export function ProductImage({ image, className, imageClassName, sizes }: ProductImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      <Image
        src={getProductImageSrc(image)}
        alt={image.alt}
        fill
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
