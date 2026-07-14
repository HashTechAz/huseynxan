"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, SearchX, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { IconButton } from "@/components/ui/icon-button";
import { Price } from "@/components/ui/price";
import { products } from "@/data/products";
import { searchProducts } from "@/lib/product-search";

const activeProducts = products.filter((product) => product.status === "active");
const selectedProducts = activeProducts.filter((product) => product.featured).slice(0, 4);

export function ProductSearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasOpenedRef = useRef(false);
  const router = useRouter();

  const results = useMemo(
    () => (query.trim() ? searchProducts(activeProducts, query) : selectedProducts),
    [query],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      hasOpenedRef.current = true;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      if (!dialog.open) dialog.showModal();
      const focusFrame = requestAnimationFrame(() => inputRef.current?.focus());

      return () => {
        cancelAnimationFrame(focusFrame);
        document.body.style.overflow = previousOverflow;
      };
    }

    if (dialog.open) dialog.close();
    if (hasOpenedRef.current) triggerRef.current?.focus();
  }, [isOpen]);

  function closeSearch() {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  }

  function openProduct(slug: string) {
    closeSearch();
    router.push(`/products/${slug}`);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const product = results[activeIndex];
      if (product) openProduct(product.slug);
    }
  }

  return (
    <>
      <IconButton
        ref={triggerRef}
        aria-label="Məhsul axtarışını aç"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="product-search-dialog"
        className="border-transparent hover:border-transparent hover:text-antique-gold"
        onClick={() => setIsOpen(true)}
      >
        <Search aria-hidden="true" size={19} strokeWidth={1.6} />
      </IconButton>

      <dialog
        ref={dialogRef}
        id="product-search-dialog"
        aria-labelledby="product-search-title"
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-background p-0 text-foreground backdrop:bg-dark-section/70 sm:m-auto sm:h-[min(44rem,88dvh)] sm:w-[min(48rem,calc(100%-2rem))] sm:border sm:border-border"
        onCancel={(event) => {
          event.preventDefault();
          closeSearch();
        }}
      >
        <div className="flex h-full flex-col">
          <header className="flex min-h-20 items-center justify-between border-b border-border px-5 sm:px-8">
            <div>
              <p className="text-eyebrow text-antique-gold">Kataloq</p>
              <h2 id="product-search-title" className="font-display text-2xl sm:text-3xl">
                Məhsul axtarışı
              </h2>
            </div>
            <IconButton aria-label="Axtarışı bağla" className="border-transparent" onClick={closeSearch}>
              <X aria-hidden="true" size={20} />
            </IconButton>
          </header>

          <div className="border-b border-border px-5 py-5 sm:px-8">
            <label className="relative block" htmlFor="product-search-input">
              <span className="sr-only">Məhsul adı, təsviri və ya qoxu ailəsi üzrə axtarın</span>
              <Search
                aria-hidden="true"
                className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={21}
              />
              <input
                ref={inputRef}
                id="product-search-input"
                type="search"
                role="combobox"
                aria-autocomplete="list"
                aria-controls="product-search-results"
                aria-expanded="true"
                aria-activedescendant={results[activeIndex] ? `search-result-${results[activeIndex].id}` : undefined}
                autoComplete="off"
                className="h-14 w-full border-b border-foreground/30 bg-transparent pl-9 pr-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-antique-gold"
                placeholder="Məsələn, Baku Nights və ya woody"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
              />
            </label>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-eyebrow text-muted-foreground">
                {query.trim() ? "Axtarış nəticələri" : "Seçilmiş məhsullar"}
              </p>
              <p className="text-xs text-muted-foreground" aria-live="polite" aria-atomic="true">
                {results.length} nəticə
              </p>
            </div>

            {results.length > 0 ? (
              <ul id="product-search-results" role="listbox" aria-label="Məhsul nəticələri" className="divide-y divide-border">
                {results.map((product, index) => {
                  const image = product.images[0];
                  return (
                    <li
                      key={product.id}
                      role="none"
                    >
                      <button
                        type="button"
                        id={`search-result-${product.id}`}
                        role="option"
                        aria-selected={index === activeIndex}
                        className="grid w-full grid-cols-[4rem_minmax(0,1fr)] items-center gap-3 px-1 py-4 text-left outline-none transition-colors hover:bg-surface focus-visible:bg-surface data-[active=true]:bg-surface sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:gap-4 sm:px-2"
                        data-active={index === activeIndex}
                        onMouseMove={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                        onClick={() => openProduct(product.slug)}
                      >
                        <span className="relative aspect-[4/5] overflow-hidden bg-stone/25">
                          <Image
                            src={image?.available ? image.src : "/images/products/product-placeholder.svg"}
                            alt={image?.alt ?? `${product.name} məhsulu`}
                            fill
                            sizes="88px"
                            className="object-cover"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-xl leading-tight sm:text-2xl">{product.name}</span>
                          <span className="mt-1 block truncate text-xs text-muted-foreground sm:text-sm">
                            {product.subtitle}
                          </span>
                          <span className="mt-2 block text-[0.65rem] uppercase tracking-[0.15em] text-antique-gold">
                            {product.fragranceFamilies.slice(0, 3).join(" · ")}
                          </span>
                        </span>
                        <Price className="hidden whitespace-nowrap text-sm sm:inline" amount={product.price} currency={product.currency} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <EmptyState
                icon={<SearchX size={28} />}
                title="Uyğun məhsul tapılmadı"
                description="Axtarış sözünü dəyişin və ya məhsul adını daha qısa yazmağa çalışın."
              />
            )}
          </div>

          <footer className="hidden border-t border-border px-8 py-3 text-xs text-muted-foreground sm:flex sm:justify-between">
            <span>↑ ↓ nəticələr arasında keçid</span>
            <span>Enter seç · Esc bağla</span>
          </footer>
        </div>
      </dialog>
    </>
  );
}
