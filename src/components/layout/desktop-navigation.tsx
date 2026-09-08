import Link from "next/link";

import { primaryNavigation } from "@/data/navigation";

export function DesktopNavigation() {
  return (
    <nav className="hidden xl:block" aria-label="Əsas naviqasiya">
      <ul className="flex items-center justify-center gap-6 2xl:gap-7">
        {primaryNavigation.map((item) => (
          <li key={item.href}>
            <Link
              className="relative block py-3 text-[0.6875rem] font-semibold tracking-[0.1em] whitespace-nowrap text-muted-foreground uppercase transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-antique-gold after:transition-transform hover:text-foreground hover:after:scale-x-100"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
