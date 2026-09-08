import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Instagram,
  Landmark,
  MessageCircle,
  PackageCheck,
  Sparkles,
  Truck,
  Waves,
} from "lucide-react";

import { HomeHero } from "@/components/home/home-hero";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { FounderImageSlot } from "@/components/shared/founder-image-slot";
import { HeritagePattern } from "@/components/shared/heritage-pattern";
import { JsonLd } from "@/components/shared/json-ld";
import { Badge } from "@/components/ui/badge";
import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { LinkButton } from "@/components/ui/link-button";
import { Price } from "@/components/ui/price";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { brand } from "@/data/brand";
import { getProductBySlug } from "@/lib/products";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

export const metadata: Metadata = createPageMetadata({
  title: "Bakının yaddaşından doğan niş ətirlər",
  description: "Useynkhan1792 — Bakı tarixi, Xəzər nəfəsi və müasir niş parfümeriyanı bir araya gətirən Four Scents of Baku kolleksiyası.",
  path: "/",
});

function requireProduct(slug: string): Product {
  const product = getProductBySlug(slug);
  if (!product) throw new Error(`Ana səhifə üçün məhsul tapılmadı: ${slug}`);
  return product;
}

const values = [
  {
    title: "Tarixi irs",
    description: "Keçmişi dekor kimi deyil, şəhərin yaşayan yaddaşı kimi qəbul edən yanaşma.",
    icon: Landmark,
  },
  {
    title: "Bakıdan ilham",
    description: "Daş memarlıq, Xəzər küləyi və şəhərin dəyişən ritmindən yaranan emosional dil.",
    icon: Waves,
  },
  {
    title: "Niş kompozisiyalar",
    description: "Fərqli ovqatlar üçün düşünülmüş, xarakterli və ölçülü parfümeriya dünyası.",
    icon: Sparkles,
  },
] as const;

const deliveryItems = [
  { title: "Çatdırılma", detail: "Bakı və Sumqayıt", icon: Truck },
  { title: "Ödəniş", detail: "Yerində nağd ödəniş", icon: Banknote },
  { title: "Təsdiq", detail: "Sifariş WhatsApp-da təsdiqlənir", icon: PackageCheck },
  { title: "Çatdırılma haqqı", detail: "WhatsApp-da dəqiqləşir", icon: MessageCircle },
] as const;

const fragranceProfileCopy = [
  {
    slug: "baku-nights",
    index: "01",
    family: "Oriental",
    description: "Dərin, isti və sirli axşam xarakteri.",
    imageSrc: "/images/products/baku-nights/baku-nights-profile.webp",
    imageAlt: "Baku Nights ətir flakonu isti Bakı daşı fonunda",
  },
  {
    slug: "black-town",
    index: "02",
    family: "Smoky",
    description: "Güclü, qaranlıq və sənaye ruhlu xarakter.",
    imageSrc: "/images/products/black-town/black-town-profile.webp",
    imageAlt: "Black Town ətir flakonu isti Bakı daşı fonunda",
  },
  {
    slug: "caspian-wave",
    index: "03",
    family: "Aquatic",
    description: "Təmiz, azad və enerjili xarakter.",
    imageSrc: "/images/products/caspian-wave/caspian-wave-profile.webp",
    imageAlt: "Caspian Wave ətir flakonu isti Bakı daşı fonunda",
  },
  {
    slug: "kings-town",
    index: "04",
    family: "Woody",
    description: "Nəcib, balanslı və xarakterli imza.",
    imageSrc: "/images/products/kings-town/kings-town-profile.webp",
    imageAlt: "King’s Town ətir flakonu isti Bakı daşı fonunda",
  },
] as const;

