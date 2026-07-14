import Link from "next/link";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { HeaderCartLink } from "@/components/layout/header-cart-link";
import { StickyHeaderShell } from "@/components/layout/sticky-header-shell";
import { ProductSearchDialog } from "@/components/layout/product-search-dialog";
import { BrandMark } from "@/components/shared/brand-mark";
import { Container } from "@/components/ui/container";
export function Header() {
  return (
    <StickyHeaderShell>
      <AnnouncementBar />
      <Container
        className="grid min-h-20 grid-cols-[2.5rem_minmax(0,1fr)_5rem] items-center px-3 transition-[min-height] duration-200 group-data-[scrolled=true]:min-h-16 sm:grid-cols-[1fr_auto_1fr] sm:px-8 lg:px-12 xl:px-16"
        wide
      >
        <div className="justify-self-start xl:hidden">
          <MobileNavigation />
        </div>
        <div className="hidden justify-self-start xl:block">
          <DesktopNavigation />
        </div>

        <Link className="min-w-0 justify-self-center" href="/" aria-label="Useynkhan1792 ana səhifə">
          <BrandMark className="items-center" />
        </Link>

        <div className="flex items-center justify-self-end">
          <ProductSearchDialog />
          <HeaderCartLink />
        </div>
      </Container>
    </StickyHeaderShell>
  );
}
