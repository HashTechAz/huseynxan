# Useynkhan1792 storefront

Azərbaycanın tarixi və Bakı irsindən ilhamlanan **Useynkhan1792** premium niş
ətir brendinin e-commerce frontend layihəsi. Layihə məhsulların təqdimatı və
gələcək mərhələdə WhatsApp üzərindən sifariş axını üçün hazırlanır. İlk versiyada
backend və onlayn ödəniş nəzərdə tutulmur.

## Texnologiyalar

- Next.js 16 (App Router)
- TypeScript (strict mode)
- Tailwind CSS 4
- ESLint
- next/font
- Lucide React

## Başlamaq

Node.js 20.9 və ya daha yeni versiya tələb olunur.

```bash
npm install
npm run dev
```

Brauzerdə `http://localhost:3000` ünvanını açın.

## Environment

Production build və canonical URL-lər üçün `NEXT_PUBLIC_SITE_URL` real, tam sayt URL-i ilə təyin edilməlidir:

```env
NEXT_PUBLIC_SITE_URL=https://example.com
```

Development zamanı dəyişən olmadıqda `http://localhost:3000` istifadə olunur. Localhost və digər qeyri-production hostlarda `robots.txt` crawler-ləri bloklayır; real production domenində indeksləmə açılır.

## Əsas komandalar

```bash
npm run dev        # lokal development serveri
npm run build      # production build
npm run start      # production serveri
npm run lint       # ESLint yoxlaması
npm run typecheck  # TypeScript yoxlaması
```

## Struktur

`src/app` marşrutları və layout-ları, `src/components` reusable UI hissələrini,
`src/data` statik məlumatları, `src/lib` konfiqurasiya və utility-ləri, `src/types`
isə domen tiplərini saxlayır. `hooks` və `providers` qovluqları yalnız interaktiv
səbət mərhələsində ehtiyac yarandıqda əlavə ediləcək.
