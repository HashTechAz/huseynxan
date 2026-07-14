# Useynkhan1792 — Production Readiness

Son audit: 14 iyul 2026

## Tamamlananlar

- Next.js App Router, strict TypeScript, Tailwind CSS və ESLint konfiqurasiyası
- Responsive ana səhifə, kataloq, məhsul, səbət, hekayə, əlaqə və hüquqi səhifələr
- Client-side səbət, 7 günlük expiration və cari məhsul datasından qiymət resolution-u
- Bakı/Sumqayıt seçimi və WhatsApp checkout mesajları
- Azərbaycan dilində metadata, canonical, Open Graph, Twitter Card, sitemap və robots
- Product, BreadcrumbList və Organization structured data
- Accessibility focus, dialog, skip link, aria-live və reduced-motion davranışları
- Kritik məhsul, səbət, storage, WhatsApp, axtarış və server-render component testləri
- `NEXT_PUBLIC_SITE_URL` üçün production validation və `.env.example`
- Saxta və təsdiqlənməmiş sosial media linklərinin production UI-dan gizlədilməsi

## Deploy-dan əvvəl biznes sahibindən tələb olunanlar

### Müvəqqəti qəbul edilmiş qiymətlər

- Baku Nights — 39 AZN
- Black Town — 39 AZN
- Caspian Wave — 39 AZN
- King’s Town — 39 AZN
- Four Scents of Baku Discovery Set — 139 AZN

Qiymətlər `src/data/products.ts` daxilində dəyişdirilir və yayımdan əvvəl yazılı təsdiqlənməlidir.

### Təsdiqlənməli ətir notları

Məhsul datasındakı üst, ürək və baza notları yaradıcı müvəqqəti mətnlərdir. Brend sahibi və ya parfümer hər məhsul üçün real not piramidasını təsdiqləməlidir. Kod daxilindəki TODO yalnız daxili qeyd kimi saxlanılır və UI-da göstərilmir.

### Founder fotosu

Paris Malik Hüseynqulu xan qızının istifadəsinə icazə verilmiş professional portreti təqdim edilməlidir. Hazırda saxta portret əvəzinə monoqram istifadə olunur.

### Real Instagram URL-si

Rəsmi Instagram hesabının tam URL-i biznes sahibi tərəfindən təsdiqlənməlidir. Təsdiqlənənədək Instagram linki UI və structured data-dan çıxarılıb. URL `src/lib/site.ts` daxilində əlavə edilməlidir.

### Rəsmi qaytarma siyasəti

Qaytarılma və dəyişdirmə qaydaları, müddətlər, uyğunluq şərtləri və əlaqə prosesi biznes sahibi/hüquq məsləhətçisi tərəfindən yekunlaşdırılmalıdır. `src/app/terms/page.tsx` daxilində TODO mövcuddur.

### Rəsmi hüquqi mətn

Məxfilik siyasəti və istifadə şərtləri ilkin şəffaf şablondur, hüquqi məsləhət deyil. Production yayımdan əvvəl Azərbaycan qanunvericiliyinə və faktiki biznes prosesinə uyğun hüquqi baxışdan keçirilməlidir.

### Final logo və favicon

Rəsmi final loqo, favicon və app icon təqdim edilməyib. Hazırda saxta gerb və ya loqo əvəzinə müvəqqəti “U1792” initials icon istifadə olunur. Final asset-lər metadata və manifestdə yenilənməlidir.

### Professional məhsul fotoları

Bütün beş məhsul üçün professional, istifadəsinə icazə verilmiş foto və ölçülər təqdim edilməlidir. Hazırda build-i qoruyan brand placeholder istifadə olunur. Kataloq, qalereya və sosial paylaşım üçün ayrıca uyğun aspect ratio-lar tövsiyə edilir.

## Final deploy checklist

- [ ] Real production domeni və `NEXT_PUBLIC_SITE_URL` təsdiqlənib
- [ ] Qiymətlər və stok məlumatları təsdiqlənib
- [ ] Ətir notları təsdiqlənib
- [ ] Founder fotosu və istifadə icazəsi alınıb
- [ ] Rəsmi Instagram URL-si daxil edilib
- [ ] Qaytarma siyasəti və hüquqi mətn təsdiqlənib
- [ ] Final logo, favicon və professional məhsul fotoları əlavə edilib
- [ ] WhatsApp nömrəsi `994503950770` ilə canlı cihazda yoxlanılıb
- [ ] Bakı və Sumqayıt çatdırılma prosesi biznes sahibi ilə təsdiqlənib
- [ ] Production deploy-dan sonra sitemap, robots, canonical və bütün məhsul slugs smoke-test edilib
