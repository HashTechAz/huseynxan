import type { Metadata } from "next";

import { brand } from "@/data/brand";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  noIndex?: boolean;
};

export function createPageMetadata({ title, description, path, image, noIndex = false }: PageMetadataInput): Metadata {
  const images = image ? [image] : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: "az_AZ",
      siteName: brand.name,
      title: `${title} | ${brand.name}`,
      description,
      url: path,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: `${title} | ${brand.name}`,
      description,
      images: image ? [image.url] : undefined,
    },
  };
}
