"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

export function StickyHeaderShell({ children }: Readonly<{ children: ReactNode }>) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={cn(
        "group sticky top-0 z-50 border-b border-border/80 bg-background/95 transition-shadow duration-200",
        isScrolled && "shadow-[0_1px_0_var(--border)]",
      )}
      data-scrolled={isScrolled || undefined}
    >
      {children}
    </header>
  );
}
