import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";
import { Container } from "@/components/ui/container";
import { legalNavigation, orderNavigation, primaryNavigation } from "@/data/navigation";
import { siteConfig } from "@/lib/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

function FooterLinks({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-eyebrow text-antique-gold">{title}</h2>
      <ul className="mt-6 space-y-3 text-sm text-stone">
        {links.map((item) => (
          <li key={item.href}>
            <Link className="transition-colors hover:text-dark-foreground" href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-dark-section text-dark-foreground">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:gap-16 lg:py-20" wide>
        <div className="max-w-sm">
          <BrandMark inverted showSlogan />
          <p className="mt-7 text-sm leading-7 text-stone">
            Azərbaycanın tarixi və Bakı irsindən ilhamlanan müasir premium niş parfümeriya brendi.
          </p>
          <p className="mt-6 text-xs tracking-[0.14em] text-antique-gold uppercase">Bakı, Azərbaycan</p>
        </div>
        <FooterLinks title="Kəşf et" links={primaryNavigation.slice(0, 4)} />
        <FooterLinks title="Sifariş" links={orderNavigation} />
        <div>
          <h2 className="text-eyebrow text-antique-gold">Əlaqə</h2>
          <div className="mt-6 space-y-3 text-sm text-stone">
            <p>
              <a className="transition-colors hover:text-dark-foreground" href={createWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                {siteConfig.whatsappDisplayNumber}
              </a>
            </p>
            {siteConfig.instagramUrl ? (
              <p><a className="transition-colors hover:text-dark-foreground" href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a></p>
            ) : null}
          </div>
        </div>
      </Container>
      <div className="border-t border-stone/20">
        <Container className="flex flex-col gap-5 pt-6 pb-28 text-xs text-stone sm:flex-row sm:items-center sm:justify-between lg:pb-8" wide>
          <p>© {new Date().getFullYear()} Useynkhan1792. Bütün hüquqlar qorunur.</p>
          <nav aria-label="Hüquqi səhifələr">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNavigation.map((item) => (
                <li key={item.href}><Link className="hover:text-dark-foreground" href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
