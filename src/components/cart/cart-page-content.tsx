"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShoppingBag, Trash2 } from "lucide-react";

import { buttonClassName, Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { IconButton } from "@/components/ui/icon-button";
import { LinkButton } from "@/components/ui/link-button";
import { Price } from "@/components/ui/price";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { useCart } from "@/hooks/use-cart";
import { CART_MAX_QUANTITY } from "@/lib/cart-reducer";
import { resolveCartCheckoutLines } from "@/lib/cart-products";
import {
  buildCartWhatsAppMessage,
  calculateCartWhatsAppSummary,
  createWhatsAppUrl,
  type DeliveryCity,
} from "@/lib/whatsapp";

export function CartPageContent() {
  const { items, isHydrated, setQuantity, removeItem, clearCart } = useCart();
  const [deliveryCity, setDeliveryCity] = useState<DeliveryCity>("Bakı");

  if (!isHydrated) {
    return (
      <div className="grid animate-pulse gap-10 lg:grid-cols-[1fr_22rem]" aria-label="Səbət yüklənir">
        <div className="h-64 bg-stone/25" />
        <div className="h-64 bg-stone/25" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag size={29} strokeWidth={1.4} />}
        title="Səbətiniz boşdur"
        description="Four Scents of Baku kolleksiyasından seçdiyiniz məhsullar burada görünəcək."
        action={<LinkButton href="/products">Məhsulları kəşf et</LinkButton>}
      />
    );
  }

  const checkoutLines = resolveCartCheckoutLines(items);
  const checkoutSummary = calculateCartWhatsAppSummary(checkoutLines);
  const whatsappMessage = buildCartWhatsAppMessage(checkoutLines, deliveryCity);
  const whatsappUrl = whatsappMessage ? createWhatsAppUrl(whatsappMessage) : undefined;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-16">
      <div>
        <div className="flex items-center justify-between border-b border-border pb-5">
          <h2 className="font-display text-3xl">Seçilmiş məhsullar</h2>
          <Button variant="ghost" size="sm" onClick={clearCart}>Səbəti təmizlə</Button>
        </div>

        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li className="grid grid-cols-[5.5rem_1fr] gap-5 py-7 sm:grid-cols-[7rem_1fr_auto] sm:gap-7" key={item.productId}>
              <Link className="relative aspect-[4/5] overflow-hidden border border-border bg-surface" href={`/products/${item.slug}`}>
                <Image src={item.image} alt={item.imageAlt} fill sizes="112px" className="object-cover" />
              </Link>

              <div className="min-w-0">
                <Link className="font-display text-2xl leading-none hover:text-antique-gold" href={`/products/${item.slug}`}>
                  {item.name}
                </Link>
                <p className="mt-3 text-xs text-muted-foreground">{item.volume}</p>
                <p className="mt-4 text-sm">
                  <span className="sr-only">Vahid qiymət: </span>
                  <Price amount={item.price} currency={item.currency} />
                </p>
                <div className="mt-5 flex items-center gap-4 sm:hidden">
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(quantity) => setQuantity(item.productId, quantity)}
                    max={CART_MAX_QUANTITY}
                    label={`${item.name} üçün say`}
                  />
                  <IconButton aria-label={`${item.name} məhsulunu sil`} size="sm" onClick={() => removeItem(item.productId)}>
                    <Trash2 aria-hidden="true" size={16} />
                  </IconButton>
                </div>
              </div>

              <div className="col-span-2 flex items-center justify-between border-t border-border pt-5 sm:col-span-1 sm:flex-col sm:items-end sm:justify-between sm:border-0 sm:pt-0">
                <div className="hidden items-center gap-3 sm:flex">
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(quantity) => setQuantity(item.productId, quantity)}
                    max={CART_MAX_QUANTITY}
                    label={`${item.name} üçün say`}
                  />
                  <IconButton aria-label={`${item.name} məhsulunu sil`} size="sm" onClick={() => removeItem(item.productId)}>
                    <Trash2 aria-hidden="true" size={16} />
                  </IconButton>
                </div>
                <div className="text-right">
                  <p className="text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">Sətir cəmi</p>
                  <Price className="mt-2 font-display text-2xl" amount={item.price * item.quantity} currency={item.currency} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="border border-border bg-surface p-7 lg:sticky lg:top-32" aria-label="Sifariş yekunu">
        <h2 className="font-display text-3xl">Sifariş yekunu</h2>
        <div className="mt-7 flex items-center justify-between border-y border-border py-5">
          <span className="text-sm text-muted-foreground">Məhsulların cəmi</span>
          <Price className="font-display text-3xl" amount={checkoutSummary.totalAmount} currency="AZN" />
        </div>
        <p className="mt-5 text-xs leading-6 text-muted-foreground">
          Çatdırılma haqqı yekun məbləğə daxil deyil və WhatsApp vasitəsilə dəqiqləşdirilir.
        </p>
        <fieldset className="mt-6 border border-border bg-background p-4">
          <legend className="px-2 text-xs font-semibold">Çatdırılma şəhəri</legend>
          <div className="flex gap-5">
            {(["Bakı", "Sumqayıt"] as const).map((city) => (
              <label className="flex items-center gap-2 text-sm" key={city}>
                <input
                  type="radio"
                  name="cart-delivery-city"
                  value={city}
                  checked={deliveryCity === city}
                  onChange={() => setDeliveryCity(city)}
                  className="accent-antique-gold"
                />
                {city}
              </label>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            Sifariş WhatsApp-da tamamlanacaq. Ünvan və uyğun vaxt söhbət zamanı dəqiqləşdirilir.
          </p>
        </fieldset>
        {whatsappUrl ? (
          <a
            className={buttonClassName({ variant: "whatsapp", size: "lg", className: "mt-7 w-full" })}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle aria-hidden="true" size={17} /> WhatsApp ilə sifarişi tamamla
          </a>
        ) : null}
        <LinkButton className="mt-3 w-full" href="/products" variant="outline">
          Alış-verişə davam et
        </LinkButton>
      </aside>
    </div>
  );
}
