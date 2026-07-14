import type { MetadataRoute } from "next";

import { getAllProducts } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

const staticPaths = ["/", "/products", "/story", "/about", "/delivery", "/contact", "/privacy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  // Etibarlı məzmun yenilənmə tarixi saxlanmadığı üçün lastModified süni olaraq əlavə edilmir.
  const staticEntries = staticPaths.map((path) => ({ url: absoluteUrl(path) }));
  const productEntries = getAllProducts()
    .filter((product) => product.status === "active")
    .map((product) => ({ url: absoluteUrl(`/products/${product.slug}`) }));

  return [...staticEntries, ...productEntries];
}
