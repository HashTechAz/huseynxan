import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Banknote, PackageCheck, Truck } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchaseActions } from "@/components/product/product-purchase-actions";
import { HeritagePattern } from "@/components/shared/heritage-pattern";
import { JsonLd } from "@/components/shared/json-ld";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { Price } from "@/components/ui/price";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { fragranceFamilyLabel, genderLabel, occasionLabel, seasonLabel } from "@/lib/product-labels";
import {
  formatProductVolume,
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  isProductInStock,
} from "@/lib/products";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";
import type { FragranceNote, Product } from "@/types/product";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Məhsul tapılmadı", robots: { index: false, follow: false } };

  const availableImages = product.images.filter((image) => image.available);

  const primaryImage = availableImages[0];
  return createPageMetadata({
    title: `${product.name} — ${product.subtitle}`,
    description: product.description,
    path: `/products/${product.slug}`,
    image: primaryImage ? { url: primaryImage.src, width: primaryImage.width, height: primaryImage.height, alt: primaryImage.alt } : undefined,
  });
}

function NotesColumn({ title, notes }: { title: string; notes: readonly FragranceNote[] }) {
  return (
    <div className="border-t border-border pt-7">
      <h3 className="text-eyebrow text-antique-gold">{title}</h3>
      <ul className="mt-6 space-y-3">
        {notes.map((note) => <li className="font-display text-2xl" key={note.name}>{note.name}</li>)}
      </ul>
    </div>
  );
}

