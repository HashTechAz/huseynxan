import { brand } from "../data/brand";

const LOCAL_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl && process.env.NODE_ENV === "production") {
    throw new Error("NEXT_PUBLIC_SITE_URL production build üçün təyin edilməlidir.");
  }

  const url = new URL(configuredUrl || LOCAL_SITE_URL);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL http və ya https URL-i olmalıdır.");
  }
  return url.toString().replace(/\/$/, "");
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export function isProductionSite(): boolean {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredUrl) return false;
  const hostname = new URL(configuredUrl).hostname;
  return hostname !== "localhost" && hostname !== "127.0.0.1";
}

export const siteConfig = {
  name: brand.name,
  get url() { return getSiteUrl(); },
  locale: "az_AZ",
  language: "az",
  deliveryArea: "Bakı və Sumqayıt",
  paymentMethod: "Çatdırılma zamanı nağd ödəniş",
  whatsappNumber: "994503950770",
  whatsappDisplayNumber: "+994 50 395 07 70",
  // Rəsmi hesab biznes sahibi tərəfindən təsdiqləndikdən sonra əlavə edilməlidir.
  instagramUrl: null as string | null,
} as const;