export default function HomePage() {
  const fragranceProfiles = fragranceProfileCopy.map((profile) => ({
    ...profile,
    product: requireProduct(profile.slug),
  }));
  const featured = requireProduct("kings-town");
  const discoverySet = requireProduct("four-scents-of-baku");
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: absoluteUrl("/"),
    description: "Bakı irsindən ilhamlanan premium niş ətir brendi.",
    address: { "@type": "PostalAddress", addressLocality: "Bakı", addressCountry: "AZ" },
    contactPoint: { "@type": "ContactPoint", telephone: siteConfig.whatsappDisplayNumber, contactType: "customer service", availableLanguage: "az", areaServed: "AZ" },
    ...(siteConfig.instagramUrl ? { sameAs: [siteConfig.instagramUrl] } : {}),
  };

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <HomeHero />

      <Section id="kolleksiya" spacing="lg">
        <Container wide>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="The Four Scents of Baku"
              title="Şəhərin dörd fərqli ovqatı"
              description="Gecənin sirrindən Xəzərin açıq nəfəsinə qədər — dörd fərqli kompozisiya, bir kolleksiyada."
            />
            <Link className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:text-antique-gold" href="/products/four-scents-of-baku">
              Kolleksiyanı kəşf et <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
            {fragranceProfiles.map(({ product, index, family, description, imageSrc, imageAlt }) => {
              return (
                <article key={product.id}>
                  <div className="relative aspect-[4/5] overflow-hidden border border-border bg-surface">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-6">
                    <p className="text-[0.625rem] font-semibold tracking-[0.14em] text-antique-gold uppercase">
                      {index} · {family}
                    </p>
                    <h3 className="mt-3 font-display text-3xl leading-none">{product.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-16 grid gap-8 border-t border-border pt-9 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-[0.625rem] font-semibold tracking-[0.18em] text-antique-gold uppercase">
                Useynkhan 1792
              </p>
              <h3 className="mt-3 font-display text-3xl">Signature Set</h3>
              <p className="mt-4 text-xs tracking-[0.12em] text-muted-foreground uppercase">
                4 × 13 ml · Eau de Parfum
              </p>
              <p className="mt-4 text-sm text-muted-foreground">Dörd ətir. Bir kolleksiya.</p>
            </div>
            <LinkButton href="/products/four-scents-of-baku" variant="outline">
              Seti kəşf et
            </LinkButton>
          </div>
        </Container>
      </Section>

      <Section tone="surface" spacing="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-24">
            <div className="relative aspect-[89/69] overflow-hidden border border-border bg-background">
              <Image
                src="/images/story/four-scents-heritage-set.webp"
                alt="Useynkhan1792 Four Scents of Baku kolleksiyasının açıq qutuda dörd ətiri"
                fill
                sizes="(min-width: 1280px) 32rem, (min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow="Brendin hekayəsi"
                title="Bakının yaddaşından doğan bir ad"
              />
              <div className="mt-8 space-y-5 leading-8 text-muted-foreground">
                <p>
                  1792 Useynqulu xanın doğum ilidir. Bakı xanı kimi onun adı şəhərin tarixi iradəsi və yaddaşı ilə bağlıdır.
                </p>
                <p>
                  Useynkhan1792 bu tarixi adı müasir niş parfümeriya dili ilə davam etdirir; keçmişi romantikləşdirmədən, Bakının daşında, küləyində və çoxqatlı xarakterində yaşayan izlərə diqqət yönəldir.
                </p>
              </div>
              <LinkButton className="mt-10" href="/story" variant="outline">
                Hekayəni oxu <ArrowRight aria-hidden="true" size={15} />
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="dark" spacing="lg">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden border border-stone/20 bg-dark-section">
              <Image
                src="/images/products/kings-town/kings-town-editorial.webp"
                alt="King’s Town ətri və Useynkhan1792 kolleksiyasının kraft qablaşdırması"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="max-w-xl">
              <p className="text-eyebrow text-antique-gold">Seçilmiş ətir</p>
              <h2 className="text-display-lg mt-7">{featured.name}</h2>
              <p className="mt-3 font-display text-2xl text-stone">{featured.subtitle}</p>
              <p className="mt-8 leading-8 text-stone">{featured.story}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {(["Nəcib", "Balanslı", "Xarakterli"] as const).map((tag) => (
                  <Badge className="border-stone/30 text-stone" key={tag}>{tag}</Badge>
                ))}
              </div>
              <div className="mt-10 flex items-center gap-7">
                <Price className="font-display text-3xl" amount={featured.price} currency={featured.currency} />
                <LinkButton href={`/products/${featured.slug}`} variant="secondary">
                  Məhsula bax <ArrowRight aria-hidden="true" size={15} />
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container wide>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
            <div className="max-w-xl">
              <p className="text-eyebrow text-caspian">Discovery Set</p>
              <h2 className="text-heading-lg mt-7 text-balance">Dörd qoxu. Dörd Bakı təəssüratı.</h2>
              <p className="mt-7 leading-8 text-muted-foreground">{discoverySet.description}</p>
              <div className="mt-8 flex items-center gap-6 border-y border-border py-5">
                <span className="text-sm text-muted-foreground">4 × 13 ml</span>
                <Divider className="w-10" />
                <Price className="font-display text-3xl" amount={discoverySet.price} currency={discoverySet.currency} />
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <AddToCartButton productId={discoverySet.id} size="lg" />
                <LinkButton href={`/products/${discoverySet.slug}`} variant="outline" size="lg">
                  Ətraflı bax
                </LinkButton>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden border border-border bg-surface">
              <Image
                src="/images/products/four-scents-of-baku/discovery-set-packaging.webp"
                alt="Useynkhan1792 Four Scents of Baku Discovery Set kraft qutusu"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface" spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-24">
            <FounderImageSlot />
            <div>
              <p className="text-eyebrow text-antique-gold">Qurucu</p>
              <h2 className="text-heading-lg mt-7">İrsin davamı</h2>
              <p className="mt-7 font-display text-3xl">Paris Malik Useynqulu xan qızı</p>
              <p className="mt-7 max-w-2xl leading-8 text-muted-foreground">
                Useynkhan1792 brendinin qurucusu və Useynqulu xanın nəslinin nümayəndəsidir. Brend vasitəsilə ailə yaddaşını, Bakının tarixi xarakterini və müasir niş parfümeriyanı bir araya gətirir.
              </p>
              <LinkButton className="mt-10" href="/about" variant="outline">
                Haqqımızda <ArrowRight aria-hidden="true" size={15} />
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container wide>
          <SectionHeading eyebrow="Yanaşmamız" title="Yaddaşdan müasir ifadəyə" align="center" />
          <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
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

      <Section tone="surface">
        <Container wide>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Sifariş və çatdırılma" title="Sadə və şəffaf sifariş prosesi" />
            <Link className="text-xs font-semibold tracking-[0.14em] uppercase hover:text-antique-gold" href="/delivery">
              Ətraflı məlumat
            </Link>
          </div>
          <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-4">
            {deliveryItems.map((item) => {
              const Icon = item.icon;
              return (
                <div className="bg-surface p-7" key={item.title}>
                  <Icon className="text-caspian" aria-hidden="true" size={21} strokeWidth={1.5} />
                  <h3 className="mt-6 text-sm font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="dark" spacing="lg">
        <Container>
          <div className="relative overflow-hidden text-center">
            <HeritagePattern className="absolute top-0 left-1/2 w-[35rem] -translate-x-1/2 opacity-[0.12]" />
            <MessageCircle className="relative mx-auto text-antique-gold" aria-hidden="true" size={27} strokeWidth={1.4} />
            <h2 className="text-heading-lg relative mt-8 text-balance">Seçiminizi birlikdə dəqiqləşdirək</h2>
            <p className="relative mx-auto mt-6 max-w-xl leading-8 text-stone">
              Məhsullar, çatdırılma və sifariş haqqında suallarınızı birbaşa WhatsApp vasitəsilə cavablandıraq.
            </p>
            <a className={buttonClassName({ variant: "secondary", size: "lg", className: "relative mt-10" })} href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
              WhatsApp ilə əlaqə saxla
            </a>
          </div>
        </Container>
      </Section>

      {siteConfig.instagramUrl ? (
        <Section spacing="lg">
          <Container>
            <div className="grid gap-10 border-y border-border py-14 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-eyebrow text-antique-gold">{brand.slogan}</p>
                <h2 className="text-heading-md mt-6">Brendin vizual dünyasını izləyin</h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">Kolleksiya yenilikləri və Bakıdan ilhamlanan hekayələr üçün bizi Instagram-da izləyin.</p>
              </div>
              <a className={buttonClassName({ variant: "outline", size: "lg" })} href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">
                <Instagram aria-hidden="true" size={17} /> Instagram-da izlə
              </a>
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
