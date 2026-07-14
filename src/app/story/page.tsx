import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Moon, Wind } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { ProductCard } from "@/components/product/product-card";
import { EditorialNote } from "@/components/shared/editorial-note";
import { HeritagePattern } from "@/components/shared/heritage-pattern";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllProducts } from "@/lib/products";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Keçmişin yaddaşı, müasir qoxunun dili", description: "Useynkhan1792 adının, 1792-ci ilin və Bakının yaddaşından müasir niş parfümeriyaya uzanan yaradıcı hekayəsi.", path: "/story" });

export default function StoryPage() {
  const fragrances = getAllProducts().filter((product) => product.category === "fragrances");

  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Brendin hekayəsi"
        title="Keçmişin yaddaşı, müasir qoxunun dili"
        description="Useynkhan1792 tarixi adı muzey vitrini kimi deyil, Bakının yaşayan xarakterini müasir niş parfümeriya vasitəsilə ifadə edən yaradıcı başlanğıc kimi qəbul edir."
        breadcrumbs={[{ label: "Ana səhifə", href: "/" }, { label: "Brendin hekayəsi" }]}
      />

      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-24">
            <div className="relative overflow-hidden border-y border-border py-12">
              <p className="font-display text-[clamp(7rem,20vw,14rem)] leading-[0.7] tracking-[-0.07em] text-antique-gold/35">1792</p>
              <HeritagePattern className="mt-12 w-full opacity-20" />
            </div>
            <div>
              <p className="text-eyebrow text-antique-gold">Adın başlanğıcı</p>
              <h2 className="text-heading-lg mt-7">Bir tarixdən brend yaddaşına</h2>
              <div className="mt-8 space-y-5 leading-8 text-muted-foreground">
              <p>1792 Useynqulu xanın doğum ilidir. Bu tarix brendin adında ailə yaddaşı ilə müasir yaradıcı ifadə arasında əlaqə yaradır.</p>
                <p>Rəqəm burada keçmişə nostalji baxışdan daha çox, yadda saxlanılan bir başlanğıcı və Bakıya bağlılığın davamlılığını bildirir.</p>
              </div>
              <div className="mt-9 max-w-lg"><EditorialNote /></div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="dark" spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
            <div>
              <p className="text-eyebrow text-antique-gold">Bakı xanlığının yaddaşı</p>
              <h2 className="text-heading-lg mt-7">Şəhərin iradəsini xatırladan ad</h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-stone sm:text-lg">
              <p>Useynqulu xan Bakı xanı idi. Onun adı şəhərin siyasi, mədəni və tarixi yaddaşının bir hissəsi kimi ailə irsində qorunur.</p>
              <p>Useynkhan1792 bu yaddaşı bir hadisənin dramatik təsvirinə endirmir. Müstəqillik və iradə mövzuları brendin yaradıcı baxışında Bakının öz xarakterini qorumaq qabiliyyətini ifadə edən təmkinli anlayışlardır.</p>
              <p>Tarix satış dekoru deyil; brendə məsuliyyət, ölçü və mənşə hissi verən sakit bir təməldir.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface" spacing="lg">
        <Container wide>
          <SectionHeading
            eyebrow="Qoxuya çevrilən şəhər"
            title="Bakı hər dəfə başqa cür hiss olunur"
            description="Kolleksiya şəhərin tək bir obrazını deyil, günün və məkanın dəyişməsi ilə yaranan ayrı-ayrı təəssüratları izləyir."
          />
          <div className="mt-16 grid gap-px bg-border md:grid-cols-2">
            <article className="min-h-72 bg-surface p-9 sm:p-12">
              <Wind className="text-caspian" aria-hidden="true" size={26} strokeWidth={1.4} />
              <h3 className="mt-10 font-display text-4xl">Xəzərin nəfəsi</h3>
              <p className="mt-5 max-w-md leading-8 text-muted-foreground">Sahilə enən külək, açıq üfüq və suyun şəhər ritminə gətirdiyi təmizlik hissi.</p>
            </article>
            <article className="min-h-72 bg-dark-section p-9 text-dark-foreground sm:p-12">
              <Moon className="text-antique-gold" aria-hidden="true" size={26} strokeWidth={1.4} />
              <h3 className="mt-10 font-display text-4xl">Gecə Bakısı</h3>
              <p className="mt-5 max-w-md leading-8 text-stone">Daş küçələr, uzanan kölgələr və şəhərin işıqlar altında daha sakit görünən siması.</p>
            </article>
            <article className="min-h-64 bg-background p-9 sm:p-12">
              <p className="text-eyebrow text-antique-gold">Daş</p>
              <h3 className="mt-7 font-display text-4xl">Memarlığın təmkini</h3>
              <p className="mt-5 max-w-md leading-8 text-muted-foreground">İsti rəngli səthlər, həyətlər və zamanın şəhər üzərində saxladığı incə izlər.</p>
            </article>
            <article className="min-h-64 bg-surface p-9 sm:p-12">
              <p className="text-eyebrow text-caspian">Dəyişmə</p>
              <h3 className="mt-7 font-display text-4xl">Yaşayan şəhər</h3>
              <p className="mt-5 max-w-md leading-8 text-muted-foreground">Keçmişlə müasirliyin bir-birini örtmədən eyni ritmdə yaşadığı çoxqatlı Bakı.</p>
            </article>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container wide>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Four Scents of Baku" title="Dörd ayrı Bakı təəssüratı" />
            <Link className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.14em] uppercase hover:text-antique-gold" href="/products">
              Tam kolleksiya <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
            {fragrances.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </Container>
      </Section>

      <Section tone="dark" spacing="lg">
        <Container>
          <div className="text-center">
            <p className="text-eyebrow text-antique-gold">Hekayədən qoxuya</p>
            <h2 className="text-heading-lg mx-auto mt-7 max-w-3xl text-balance">Bakının dörd ovqatını öz ritminizdə kəşf edin</h2>
            <LinkButton className="mt-10" href="/products" variant="secondary" size="lg">Kolleksiyaya keç</LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
