"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { primaryNavigation } from "@/data/navigation";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      hasOpenedRef.current = true;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      if (!dialog.open) dialog.showModal();

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    if (dialog.open) dialog.close();
    if (hasOpenedRef.current) triggerRef.current?.focus();
  }, [isOpen]);

  return (
    <div className="xl:hidden">
      <IconButton
        ref={triggerRef}
        aria-label="Menyunu aç"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-dialog"
        className="border-transparent"
        onClick={() => setIsOpen(true)}
      >
        <Menu aria-hidden="true" size={20} />
      </IconButton>

      <dialog
        ref={dialogRef}
        id="mobile-navigation-dialog"
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-background p-0 text-foreground backdrop:bg-dark-section/60"
        onCancel={(event) => {
          event.preventDefault();
          setIsOpen(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
      >
        <div className="flex min-h-dvh flex-col">
          <div className="flex min-h-20 items-center justify-between border-b border-border px-5 sm:px-8">
            <p className="text-eyebrow text-muted-foreground">Naviqasiya</p>
            <IconButton aria-label="Menyunu bağla" className="border-transparent" onClick={() => setIsOpen(false)}>
              <X aria-hidden="true" size={20} />
            </IconButton>
          </div>
          <nav className="flex flex-1 items-center overflow-x-hidden px-5 py-8 sm:px-8 sm:py-12" aria-label="Mobil naviqasiya">
            <ul className="w-full">
              {primaryNavigation.map((item, index) => (
                <li className="border-b border-border" key={item.href}>
                  <Link
                    className="flex min-w-0 items-baseline gap-3 py-4 font-display text-[clamp(1.65rem,6.5vw,2.5rem)] leading-[1.08] whitespace-nowrap transition-colors hover:text-antique-gold sm:gap-5 sm:py-5"
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="w-5 shrink-0 font-sans text-[0.625rem] text-antique-gold">0{index + 1}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </div>
  );
}
