import { MessageCircle } from "lucide-react";

import { createWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={createWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp vasitəsilə Useynkhan1792 ilə əlaqə saxla"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex min-h-12 items-center gap-2 bg-caspian px-4 text-xs font-semibold tracking-[0.08em] text-surface uppercase shadow-[0_8px_24px_rgb(23_20_17/0.16)] transition-colors hover:bg-dark-section sm:right-6 sm:min-h-13 sm:px-5"
    >
      <MessageCircle aria-hidden="true" size={19} strokeWidth={1.7} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
