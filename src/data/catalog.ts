import type {
  CatalogGroup,
  FilterOption,
  FragranceFamily,
  Gender,
  Occasion,
  ProductSort,
  Season,
} from "@/types/product";

export const catalogGroups = [
  { id: "all", label: "Bütün məhsullar", categories: ["fragrances", "discovery-sets", "gift-sets"] },
  { id: "individual-fragrances", label: "Fərdi ətirlər", categories: ["fragrances"] },
  { id: "sets", label: "Setlər", categories: ["discovery-sets", "gift-sets"] },
] as const satisfies readonly CatalogGroup[];

export const fragranceFamilyOptions = [
  { value: "amber", label: "Kəhrəba" },
  { value: "aquatic", label: "Sulu" },
  { value: "citrus", label: "Sitrus" },
  { value: "fresh", label: "Təravətli" },
  { value: "leather", label: "Dəri" },
  { value: "oriental", label: "Şərq" },
  { value: "smoky", label: "Tüstülü" },
  { value: "spicy", label: "Ədviyyəli" },
  { value: "woody", label: "Ağacvari" },
] as const satisfies readonly FilterOption<FragranceFamily>[];

export const seasonOptions = [
  { value: "spring", label: "Yaz" },
  { value: "summer", label: "Yay" },
  { value: "autumn", label: "Payız" },
  { value: "winter", label: "Qış" },
  { value: "all-season", label: "Bütün mövsümlər" },
] as const satisfies readonly FilterOption<Season>[];

export const occasionOptions = [
  { value: "daily", label: "Gündəlik" },
  { value: "office", label: "Ofis" },
  { value: "evening", label: "Axşam" },
  { value: "special-occasion", label: "Xüsusi gün" },
] as const satisfies readonly FilterOption<Occasion>[];

export const genderOptions = [
  { value: "unisex", label: "Uniseks" },
  { value: "feminine", label: "Qadın" },
  { value: "masculine", label: "Kişi" },
] as const satisfies readonly FilterOption<Gender>[];

export const priceSortOptions = [
  { value: "display-order", label: "Tövsiyə edilən" },
  { value: "price-ascending", label: "Qiymət: aşağıdan yuxarı" },
  { value: "price-descending", label: "Qiymət: yuxarıdan aşağı" },
  { value: "name", label: "Ada görə" },
] as const satisfies readonly FilterOption<ProductSort>[];

export const stockOptions = [
  { value: "all", label: "Hamısı" },
  { value: "in-stock", label: "Stokda" },
  { value: "out-of-stock", label: "Stokda yoxdur" },
] as const;
