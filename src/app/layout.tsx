import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppFloatingButton } from "@/components/layout/whatsapp-floating-button";
import { brand } from "@/data/brand";
import { isProductionSite, siteConfig } from "@/lib/site";
import { CartProvider } from "@/providers/cart-provider";

import "@/styles/globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

const bodyFont = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${brand.name} — ${brand.slogan}`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Azərbaycanın tarixi və Bakı irsindən ilhamlanan premium niş ətir brendi.",
  applicationName: brand.name,
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  authors: [{ name: brand.founder }],
  alternates: { canonical: "/" },
  robots: {
    index: isProductionSite(),
    follow: isProductionSite(),
  },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    siteName: brand.name,
    title: `${brand.name} — ${brand.slogan}`,
    description:
      "Bakının tarixindən, memarlığından və ruhundan ilhamlanan dörd niş ətir.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: `${brand.name} — ${brand.slogan}`,
    description: "Bakının tarixindən, memarlığından və ruhundan ilhamlanan dörd niş ətir.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4EFE6",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <CartProvider>
          <a href="#main-content" className="fixed top-3 left-3 z-[100] -translate-y-24 bg-dark-section px-4 py-3 text-sm font-semibold text-dark-foreground transition-transform focus:translate-y-0">
            Əsas məzmuna keç
          </a>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col focus:outline-none">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
        </CartProvider>
      </body>
    </html>
  );
}
