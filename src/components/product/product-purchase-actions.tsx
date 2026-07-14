"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { buttonClassName } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import {
  buildSingleProductWhatsAppMessage,
  createWhatsAppUrl,
  type DeliveryCity,
} from "@/lib/whatsapp";
import type { CartLineInput } from "@/types/cart";

type ProductPurchaseActionsProps = {
  productId: string;
  productName: string;
  volume: string;
  unitPrice: number;
  currency: "AZN";
  maxQuantity?: number;
  onAddToCart?: (line: CartLineInput) => void;
  available?: boolean;
};

export function ProductPurchaseActions({
  productId,
  productName,
  volume,
  unitPrice,
  currency,
  maxQuantity = 10,
  onAddToCart,
  available = true,
}: ProductPurchaseActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [deliveryCity, setDeliveryCity] = useState<DeliveryCity>("Bakı");
  const whatsappMessage = buildSingleProductWhatsAppMessage({
    productName,
    volume,
    quantity,
    unitPrice,
    currency,
    deliveryCity,
  });
  const whatsappUrl = createWhatsAppUrl(whatsappMessage);

  return (
    <div>
      <div className="flex items-center justify-between border-y border-border py-5">
        <span className="text-sm font-medium">Say</span>
        <QuantitySelector value={quantity} onChange={setQuantity} max={maxQuantity} label={`${productName} üçün say`} />
      </div>
      <fieldset className="mt-6 border border-border bg-surface p-4">
        <legend className="px-2 text-xs font-semibold">Çatdırılma şəhəri</legend>
        <div className="flex gap-6">
          {(["Bakı", "Sumqayıt"] as const).map((city) => (
            <label className="flex items-center gap-2 text-sm" key={city}>
              <input type="radio" name="product-delivery-city" value={city} checked={deliveryCity === city} onChange={() => setDeliveryCity(city)} className="accent-antique-gold" />
              {city}
            </label>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Sifariş WhatsApp-da tamamlanacaq. Ünvan və vaxt söhbət zamanı dəqiqləşdirilir.</p>
      </fieldset>
      <div className="mt-6 grid gap-3">
        <AddToCartButton productId={productId} quantity={quantity} onAdd={onAddToCart} size="lg" className="w-full" disabled={!available} />
        <a
          href={available ? whatsappUrl : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClassName({ variant: "whatsapp", size: "lg", className: `w-full ${available ? "" : "pointer-events-none opacity-45"}` })}
          aria-disabled={!available}
          tabIndex={available ? undefined : -1}
        >
          <MessageCircle aria-hidden="true" size={17} /> WhatsApp-la indi sifariş et
        </a>
      </div>
    </div>
  );
}
