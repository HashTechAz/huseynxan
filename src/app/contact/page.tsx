import type { Metadata } from "next";
import { Clock3, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Əlaqə", description: "Məhsul, sifariş və çatdırılma sualları üçün Useynkhan1792 ilə WhatsApp və telefon vasitəsilə əlaqə saxlayın.", path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Bizimlə əlaqə"
        title="Əlaqə"
        description="Məhsul seçimi, sifariş və çatdırılma barədə suallarınızı WhatsApp vasitəsilə cavablandırmağa hazırıq."
        breadcrumbs={[{ label: "Ana səhifə", href: "/" }, { label: "Əlaqə" }]}
      />
      <Section spacing="lg">
        <Container>
          <div className="grid gap-px bg-border sm:grid-cols-2">
            <article className="bg-background p-8 sm:p-10">
              <MessageCircle className="text-caspian" aria-hidden="true" size={25} strokeWidth={1.4} />
              <h2 className="mt-8 font-display text-3xl">WhatsApp</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Məhsul, sifariş və çatdırılma haqqında birbaşa yazın.</p>
              <a className={buttonClassName({ variant: "whatsapp", className: "mt-7" })} href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp-da yazın</a>
            </article>
            <article className="bg-surface p-8 sm:p-10">
              <Phone className="text-antique-gold" aria-hidden="true" size={25} strokeWidth={1.4} />
              <h2 className="mt-8 font-display text-3xl">Telefon</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Mobil cihazdan nömrəyə birbaşa zəng edə bilərsiniz.</p>
              <a className="mt-7 inline-block font-display text-2xl hover:text-antique-gold" href={`tel:+${siteConfig.whatsappNumber}`}>{siteConfig.whatsappDisplayNumber}</a>
            </article>
            {siteConfig.instagramUrl ? (
              <article className="bg-surface p-8 sm:p-10">
                <Instagram className="text-antique-gold" aria-hidden="true" size={25} strokeWidth={1.4} />
                <h2 className="mt-8 font-display text-3xl">Instagram</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">Brend yenilikləri üçün Instagram səhifəmizi izləyin.</p>
                <a className="mt-7 inline-block text-sm font-semibold tracking-[0.1em] uppercase hover:text-antique-gold" href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram-a keç</a>
              </article>
            ) : null}
            <article className="bg-background p-8 sm:p-10">
              <MapPin className="text-caspian" aria-hidden="true" size={25} strokeWidth={1.4} />
              <h2 className="mt-8 font-display text-3xl">Məkan</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Bakı, Azərbaycan</p>
              <div className="mt-7 flex items-start gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
                <Clock3 aria-hidden="true" className="mt-0.5 shrink-0" size={17} />
                <p>İş saatları üçün WhatsApp vasitəsilə əlaqə saxlayın.</p>
              </div>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
