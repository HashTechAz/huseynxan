# Useynkhan1792 storefront

Azərbaycanın tarixi və Bakı irsindən ilhamlanan **Useynkhan1792** premium niş ətir brendi üçün e-commerce frontend. Sayt kolleksiyanı təqdim edir, client-side səbət saxlayır və sifarişi WhatsApp söhbətinə ötürür. Backend və onlayn ödəniş yoxdur.

## Texnologiyalar

- Next.js 16, App Router və React 19
- TypeScript strict mode
- Tailwind CSS 4
- ESLint və `next/font`
- Lucide React ikonları
- Node.js daxili test runner-i

## Local setup

Node.js 20.9 və ya daha yeni versiya tələb olunur.

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Development üçün `.env.local` daxilində `NEXT_PUBLIC_SITE_URL=http://localhost:3000` istifadə edilə bilər. Sayt `http://localhost:3000` ünvanında açılır.

## Environment

Yeganə tələb olunan production dəyişəni public canonical origin-dir; secret tələb olunmur:

```env
NEXT_PUBLIC_SITE_URL=https://example.com
```

Production deploy-dan əvvəl dəyəri real domenlə əvəz edin. Dəyişən production build-də məcburidir və yalnız `http`/`https` URL qəbul edir. Localhost hostlarında `robots.txt` indeksləməni bloklayır.

## Komandalar

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # production server
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm test           # əsas test suite
npm run test:run   # CI üçün deterministik test qaçışı
npm run test:e2e   # E2E infrastrukturu statusu
```

Playwright hazırda dependency kimi quraşdırılmayıb; `test:e2e` bunu açıq skipped statusu ilə göstərir. Browser E2E testləri dependency və browser binary-ləri CI-da təmin ediləndə aktivləşdirilməlidir.

## Məhsul və biznes məlumatları

- Məhsullar, adlar, slugs, qiymətlər, stok, təsvirlər və image metadata: `src/data/products.ts`
- Qiymətlər integer AZN kimi hər məhsulun `price` sahəsində saxlanılır.
- Qoxu notlarının yanındakı TODO onların brend sahibi/parfümer tərəfindən təsdiqlənməli olduğunu göstərir.
- WhatsApp nömrəsi və display formatı: `src/lib/site.ts`
- Çatdırılma və ödəniş məlumatları: `src/lib/site.ts` və səhifə məzmunları
- Naviqasiya: `src/data/navigation.ts`

## Məhsul şəkilləri

Optimallaşdırılmış faylları uyğun qovluğa semantik kebab-case adla əlavə edin:

```text
public/images/products/baku-nights/
public/images/products/black-town/
public/images/products/caspian-wave/
public/images/products/kings-town/
public/images/products/four-scents-of-baku/
```

Sonra `src/data/products.ts` daxilində məhsulun `images` massivinə real `src`, Azərbaycan dilində `alt`, `width`, `height`, `available: true` və təhlükəsiz `fallbackSrc` yazın. Etiketlərin crop zamanı kəsilmədiyini və ölçülərin real faylla uyğun olduğunu yoxlayın. Real asset olmayan məhsullar hazırda mövcud brand placeholder-dan istifadə edir.

## Deployment

Vercel əlavə `vercel.json` olmadan Next.js layihəsini avtomatik tanıyır.

1. Repository-ni Vercel-ə import edin.
2. Node.js 20.9+ istifadə olunduğunu yoxlayın.
3. `NEXT_PUBLIC_SITE_URL` dəyişənini real production origin ilə təyin edin.
4. Build command olaraq `npm run build` saxlayın.
5. Deploy-dan əvvəl `npm ci`, lint, typecheck və testləri işlədin.
6. Deploy-dan sonra canonical, `/sitemap.xml`, `/robots.txt`, məhsul route-ları və WhatsApp linklərini smoke-test edin.

Ətraflı açıq biznes məsələləri [PRODUCTION_READINESS.md](./PRODUCTION_READINESS.md) sənədindədir.
