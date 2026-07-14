import { getAllProducts, formatProductVolume, getProductImageSrc } from "@/lib/products";
import type { CartItem } from "@/types/cart";
import type { WhatsAppCartLine } from "@/lib/whatsapp";
import { clampCartQuantity } from "@/lib/cart-reducer";
import { isProductInStock } from "@/lib/products";

export function getCurrentCartItem(productId: string, quantity: number): CartItem | undefined {
  const product = getAllProducts().find(
    (candidate) => candidate.id === productId && candidate.status === "active",
  );
  if (!product) return undefined;

  const image = product.images[0];
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    currency: product.currency,
    volume: formatProductVolume(product),
    image: image ? getProductImageSrc(image) : "/images/products/product-placeholder.svg",
    imageAlt: image?.alt ?? `${product.name} üçün məhsul vizualı`,
    quantity,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function resolveCartCheckoutLines(items: readonly unknown[]): readonly WhatsAppCartLine[] {
  return items.flatMap((item) => {
    if (!isRecord(item) || typeof item.productId !== "string" || typeof item.quantity !== "number") {
      return [];
    }
    const product = getAllProducts().find(
      (candidate) => candidate.id === item.productId && candidate.status === "active",
    );
    if (!product || !isProductInStock(product)) return [];

    return [{
      productId: product.id,
      name: product.name,
      volume: formatProductVolume(product),
      quantity: clampCartQuantity(item.quantity),
      unitPrice: product.price,
      currency: product.currency,
    }];
  });
}
