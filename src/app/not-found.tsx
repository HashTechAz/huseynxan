import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section className="flex flex-1 items-center" spacing="lg">
      <Container>
        <p className="font-display text-8xl text-antique-gold/35 sm:text-9xl">404</p>
        <h1 className="text-heading-lg mt-5">Səhifə tapılmadı</h1>
        <p className="mt-6 max-w-md leading-7 text-muted-foreground">
          Axtardığınız səhifə mövcud deyil və ya başqa ünvana köçürülüb.
        </p>
        <Link
          className="mt-10 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-caspian uppercase transition-colors hover:text-foreground"
          href="/"
        >
          <ArrowLeft aria-hidden="true" size={17} />
          Ana səhifəyə qayıt
        </Link>
      </Container>
    </Section>
  );
}
