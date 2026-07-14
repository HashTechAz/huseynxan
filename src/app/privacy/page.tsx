import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { LegalDocument } from "@/components/shared/legal-document";
import { createPageMetadata } from "@/lib/metadata";

// İlkin məxfilik siyasəti şablonudur; yayımdan əvvəl biznes sahibi tərəfindən nəzərdən keçirilməlidir.
const privacySections = [
  {
    title: "Bu siyasətin məqsədi",
    paragraphs: [
      "Bu məxfilik siyasəti Useynkhan1792 saytında məlumatların hansı hallarda istifadə olunduğunu sadə və şəffaf şəkildə izah edir.",
      "Saytda istifadəçi hesabı, qeydiyyat sistemi və onlayn ödəniş funksiyası hazırda mövcud deyil.",
    ],
  },
  {
    title: "Səbət və localStorage",
    paragraphs: [
      "Səbətinizdə seçdiyiniz məhsullar brauzerinizin localStorage yaddaşında saxlanılır. Bu məlumat serverə göndərilmir və son dəyişiklikdən yeddi gün sonra avtomatik etibarsız sayılır.",
      "Saxlanılan səbət məlumatını brauzer ayarlarından silə və ya saytın səbət səhifəsində səbəti təmizləyə bilərsiniz.",
    ],
  },
  {
    title: "WhatsApp vasitəsilə sifariş",
    paragraphs: [
      "Sifarişi WhatsApp ilə tamamlamaq seçildikdə məhsul adları, say, məbləğ və seçilmiş çatdırılma şəhəri mesaj şəklində WhatsApp-a ötürülür.",
      "WhatsApp üçüncü tərəf xidmətidir. Söhbət zamanı paylaşdığınız ad, telefon, ünvan və digər məlumatların emalı həmin xidmətin qaydalarına da tabedir.",
    ],
  },
  {
    title: "Analitika və ödəniş",
    paragraphs: [
      "Saytda hazırda ayrıca analitika xidməti quraşdırılmayıb. Gələcəkdə belə xidmət əlavə edilərsə, bu siyasət uyğun şəkildə yenilənməlidir.",
      "Sayt kart və ya digər onlayn ödəniş məlumatlarını toplamır. Ödəniş çatdırılma zamanı nağd şəkildə edilir.",
    ],
  },
  {
    title: "Əlaqə və yenilənmələr",
    paragraphs: [
      "Məxfiliklə bağlı suallar üçün əlaqə səhifəsində göstərilən WhatsApp nömrəsi vasitəsilə bizimlə əlaqə saxlaya bilərsiniz.",
      "Saytın funksiyaları dəyişdikdə bu ilkin mətn də yenilənə bilər.",
    ],
  },
] as const;

export const metadata: Metadata = createPageMetadata({ title: "Məxfilik siyasəti", description: "Useynkhan1792 saytında localStorage səbəti, WhatsApp sifariş axını və məlumatların istifadəsi haqqında şəffaf məlumat.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Şəffaf məlumat"
        title="Məxfilik siyasəti"
        description="Saytdan istifadə zamanı hansı məlumatların harada saxlandığını aydın şəkildə izah edirik."
        breadcrumbs={[{ label: "Ana səhifə", href: "/" }, { label: "Məxfilik siyasəti" }]}
      />
      <LegalDocument sections={privacySections} />
    </>
  );
}
