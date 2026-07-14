export type ProductCategory = "fragrances" | "discovery-sets" | "gift-sets";

export type FragranceFamily =
  | "amber"
  | "aquatic"
  | "citrus"
  | "fresh"
  | "leather"
  | "oriental"
  | "smoky"
  | "spicy"
  | "woody";

export type Gender = "unisex" | "feminine" | "masculine";

export type Season = "spring" | "summer" | "autumn" | "winter" | "all-season";

export type Occasion = "daily" | "office" | "evening" | "special-occasion";

export type ProductStatus = "draft" | "active" | "archived";

export type ProductImage = Readonly<{
  src: string;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
  available: boolean;
}>;

export type FragranceNote = Readonly<{
  name: string;
  description?: string;
  provisional: boolean;
}>;

export type ProductVolume = Readonly<{
  value: number;
  unit: "ml";
  count: number;
}>;

export type Product = Readonly<{
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  currency: "AZN";
  volume: ProductVolume;
  shortDescription: string;
  description: string;
  story: string;
  fragranceFamilies: readonly FragranceFamily[];
  gender: Gender;
  seasons: readonly Season[];
  occasions: readonly Occasion[];
  topNotes: readonly FragranceNote[];
  heartNotes: readonly FragranceNote[];
  baseNotes: readonly FragranceNote[];
  images: readonly ProductImage[];
  featured: boolean;
  bestseller: boolean;
  status: ProductStatus;
  stockQuantity: number | null;
  displayOrder: number;
}>;

export type ProductFilters = Readonly<{
  query?: string;
  categories?: readonly ProductCategory[];
  fragranceFamilies?: readonly FragranceFamily[];
  genders?: readonly Gender[];
  seasons?: readonly Season[];
  occasions?: readonly Occasion[];
  inStock?: boolean;
  status?: ProductStatus;
}>;

export type ProductSort = "display-order" | "price-ascending" | "price-descending" | "name";

export type CatalogGroupId = "all" | "individual-fragrances" | "sets";

export type CatalogGroup = Readonly<{
  id: CatalogGroupId;
  label: string;
  categories: readonly ProductCategory[];
}>;

export type FilterOption<T extends string> = Readonly<{
  value: T;
  label: string;
}>;

export type CatalogCategoryParam = "all" | "fragrances" | "sets";
export type CatalogStockParam = "all" | "in-stock" | "out-of-stock";
export type CatalogSortParam = "recommended" | "price-asc" | "price-desc" | "name";

export type CatalogQueryState = Readonly<{
  query: string;
  category: CatalogCategoryParam;
  family?: FragranceFamily;
  season?: Season;
  occasion?: Occasion;
  gender?: Gender;
  stock: CatalogStockParam;
  sort: CatalogSortParam;
}>;
