import { ArrowDownRight } from "lucide-react";

import { HeritagePattern } from "@/components/shared/heritage-pattern";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[clamp(38rem,72vh,52rem)] overflow-hidden bg-dark-section text-dark-foreground">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,var(--dark-section)_0%,rgb(33_28_24/0.94)_48%,rgb(33_28_24/0.58)_100%)]" />
      <div className="absolute inset-y-0 right-0 -z-30 w-full bg-stone/10 lg:w-[58%]" aria-hidden="true" />
      <HeritagePattern className="absolute right-[-8rem] bottom-14 -z-10 w-[44rem] opacity-[0.16]" />
      <Container className="flex min-h-[clamp(38rem,72vh,52rem)] items-center py-20 sm:py-24" wide>
        <div className="reveal max-w-4xl">
          <p className="text-eyebrow text-antique-gold">Bakının yaddaşından doğan niş ətirlər</p>
          <h1 className="text-display-lg mt-8 max-w-4xl text-balance">
            Bir şəhərin yaddaşı, dörd fərqli qoxu.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-stone sm:text-lg">
            Useynkhan1792 Bakı tarixinin, Xəzər nəfəsinin və müasir niş parfümeriyanın bir araya gəldiyi ətir kolleksiyasıdır.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="#kolleksiya" variant="secondary" size="lg">
              Kolleksiyanı kəşf et
            </LinkButton>
            <LinkButton href="/story" variant="outline" size="lg" className="border-stone/50 text-dark-foreground hover:border-dark-foreground">
              Hekayəmizi oxu
            </LinkButton>
          </div>
        </div>
      </Container>
      <div className="absolute right-6 bottom-6 hidden items-center gap-3 text-[0.625rem] tracking-[0.2em] text-stone uppercase lg:flex">
        Aşağı keç <ArrowDownRight aria-hidden="true" size={16} />
      </div>
    </section>
  );
}
