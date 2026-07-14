import type { Metadata } from "next";
import { Banknote, CheckCircle2, Clock3, MessageCircle, PackagePlus, ShoppingBag, Truck } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({ title: "Çatdırılma və ödəniş", description: "Useynkhan1792 sifarişlərinin Bakı və Sumqayıt üzrə çatdırılma, WhatsApp təsdiqi və nağd ödəniş şərtləri.", path: "/delivery" });

const deliveryDetails = [
  { title: "Çatdırılma ərazisi", description: "Çatdırılma Bakı və Sumqayıt ərazisində mümkündür.", icon: Truck },
  { title: "Vaxtın müəyyən edilməsi", description: "Çatdırılma vaxtı sifariş WhatsApp-da təsdiqlənərkən müəyyən olunur.", icon: Clock3 },
  { title: "Çatdırılma haqqı", description: "Çatdırılma haqqı WhatsApp vasitəsilə ayrıca dəqiqləşdirilir.", icon: MessageCircle },
  { title: "Nağd ödəniş", description: "Ödəniş çatdırılma zamanı nağd şəkildə edilir. Onlayn ödəniş hazırda mövcud deyil.", icon: Banknote },
] as const;

const steps = [
  { title: "Məhsulu seçin", description: "Kolleksiyadan sizə uyğun ətri və ya seti kəşf edin.", icon: CheckCircle2 },
  { title: "Səbətə əlavə edin", description: "Məhsulu və istədiyiniz sayı səbətinizdə yoxlayın.", icon: PackagePlus },
  { title: "Sifarişi göndərin", description: "Hazır sifariş məlumatını WhatsApp vasitəsilə bizə göndərin.", icon: MessageCircle },
  { title: "Vaxtı təsdiqləyin", description: "Çatdırılma şəhəri, ünvanı, haqqı və uyğun vaxtı dəqiqləşdirin.", icon: Clock3 },
] as const;

export default function DeliveryPage() {
  return (
    <>
      <PageHero
        eyebrow="Sifariş məlumatı"
        title="Çatdırılma və ödəniş"
        description="Sifarişdən çatdırılmaya qədər prosesi sadə və aydın saxlayırıq. Yekun detallar WhatsApp söhbətində təsdiqlənir."
        breadcrumbs={[{ label: "Ana səhifə", href: "/" }, { label: "Çatdırılma və ödəniş" }]}
      />

      <Section spacing="lg">
        <Container wide>
          <SectionHeading eyebrow="Əsas məlumatlar" title="Sifarişdən əvvəl bilməli olduqlarınız" />
          <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-4">
            {deliveryDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <article className="bg-background p-8" key={detail.title}>
                  <Icon className="text-caspian" aria-hidden="true" size={24} strokeWidth={1.4} />
                  <h2 className="mt-7 font-display text-3xl">{detail.title}</h2>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">{detail.description}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-10 border-l border-antique-gold/50 pl-5 text-sm leading-7 text-muted-foreground">
            Sifariş WhatsApp-da təsdiqlənməyənə qədər yekun sayılmır.
          </div>
        </Container>
      </Section>

      <Section tone="surface" spacing="lg">
        <Container wide>
          <SectionHeading eyebrow="Dörd sadə addım" title="Sifariş necə işləyir?" align="center" />
          <ol className="mt-16 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li className="relative bg-surface p-8" key={step.title}>
                  <span className="font-display text-6xl text-antique-gold/25">0{index + 1}</span>
                  <Icon className="mt-8 text-antique-gold" aria-hidden="true" size={22} strokeWidth={1.4} />
                  <h3 className="mt-6 font-display text-3xl">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{step.description}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton href="/products" size="lg"><ShoppingBag aria-hidden="true" size={16} /> Məhsullara bax</LinkButton>
            <LinkButton href="/contact" variant="outline" size="lg">Bizimlə əlaqə</LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
