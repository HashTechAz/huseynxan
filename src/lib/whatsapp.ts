import { siteConfig } from "./site";

export const WHATSAPP_PHONE: string = siteConfig.whatsappNumber;

export type DeliveryCity = "Bakı" | "Sumqayıt";

export type SingleProductWhatsAppOrder = Readonly<{
  productName: string;
  volume: string;
  quantity: number;
  unitPrice: number;
  currency: "AZN";
  deliveryCity: DeliveryCity;
}>;

export type WhatsAppCartLine = Readonly<{
  productId: string;
  name: string;
  volume: string;
  quantity: number;
  unitPrice: number;
  currency: "AZN";
}>;

export const generalWhatsAppMessage =
  `Salam. ${siteConfig.name} məhsulları haqqında məlumat almaq istəyirəm.`;

export function normalizeWhatsAppPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("00") ? digits.slice(2) : digits;
}

export function createWhatsAppUrl(message = generalWhatsAppMessage, phone = WHATSAPP_PHONE) {
  const normalizedPhone = normalizeWhatsAppPhone(phone);
  if (!normalizedPhone) throw new Error("WhatsApp telefon nömrəsi boş ola bilməz.");
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

function safeQuantity(quantity: number) {
  return Number.isFinite(quantity) ? Math.min(20, Math.max(1, Math.floor(quantity))) : 1;
}

export function buildSingleProductWhatsAppMessage(order: SingleProductWhatsAppOrder) {
  const quantity = safeQuantity(order.quantity);
  const lineTotal = order.unitPrice * quantity;
  return [
    `Salam. ${siteConfig.name} saytından sifariş vermək istəyirəm.`,
    "",
    `Məhsul: ${order.productName}`,
    `Həcm: ${order.volume}`,
    `Say: ${quantity}`,
    `Məbləğ: ${lineTotal} ${order.currency}`,
    "",
    `Çatdırılma şəhəri: ${order.deliveryCity}`,
    "Çatdırılma ünvanı və vaxtını dəqiqləşdirə bilərik?",
  ].join("\n");
}

function isValidCartLine(line: WhatsAppCartLine) {
  return (
    Boolean(line.productId.trim()) &&
    Boolean(line.name.trim()) &&
    Boolean(line.volume.trim()) &&
    line.currency === "AZN" &&
    Number.isFinite(line.unitPrice) &&
    line.unitPrice >= 0 &&
    Number.isFinite(line.quantity) &&
    line.quantity >= 1
  );
}

export function calculateCartWhatsAppSummary(lines: readonly WhatsAppCartLine[]) {
  return lines.filter(isValidCartLine).reduce(
    (summary, line) => {
      const quantity = safeQuantity(line.quantity);
      return {
        totalQuantity: summary.totalQuantity + quantity,
        totalAmount: summary.totalAmount + line.unitPrice * quantity,
      };
    },
    { totalQuantity: 0, totalAmount: 0 },
  );
}

export function buildCartWhatsAppMessage(
  lines: readonly WhatsAppCartLine[],
  deliveryCity: DeliveryCity,
) {
  const safeLines = lines.filter(isValidCartLine);
  if (safeLines.length === 0) return undefined;

  const orderLines = safeLines.map((line, index) => {
    const quantity = safeQuantity(line.quantity);
    return `${index + 1}. ${line.name} — ${line.volume} × ${quantity} — ${line.unitPrice * quantity} ${line.currency}`;
  });
  const { totalQuantity, totalAmount } = calculateCartWhatsAppSummary(safeLines);

  return [
    `Salam. ${siteConfig.name} saytından sifariş vermək istəyirəm.`,
    "",
    "Sifariş:",
    ...orderLines,
    "",
    `Məhsulların sayı: ${totalQuantity}`,
    `Ümumi məbləğ: ${totalAmount} AZN`,
    "",
    `Çatdırılma: ${deliveryCity}`,
    "Ödəniş: çatdırılma zamanı nağd",
    "Çatdırılma haqqını və uyğun vaxtı dəqiqləşdirə bilərik?",
  ].join("\n");
}
