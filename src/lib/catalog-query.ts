import {
  fragranceFamilyOptions,
  genderOptions,
  occasionOptions,
  seasonOptions,
} from "@/data/catalog";
import type {
  CatalogCategoryParam,
  CatalogQueryState,
  CatalogSortParam,
  CatalogStockParam,
  FragranceFamily,
  Gender,
  Occasion,
  ProductFilters,
  ProductSort,
  Season,
} from "@/types/product";

export type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function optionalAllowed<T extends string>(value: string | undefined, allowed: readonly T[]): T | undefined {
  return value && allowed.includes(value as T) ? (value as T) : undefined;
}

const categories: readonly CatalogCategoryParam[] = ["all", "fragrances", "sets"];
const stocks: readonly CatalogStockParam[] = ["all", "in-stock", "out-of-stock"];
const sorts: readonly CatalogSortParam[] = ["recommended", "price-asc", "price-desc", "name"];

export function parseCatalogQuery(params: RawSearchParams): CatalogQueryState {
  const category = optionalAllowed(firstValue(params.category), categories) ?? "all";
  const stock = optionalAllowed(firstValue(params.stock), stocks) ?? "all";
  const sort = optionalAllowed(firstValue(params.sort), sorts) ?? "recommended";

  return {
    query: firstValue(params.q)?.trim().slice(0, 100) ?? "",
    category,
    family: optionalAllowed(
      firstValue(params.family),
      fragranceFamilyOptions.map((option) => option.value) as readonly FragranceFamily[],
    ),
    season: optionalAllowed(
      firstValue(params.season),
      seasonOptions.map((option) => option.value) as readonly Season[],
    ),
    occasion: optionalAllowed(
      firstValue(params.occasion),
      occasionOptions.map((option) => option.value) as readonly Occasion[],
    ),
    gender: optionalAllowed(
      firstValue(params.gender),
      genderOptions.map((option) => option.value) as readonly Gender[],
    ),
    stock,
    sort,
  };
}

export function catalogStateToFilters(state: CatalogQueryState): ProductFilters {
  return {
    query: state.query || undefined,
    categories:
      state.category === "fragrances"
        ? ["fragrances"]
        : state.category === "sets"
          ? ["discovery-sets", "gift-sets"]
          : undefined,
    fragranceFamilies: state.family ? [state.family] : undefined,
    seasons: state.season ? [state.season] : undefined,
    occasions: state.occasion ? [state.occasion] : undefined,
    genders: state.gender ? [state.gender] : undefined,
    inStock: state.stock === "all" ? undefined : state.stock === "in-stock",
    status: "active",
  };
}

export function catalogStateToSort(state: CatalogQueryState): ProductSort {
  const mapping: Record<CatalogSortParam, ProductSort> = {
    recommended: "display-order",
    "price-asc": "price-ascending",
    "price-desc": "price-descending",
    name: "name",
  };
  return mapping[state.sort];
}

export function countActiveFilters(state: CatalogQueryState) {
  return [
    state.category !== "all",
    Boolean(state.family),
    Boolean(state.season),
    Boolean(state.occasion),
    Boolean(state.gender),
    state.stock !== "all",
  ].filter(Boolean).length;
}
