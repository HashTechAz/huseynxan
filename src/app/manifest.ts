import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Useynkhan1792 — Four Scents of Baku",
    short_name: "Useynkhan1792",
    description: "Bakı irsindən ilhamlanan premium niş ətir kolleksiyası.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4EFE6",
    theme_color: "#211C18",
    lang: "az",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
