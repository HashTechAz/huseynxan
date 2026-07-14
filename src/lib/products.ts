import { products } from "@/data/products";
import type { Product, ProductFilters, ProductImage, ProductSort } from "@/types/product";

function hasIntersection<T>(source: readonly T[], selected: readonly T[] | undefined) {
  return !selected?.length || selected.some((value) => source.includes(value));
}

export function isProductInStock(product: Product) {
  return product.stockQuantity === null || product.stockQuantity > 0;
}

export function getAllProducts(): readonly Product[] {
  return [...products].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): readonly Product[] {
  return getAllProducts().filter((product) => product.featured && product.status === "active");
}

export function getRelatedProducts(product: Product, limit = 3): readonly Product[] {
  if (limit <= 0) return [];

  return products
    .filter((candidate) => candidate.id !== product.id && candidate.status === "active")
    .map((candidate) => ({
      product: candidate,
      score:
        (candidate.category === product.category ? 3 : 0) +
        candidate.fragranceFamilies.filter((family) => product.fragranceFamilies.includes(family)).length * 2 +
        candidate.occasions.filter((occasion) => product.occasions.includes(occasion)).length,
    }))
    .sort((a, b) => b.score - a.score || a.product.displayOrder - b.product.displayOrder)
    .slice(0, limit)
    .map(({ product: relatedProduct }) => relatedProduct);
}

export function filterProducts(
  productList: readonly Product[],
  filters: ProductFilters,
): readonly Product[] {
  return productList.filter((product) => {
    const normalizedQuery = filters.query?.trim().toLocaleLowerCase("az-AZ");
    if (
      normalizedQuery &&
      ![product.name, product.subtitle, product.shortDescription].some((value) =>
        value.toLocaleLowerCase("az-AZ").includes(normalizedQuery),
      )
    ) {
      return false;
    }
    if (filters.status && product.status !== filters.status) return false;
    if (filters.inStock !== undefined && isProductInStock(product) !== filters.inStock) return false;
    if (filters.categories?.length && !filters.categories.includes(product.category)) return false;
    if (filters.genders?.length && !filters.genders.includes(product.gender)) return false;
    if (!hasIntersection(product.fragranceFamilies, filters.fragranceFamilies)) return false;
    if (!hasIntersection(product.seasons, filters.seasons)) return false;
    if (!hasIntersection(product.occasions, filters.occasions)) return false;
    return true;
  });
}

export function sortProducts(
  productList: readonly Product[],
  sort: ProductSort = "display-order",
): readonly Product[] {
  return [...productList].sort((a, b) => {
    switch (sort) {
      case "price-ascending":
        return a.price - b.price || a.displayOrder - b.displayOrder;
      case "price-descending":
        return b.price - a.price || a.displayOrder - b.displayOrder;
      case "name":
        return a.name.localeCompare(b.name, "az");
      case "display-order":
        return a.displayOrder - b.displayOrder;
    }
  });
}

export function formatPrice(price: number, currency: Product["currency"] = "AZN") {
  return new Intl.NumberFormat("az-AZ", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function getProductImageSrc(image: ProductImage) {
  return image.available ? image.src : image.fallbackSrc;
}

export function formatProductVolume(product: Product) {
  const unitVolume = `${product.volume.value} ${product.volume.unit}`;
  return product.volume.count > 1 ? `${product.volume.count} × ${unitVolume}` : unitVolume;
}
