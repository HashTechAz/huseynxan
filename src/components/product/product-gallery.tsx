"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, Minimize2 } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { getProductImageSrc } from "@/lib/products";
import { cn } from "@/lib/cn";
import type { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  images: readonly ProductImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const selectedImage = images[selectedIndex];

  if (!selectedImage) {
    return <div className="aspect-[4/5] border border-border bg-surface" aria-label={`${productName} üçün vizual mövcud deyil`} />;
  }

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden border border-border bg-surface">
        <Image
          src={getProductImageSrc(selectedImage)}
          alt={selectedImage.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={cn("object-cover transition-transform duration-300", isZoomed && "scale-125")}
        />
        <IconButton
          className="absolute right-4 bottom-4 bg-background/95"
          aria-label={isZoomed ? "Şəkli kiçilt" : "Şəkli yaxınlaşdır"}
          aria-pressed={isZoomed}
          onClick={() => setIsZoomed((current) => !current)}
        >
          {isZoomed ? <Minimize2 aria-hidden="true" size={18} /> : <Maximize2 aria-hidden="true" size={18} />}
        </IconButton>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-3" aria-label="Məhsul vizualları">
        {images.map((image, index) => (
          <button
            type="button"
            key={`${image.src}-${index}`}
            aria-label={`${productName}: ${index + 1}-ci vizualı göstər`}
            aria-pressed={selectedIndex === index}
            onClick={() => { setSelectedIndex(index); setIsZoomed(false); }}
            className={cn(
              "relative aspect-square overflow-hidden border bg-surface transition-colors",
              selectedIndex === index ? "border-antique-gold" : "border-border hover:border-foreground",
            )}
          >
            <Image src={getProductImageSrc(image)} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
