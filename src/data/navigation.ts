import type { NavigationItem } from "@/types/navigation";

export const primaryNavigation = [
  { label: "Ana səhifə", href: "/" },
  { label: "Məhsullar", href: "/products" },
  { label: "Brendin hekayəsi", href: "/story" },
  { label: "Haqqımızda", href: "/about" },
  { label: "Çatdırılma", href: "/delivery" },
  { label: "Əlaqə", href: "/contact" },
] as const satisfies readonly NavigationItem[];

export const orderNavigation = [
  { label: "Məhsullar", href: "/products" },
  { label: "Çatdırılma və ödəniş", href: "/delivery" },
  { label: "Əlaqə", href: "/contact" },
] as const satisfies readonly NavigationItem[];

export const legalNavigation = [
  { label: "Məxfilik siyasəti", href: "/privacy" },
  { label: "İstifadə şərtləri", href: "/terms" },
] as const satisfies readonly NavigationItem[];
