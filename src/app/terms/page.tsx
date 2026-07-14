import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { LegalDocument } from "@/components/shared/legal-document";
import { createPageMetadata } from "@/lib/metadata";

const termsSections = [
  {
    title: "Ümumi məlumat",
    paragraphs: [
      "Bu şərtlər Useynkhan1792 saytında məhsullara baxış və WhatsApp vasitəsilə sifariş prosesinin ümumi qaydalarını izah edir.",
      "Saytda göstərilən məhsul təsvirləri, həcmlər və vizuallar seçim etməyə kömək edən məlumatlardır.",
    ],
  },
  {
    title: "Məhsullar və qiymətlər",
    paragraphs: [
      "Məhsulların qiymətləri AZN ilə göstərilir. Qiymətlər və stok vəziyyəti əvvəlcədən bildiriş olmadan dəyişə bilər.",
      "Sifariş zamanı aktual məhsul, qiymət və mövcudluq məlumatı WhatsApp söhbətində təsdiqlənir.",
    ],
  },
  {
    title: "Sifarişin qəbul edilməsi",
    paragraphs: [
      "Səbətin hazırlanması və WhatsApp mesajının açılması sifarişin avtomatik qəbul edildiyi demək deyil.",
      "Sifariş yalnız məhsullar, çatdırılma şəhəri, vaxt və digər detallar WhatsApp vasitəsilə təsdiqləndikdən sonra qəbul edilmiş sayılır.",
    ],
  },
  {
    title: "Çatdırılma və ödəniş",
    paragraphs: [
      "Çatdırılma Bakı və Sumqayıt ərazisində mümkündür. Vaxt və çatdırılma haqqı sifariş təsdiqlənərkən dəqiqləşdirilir.",
      "Ödəniş çatdırılma zamanı nağd şəkildə edilir. Onlayn ödəniş hazırda mövcud deyil.",
    ],
  },
  {
    title: "Qaytarılma və dəyişdirmə",
    paragraphs: [
      "Məhsulların qaytarılması və dəyişdirilməsi üzrə yekun biznes siyasəti hələ bu saytda dərc edilməyib. Sifarişdən əvvəl aktual şərtləri WhatsApp vasitəsilə dəqiqləşdirin.",
    ],
  },
  {
    title: "Şərtlərin yenilənməsi",
    paragraphs: [
      "Saytın sifariş və çatdırılma prosesi dəyişdikcə bu şərtlər də yenilənə bilər. Cari versiya bu səhifədə təqdim olunur.",
    ],
  },
] as const;

// TODO: Qaytarılma və dəyişdirmə siyasəti biznes sahibi tərəfindən yekunlaşdırılmalı və dərc edilməzdən əvvəl mətn yenilənməlidir.

export const metadata: Metadata = createPageMetadata({ title: "İstifadə və sifariş şərtləri", description: "Useynkhan1792 məhsulları, qiymətlər, WhatsApp sifarişi, çatdırılma və nağd ödəniş üçün ilkin istifadə şərtləri.", path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sifariş qaydaları"
        title="İstifadə şərtləri"
        description="Məhsul seçimi, sifarişin təsdiqi, çatdırılma və ödəniş prosesinin əsas çərçivəsi."
        breadcrumbs={[{ label: "Ana səhifə", href: "/" }, { label: "İstifadə şərtləri" }]}
      />
      <LegalDocument sections={termsSections} />
    </>
  );
}
