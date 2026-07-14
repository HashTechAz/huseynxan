import type { Metadata } from "next";
import { Compass, Fingerprint, Landmark, Sparkles } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { EditorialNote } from "@/components/shared/editorial-note";
import { FounderImageSlot } from "@/components/shared/founder-image-slot";
import { HeritagePattern } from "@/components/shared/heritage-pattern";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { brand } from "@/data/brand";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "İrsin davamı — Haqqımızda", description: "Useynkhan1792 brendinin missiyası, qurucusu Paris Malik Hüseynqulu xan qızı və Bakıdan ilhamlanan dəyərləri.", path: "/about" });

const values = [
  { title: "Tarixə hörmət", description: "Tarixi sensasiyaya çevirmədən, mənşəyə ölçülü və məsuliyyətli münasibət.", icon: Landmark },
  { title: "Yaradıcı interpretasiya", description: "Yaddaşı müasir qoxu dili ilə yenidən düşünən, lakin faktla təsəvvürü qarışdırmayan yanaşma.", icon: Sparkles },
  { title: "Bakıdan ilham", description: "Xəzər, daş memarlıq, külək və şəhərin dəyişən ritmindən gələn yaradıcı istiqamət.", icon: Compass },
  { title: "Şəxsi və seçilən qoxular", description: "Kütləvi təəssüratdan uzaq, fərdi xarakterlə tamamlanan niş kompozisiyalar.", icon: Fingerprint },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Useynkhan1792 haqqında"
        title="İrsin davamı"
        description="Ailə yaddaşını, Bakının tarixi xarakterini və müasir niş parfümeriyanı eyni, təmkinli yaradıcı dildə bir araya gətirən brend."
        breadcrumbs={[{ label: "Ana səhifə", href: "/" }, { label: "Haqqımızda" }]}
      />

      <Section spacing="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
            <div className="relative min-h-96 overflow-hidden bg-dark-section p-9 text-dark-foreground sm:p-12">
              <HeritagePattern className="absolute right-[-8rem] bottom-10 w-[35rem] opacity-[0.14]" />
              <p className="text-eyebrow text-antique-gold">Missiyamız</p>
              <p className="relative mt-10 font-display text-4xl leading-tight sm:text-5xl">
                Bakının yaddaşını müasir, şəxsi və seçilən qoxularla ifadə etmək.
              </p>
            </div>
            <div>
              <SectionHeading eyebrow={brand.slogan} title="Tarixdən gələn, bu gün üçün yaradılan" />
              <div className="mt-8 space-y-5 leading-8 text-muted-foreground">
                <p>Useynkhan1792 keçmişi təkrarlamaq deyil, onun yaddaşda buraxdığı hissi müasir parfümeriya dili ilə ifadə etmək məqsədi daşıyır.</p>
                <p>Brend üçün Bakı sadəcə mənşə deyil; Xəzərin nəfəsi, daş küçələrin təmkini və yaşayan şəhərin dəyişkən xarakterindən ibarət yaradıcı mənbədir.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface" spacing="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-24">
            <FounderImageSlot />
            <div>
              <p className="text-eyebrow text-antique-gold">Qurucu</p>
              <h2 className="text-heading-lg mt-7">Paris Malik Hüseynqulu xan qızı</h2>
              <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Useynkhan1792 brendinin qurucusu və Hüseynqulu xanın nəslinin nümayəndəsi Paris Malik Hüseynqulu xan qızı ailə yaddaşını, Bakının tarixi xarakterini və müasir niş parfümeriyanı bir araya gətirir.
              </p>
              <div className="mt-9 max-w-lg"><EditorialNote /></div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container wide>
          <SectionHeading eyebrow="Brend dəyərləri" title="Yaradıcı istiqamətimizin dörd dayağı" align="center" />
          <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article className="bg-background p-8 sm:p-10" key={value.title}>
                  <Icon className="text-antique-gold" aria-hidden="true" size={24} strokeWidth={1.4} />
                  <h3 className="mt-8 font-display text-3xl">{value.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">{value.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="dark" spacing="lg">
        <Container>
          <div className="text-center">
            <p className="text-eyebrow text-antique-gold">{brand.slogan}</p>
            <h2 className="text-heading-lg mx-auto mt-7 max-w-3xl text-balance">Bakının fərqli ovqatlarını daşıyan kolleksiya ilə tanış olun</h2>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <LinkButton href="/products" variant="secondary" size="lg">Məhsullara bax</LinkButton>
              <LinkButton href="/story" variant="outline" size="lg" className="border-stone/40 text-dark-foreground hover:border-dark-foreground">Brendin hekayəsi</LinkButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
