import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductImage } from "@/components/product/product-image";
import { buttonClassName } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { isProductInStock } from "@/lib/products";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  showActions?: boolean;
  imageSizes?: string;
};

export function ProductCard({ product, showActions = false, imageSizes = "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" }: ProductCardProps) {
  const image = product.images[0];
  const inStock = isProductInStock(product);
  const productHref = `/products/${product.slug}`;
  const productType = product.category === "fragrances" ? "Fərdi ətir" : "Set";

  return (
    <article className="group">
      <Link href={productHref} className="block">
        {image ? (
          <ProductImage
            image={image}
            sizes={imageSizes}
            className="aspect-[4/5] border border-border"
            imageClassName="transition-transform duration-500 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="aspect-[4/5] border border-border bg-surface" aria-hidden="true" />
        )}
      </Link>
      <div className="mt-6 flex items-start justify-between gap-5">
          <div>
            <p className="text-[0.625rem] font-semibold tracking-[0.14em] text-antique-gold uppercase">
              {productType} · {product.fragranceFamilies[0]}
            </p>
            <h3 className="mt-3 font-display text-3xl leading-none transition-colors group-hover:text-antique-gold">
              <Link href={productHref}>{product.name}</Link>
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">{product.shortDescription}</p>
          </div>
          <ArrowUpRight className="mt-1 shrink-0 text-antique-gold" aria-hidden="true" size={18} />
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs tracking-[0.08em] uppercase">
          <span className="text-muted-foreground">
            {product.volume.count > 1 ? `${product.volume.count} × ` : ""}{product.volume.value} {product.volume.unit}
          </span>
          <Price amount={product.price} currency={product.currency} />
        </div>
        <p className={`mt-3 text-xs ${inStock ? "text-caspian" : "text-muted-foreground"}`}>
          {inStock ? "Stokda" : "Stokda yoxdur"}
        </p>
        {showActions ? (
          <div className="mt-5 grid gap-2">
            <AddToCartButton productId={product.id} size="sm" className="w-full" />
            <a
              className={buttonClassName({ variant: "outline", size: "sm", className: "w-full" })}
              href={createWhatsAppUrl(`Salam. ${product.name} məhsulunu sifariş etmək istəyirəm.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp-la sifariş et
            </a>
          </div>
        ) : null}
    </article>
  );
}