function ProductJsonLd({ product }: { product: Product }) {
  const inStock = isProductInStock(product);
  const availableImages = product.images
    .filter((image) => image.available)
    .map((image) => new URL(image.src, siteConfig.url).toString());
  const productUrl = new URL(`/products/${product.slug}`, siteConfig.url).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: siteConfig.name },
    ...(availableImages.length > 0 ? { image: availableImages } : {}),
    offers: {
      "@type": "Offer",
      url: productUrl,
      price: product.price,
      priceCurrency: product.currency,
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.status !== "active") notFound();

  const inStock = isProductInStock(product);
  const volume = formatProductVolume(product);
  const relatedProducts = getRelatedProducts(product, 4);
  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana səhifə", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Məhsullar", item: absoluteUrl("/products") },
      { "@type": "ListItem", position: 3, name: product.name, item: absoluteUrl(`/products/${product.slug}`) },
    ],
  };

  return (
    <>
      <ProductJsonLd product={product} />
      <JsonLd data={breadcrumbsJsonLd} />

      <Section spacing="sm">
        <Container wide>
          <Breadcrumbs
            items={[
              { label: "Ana səhifə", href: "/" },
              { label: "Məhsullar", href: "/products" },
              { label: product.name },
            ]}
          />

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 xl:gap-24">
            <ProductGallery images={product.images} productName={product.name} />

            <div className="lg:pt-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="gold">{product.category === "fragrances" ? "Fərdi ətir" : "Kəşf dəsti"}</Badge>
                <span className={`text-xs font-medium ${inStock ? "text-caspian" : "text-muted-foreground"}`}>
                  {inStock ? "Stokda" : "Stokda yoxdur"}
                </span>
              </div>
              <h1 className="text-display-lg mt-7">{product.name}</h1>
              <p className="mt-4 font-display text-2xl text-muted-foreground sm:text-3xl">{product.subtitle}</p>
              <p className="mt-7 max-w-xl leading-8 text-muted-foreground">{product.shortDescription}</p>

              <div className="mt-9 flex items-end justify-between gap-6 border-y border-border py-6">
                <div>
                  <p className="text-eyebrow text-muted-foreground">Həcm</p>
                  <p className="mt-2 text-sm">{volume}</p>
                </div>
                <Price className="font-display text-4xl" amount={product.price} currency={product.currency} />
              </div>

              <div className="mt-8">
                <p className="text-eyebrow text-muted-foreground">Qoxu ailələri</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.fragranceFamilies.map((family) => <Badge key={family}>{fragranceFamilyLabel(family)}</Badge>)}
                </div>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Gender: <span className="text-foreground">{genderLabel(product.gender)}</span>
              </p>

              <div className="mt-9">
                <ProductPurchaseActions
                  productId={product.id}
                  productName={product.name}
                  volume={volume}
                  unitPrice={product.price}
                  currency={product.currency}
                  available={inStock}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="Kompozisiya" title="Ətir notları" align="center" />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            <NotesColumn title="Üst notlar" notes={product.topNotes} />
            <NotesColumn title="Ürək notları" notes={product.heartNotes} />
            <NotesColumn title="Baza notları" notes={product.baseNotes} />
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <article className="mx-auto max-w-[68ch]">
            <p className="text-eyebrow text-antique-gold">Məhsulun hekayəsi</p>
            <h2 className="text-heading-lg mt-7">{product.subtitle}</h2>
            <Divider className="my-10" ornament />
            <p className="font-display text-2xl leading-relaxed text-muted-foreground sm:text-3xl">{product.story}</p>
          </article>
        </Container>
      </Section>

      <Section tone="dark">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-20">
            <div className="relative overflow-hidden">
              <p className="text-eyebrow text-antique-gold">İstifadə xarakteri</p>
              <h2 className="text-heading-lg mt-7">Öz anınızı seçin</h2>
              <HeritagePattern className="mt-12 w-full opacity-25" />
            </div>
            <dl className="grid gap-px bg-stone/20 sm:grid-cols-2">
              <div className="bg-dark-section p-7">
                <dt className="text-eyebrow text-antique-gold">Mövsümlər</dt>
                <dd className="mt-5 text-stone">{product.seasons.map(seasonLabel).join(" · ")}</dd>
              </div>
              <div className="bg-dark-section p-7">
                <dt className="text-eyebrow text-antique-gold">İstifadə zamanı</dt>
                <dd className="mt-5 text-stone">{product.occasions.map(occasionLabel).join(" · ")}</dd>
              </div>
              <div className="bg-dark-section p-7">
                <dt className="text-eyebrow text-antique-gold">Qoxu ailəsi</dt>
                <dd className="mt-5 text-stone">{product.fragranceFamilies.map(fragranceFamilyLabel).join(" · ")}</dd>
              </div>
              <div className="bg-dark-section p-7">
                <dt className="text-eyebrow text-antique-gold">Gender</dt>
                <dd className="mt-5 text-stone">{genderLabel(product.gender)}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="Sifariş məlumatı" title="Çatdırılma və ödəniş" />
          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            <div className="bg-surface p-7">
              <Truck className="text-caspian" aria-hidden="true" size={23} strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-2xl">Bakı və Sumqayıt</h3>
              <p className="mt-3 text-sm text-muted-foreground">Çatdırılma bu iki şəhər üzrə həyata keçirilir.</p>
            </div>
            <div className="bg-surface p-7">
              <Banknote className="text-caspian" aria-hidden="true" size={23} strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-2xl">Yerində nağd ödəniş</h3>
              <p className="mt-3 text-sm text-muted-foreground">Ödəniş məhsul çatdırılan zaman qəbul olunur.</p>
            </div>
            <div className="bg-surface p-7">
              <PackageCheck className="text-caspian" aria-hidden="true" size={23} strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-2xl">WhatsApp təsdiqi</h3>
              <p className="mt-3 text-sm text-muted-foreground">Çatdırılma haqqı WhatsApp vasitəsilə dəqiqləşir.</p>
            </div>
          </div>
        </Container>
      </Section>

      {relatedProducts.length > 0 ? (
        <Section spacing="lg">
          <Container wide>
            <SectionHeading eyebrow="Kolleksiyanı davam etdirin" title="Oxşar məhsullar" />
            <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((relatedProduct) => <ProductCard key={relatedProduct.id} product={relatedProduct} />)}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
