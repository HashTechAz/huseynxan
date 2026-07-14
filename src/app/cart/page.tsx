import type { Metadata } from "next";

import { CartPageContent } from "@/components/cart/cart-page-content";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Səbət", description: "Useynkhan1792 səbətinizdəki məhsulları nəzərdən keçirin və sifarişi WhatsApp vasitəsilə tamamlayın.", path: "/cart", noIndex: true });

export default function CartPage() {
  return (
    <>
      <PageHero
        eyebrow="Sifariş"
        title="Səbət"
        description="Seçdiyiniz məhsulları nəzərdən keçirin və sifarişi WhatsApp vasitəsilə tamamlayın."
        breadcrumbs={[{ label: "Ana səhifə", href: "/" }, { label: "Səbət" }]}
      />
      <Section spacing="md">
        <Container wide>
          <CartPageContent />
        </Container>
      </Section>
    </>
  );
}
