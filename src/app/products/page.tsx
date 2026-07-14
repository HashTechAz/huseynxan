import type { Metadata } from "next";
import { SearchX } from "lucide-react";

import { CatalogControls } from "@/components/catalog/catalog-controls";
import { PageHero } from "@/components/layout/page-hero";
import { ProductCard } from "@/components/product/product-card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { LinkButton } from "@/components/ui/link-button";
import { Section } from "@/components/ui/section";
import {
  catalogStateToFilters,
  catalogStateToSort,
  countActiveFilters,
  parseCatalogQuery,
  type RawSearchParams,
} from "@/lib/catalog-query";
import { filterProducts, getAllProducts, sortProducts } from "@/lib/products";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Məhsullar — Four Scents of Baku", description: "Bakının fərqli yaddaş və hisslərini ifadə edən Useynkhan1792 premium niş ətir kolleksiyasını və kəşf dəstini kəşf edin.", path: "/products" });

type ProductsPageProps = {
  searchParams: Promise<RawSearchParams>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const state = parseCatalogQuery(await searchParams);
  const filteredProducts = filterProducts(getAllProducts(), catalogStateToFilters(state));
  const visibleProducts = sortProducts(filteredProducts, catalogStateToSort(state));
  const activeFilterCount = countActiveFilters(state);

  return (
    <>
      <PageHero
        eyebrow="Four Scents of Baku"
        title="Məhsullar"
        description="Bakının fərqli yaddaş və hisslərini ifadə edən Useynkhan1792 kolleksiyasını kəşf edin."
        breadcrumbs={[{ label: "Ana səhifə", href: "/" }, { label: "Məhsullar" }]}
      />
      <Section spacing="md">
        <Container wide>
          <p className="mb-10 text-sm text-muted-foreground" aria-live="polite">
            <span className="font-semibold text-foreground">{visibleProducts.length}</span> məhsul tapıldı
          </p>
          <div className="lg:grid lg:grid-cols-[17rem_1fr] lg:gap-10 xl:gap-14">
            <CatalogControls state={state} activeFilterCount={activeFilterCount} />
            <div>
              {visibleProducts.length > 0 ? (
                <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} imageSizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" showActions />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<SearchX size={28} strokeWidth={1.4} />}
                  title="Uyğun məhsul tapılmadı"
                  description="Axtarış sözünü və ya seçilmiş filtrləri dəyişərək yenidən cəhd edin."
                  action={<LinkButton href="/products" variant="outline">Filtrləri sıfırla</LinkButton>}
                />
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
