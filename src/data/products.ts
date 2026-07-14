import type { FragranceNote, Product, ProductImage } from "@/types/product";

const PRODUCT_PLACEHOLDER = "/images/products/product-placeholder.svg";

function productPlaceholder(alt: string): ProductImage {
  return {
    src: PRODUCT_PLACEHOLDER,
    fallbackSrc: PRODUCT_PLACEHOLDER,
    alt,
    width: 1200,
    height: 1500,
    available: false,
  };
}

// TODO: Aşağıdakı yaradıcı not adları yalnız kataloq modelini doldurmaq üçündür.
// Real ətir notları kimi yayımlanmadan əvvəl brend sahibi/parfümer tərəfindən təsdiqlənməli və dəyişdirilməlidir.
function draftNotes(...names: string[]): readonly FragranceNote[] {
  return names.map((name) => ({ name, provisional: true }));
}

export const products = [
  {
    id: "ukh-product-001",
    slug: "baku-nights",
    name: "Baku Nights",
    subtitle: "Şəhər işıqları sükuta qarışanda",
    category: "fragrances",
    price: 39,
    currency: "AZN",
    volume: { value: 13, unit: "ml", count: 1 },
    shortDescription: "Dərin, isti və sirli xarakterli axşam ətri.",
    description:
      "Bakı gecələrinin kölgəli ritmini isti, ağacvari və ədviyyəli istiqamətdə şərh edən uniseks kompozisiya.",
    story:
      "Gün batdıqdan sonra Bakı başqa səslə danışır. Daş fasadlar işığı sakitcə saxlayır, dar küçələrdən dənizin nəfəsi keçir, şəhərin uzaq uğultusu isə gecənin dərinliyində yumşalır. Baku Nights bu keçid anının emosiyasını daşıyır: tanış bir məkanın qaranlıqda yenidən kəşf edilməsi kimi. İsti və sirli xarakteri tələsməyən, özünə əmin bir aura yaradır. Burada tarix dekor deyil; köhnə daşın səthində, qapıların kölgəsində və gecə boyu yaşayan şəhər yaddaşında hiss olunan incə bir qatdır. Ətir xüsusi axşamlar üçün sakit, lakin yadda qalan bir imza kimi düşünülüb.",
    fragranceFamilies: ["oriental", "woody", "spicy"],
    gender: "unisex",
    seasons: ["autumn", "winter"],
    occasions: ["evening", "special-occasion"],
    topNotes: draftNotes("Gecə işığı akkordu", "İsti hava toxunuşu"),
    heartNotes: draftNotes("Kölgəli daş akkordu", "Sakit ədviyyə təəssüratı"),
    baseNotes: draftNotes("Dərin ağac yaddaşı", "Uzanan isti iz"),
    images: [productPlaceholder("Baku Nights ətir flakonu üçün müvəqqəti vizual")],
    featured: true,
    bestseller: true,
    status: "active",
    stockQuantity: null,
    displayOrder: 1,
  },
  {
    id: "ukh-product-002",
    slug: "black-town",
    name: "Black Town",
    subtitle: "Sənaye yaddaşının tünd silueti",
    category: "fragrances",
    price: 39,
    currency: "AZN",
    volume: { value: 13, unit: "ml", count: 1 },
    shortDescription: "Güclü, qaranlıq və sənaye ruhlu xarakter.",
    description:
      "Bakının sənaye siluetindən ilhamlanan tüstülü, dəri və ağacvari istiqamətli uniseks kompozisiya.",
    story:
      "Black Town Bakının sənaye yaddaşına uzaqdan baxan tünd bir portretdir. Metal konstruksiyaların sərt xətləri, küləyin açıq sahələrdə yaratdığı ritm və zamanla rəngi dəyişmiş şəhər səthləri onun vizual dünyasını qurur. Bu hekayə keçmişi romantikləşdirmir; şəhərin çevrilmə gücünə, əmək izlərinə və müasir Bakının altında yaşayan çoxqatlı yaddaşa diqqət yetirir. Güclü, tüstülü və qaranlıq xarakter özünü dərhal göstərsə də, arxasında ölçülü bir sakitlik saxlayır. Black Town kəskin kontrastları sevən, axşam saatlarında fərqli və intizamlı bir iz buraxmaq istəyənlər üçün nəzərdə tutulmuş müasir şəhər ətridir.",
    fragranceFamilies: ["smoky", "leather", "woody"],
    gender: "unisex",
    seasons: ["autumn", "winter"],
    occasions: ["evening", "special-occasion"],
    topNotes: draftNotes("Soyuq metal havası", "Tünd şəhər kölgəsi"),
    heartNotes: draftNotes("Sənaye tüstüsü akkordu", "Yumşaq dəri təəssüratı"),
    baseNotes: draftNotes("Quru ağac izi", "Mineral yaddaş"),
    images: [productPlaceholder("Black Town ətir flakonu üçün müvəqqəti vizual")],
    featured: true,
    bestseller: false,
    status: "active",
    stockQuantity: null,
    displayOrder: 2,
  },
  {
    id: "ukh-product-003",
    slug: "caspian-wave",
    name: "Caspian Wave",
    subtitle: "Üfüqə açılan təmiz nəfəs",
    category: "fragrances",
    price: 39,
    currency: "AZN",
    volume: { value: 13, unit: "ml", count: 1 },
    shortDescription: "Təmiz, azad və enerjili gündəlik xarakter.",
    description:
      "Xəzərin açıq üfüqünü sulu, təravətli və sitrus istiqamətində ifadə edən uniseks kompozisiya.",
    story:
      "Caspian Wave səhərin ilk işığında Xəzərə baxmaq hissindən başlayır. Üfüq hələ sakitdir, külək şəhərin daş küçələrindən keçərək sahilə enir və havada genişlik duyğusu yaranır. Bu ətrin emosional tonu yüngül, aydın və hərəkətlidir; yeni günə açılan təmiz bir səhifə kimi. Bakı burada gur şəhər deyil, su ilə səma arasında nəfəs alan sahil məkanıdır. Təravətli xarakter gündəlik ritmə rahatlıqla uyğunlaşır, ofisdə və açıq havada ağırlaşmadan öz izini saxlayır. Caspian Wave azadlıq hissini böyük jestlərlə deyil, işıq, hava və davamlı hərəkətin incə harmoniyası ilə ifadə edir.",
    fragranceFamilies: ["aquatic", "fresh", "citrus"],
    gender: "unisex",
    seasons: ["spring", "summer"],
    occasions: ["daily", "office"],
    topNotes: draftNotes("Səhər işığı akkordu", "Parlaq sahil havası"),
    heartNotes: draftNotes("Xəzər küləyi təəssüratı", "Şəffaf su ritmi"),
    baseNotes: draftNotes("Açıq üfüq izi", "Təmiz mineral səth"),
    images: [productPlaceholder("Caspian Wave ətir flakonu üçün müvəqqəti vizual")],
    featured: true,
    bestseller: true,
    status: "active",
    stockQuantity: null,
    displayOrder: 3,
  },
  {
    id: "ukh-product-004",
    slug: "kings-town",
    name: "King’s Town",
    subtitle: "Daş şəhərin ölçülü ləyaqəti",
    category: "fragrances",
    price: 39,
    currency: "AZN",
    volume: { value: 13, unit: "ml", count: 1 },
    shortDescription: "Nəcib, balanslı və xarakterli imza.",
    description:
      "Daş memarlığın təmkinindən ilhamlanan ağacvari, kəhrəba və ədviyyəli istiqamətli uniseks kompozisiya.",
    story:
      "King’s Town Bakının daş memarlığında görünən ölçü və təmkindən ilham alır. Günəşin isti rəng verdiyi divarlar, həyətlər arasındakı kölgəli keçidlər və əsrlər boyu dəyişən şəhərin qoruduğu sakit ləyaqət bu hekayənin əsas xəttidir. Ətir hakimiyyət nümayişindən deyil, öz yerini bilən xarakterdən danışır. Ağacvari və isti istiqaməti balanslı bir dərinlik yaradır; nə həddindən artıq sərt, nə də geri planda qalır. King’s Town müxtəlif mövsümlərdə istifadə edilə bilən, xüsusi axşamlarda isə daha aydın hiss olunan bir imza kimi düşünülüb. Onun tonu nəcib, sakit və şəhərin yaddaşı qədər çoxqatlıdır.",
    fragranceFamilies: ["woody", "amber", "spicy"],
    gender: "unisex",
    seasons: ["all-season"],
    occasions: ["evening", "special-occasion"],
    topNotes: draftNotes("Günəşli daş akkordu", "Ölçülü ədviyyə işığı"),
    heartNotes: draftNotes("Sakit həyət kölgəsi", "İsti kəhrəba təəssüratı"),
    baseNotes: draftNotes("Nəcib ağac izi", "Davamlı şəhər yaddaşı"),
    images: [productPlaceholder("King’s Town ətir flakonu üçün müvəqqəti vizual")],
    featured: true,
    bestseller: false,
    status: "active",
    stockQuantity: null,
    displayOrder: 4,
  },
  {
    id: "ukh-product-005",
    slug: "four-scents-of-baku",
    name: "Four Scents of Baku Discovery Set",
    subtitle: "Bakının dörd fərqli ovqatı",
    category: "discovery-sets",
    price: 139,
    currency: "AZN",
    volume: { value: 13, unit: "ml", count: 4 },
    shortDescription: "Dörd ədəd 13 ml ətirdən ibarət kəşf dəsti.",
    description:
      "Baku Nights, Black Town, Caspian Wave və King’s Town ətirlərini bir araya gətirən tam kolleksiya.",
    story:
      "Four Scents of Baku şəhəri tək bir obrazla deyil, dörd fərqli ovqatla tanımağa dəvət edir. Gecənin isti sükutu, sənaye yaddaşının tünd xətləri, Xəzərin açıq nəfəsi və daş memarlığın təmkinli ləyaqəti eyni dəstdə bir araya gəlir. Hər flakon ayrıca emosional istiqamət təqdim edir, birlikdə isə Bakının dəyişkən ritmini göstərən kiçik bir kolleksiya yaradır. Discovery Set öz imza ətrini seçmək, günün və mövsümün müxtəlif anlarına uyğun seçim etmək və ya düşünülmüş hədiyyə təqdim etmək üçün hazırlanıb. Burada şəhər suvenir kimi deyil, yaddaş, işıq və xarakterdən ibarət müasir bir parfümeriya xəritəsi kimi təqdim olunur.",
    fragranceFamilies: ["aquatic", "fresh", "oriental", "smoky", "spicy", "woody"],
    gender: "unisex",
    seasons: ["all-season"],
    occasions: ["daily", "office", "evening", "special-occasion"],
    topNotes: draftNotes("Kolleksiya açılışı"),
    heartNotes: draftNotes("Dörd şəhər ovqatı"),
    baseNotes: draftNotes("Bakı yaddaşı"),
    images: [productPlaceholder("Four Scents of Baku kəşf dəsti üçün müvəqqəti vizual")],
    featured: true,
    bestseller: true,
    status: "active",
    stockQuantity: null,
    displayOrder: 5,
  },
] as const satisfies readonly Product[];
