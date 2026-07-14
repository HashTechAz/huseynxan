"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Filter, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import {
  fragranceFamilyOptions,
  genderOptions,
  occasionOptions,
  seasonOptions,
  stockOptions,
} from "@/data/catalog";
import type { CatalogQueryState } from "@/types/product";

type CatalogControlsProps = {
  state: CatalogQueryState;
  activeFilterCount: number;
};

const categoryOptions = [
  { value: "all", label: "Bütün məhsullar" },
  { value: "fragrances", label: "Fərdi ətirlər" },
  { value: "sets", label: "Setlər" },
] as const;

const sortOptions = [
  { value: "recommended", label: "Tövsiyə edilən" },
  { value: "price-asc", label: "Qiymət: aşağıdan yuxarı" },
  { value: "price-desc", label: "Qiymət: yuxarıdan aşağı" },
  { value: "name", label: "Ada görə" },
] as const;

function SelectField({
  id,
  label,
  name,
  value,
  options,
  placeholder = "Hamısı",
  onChange,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div>
      <label className="text-eyebrow text-muted-foreground" htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        className="mt-3 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  );
}

function FilterFields({
  state,
  idPrefix,
  onChange,
  onSearch,
}: {
  state: CatalogQueryState;
  idPrefix: string;
  onChange: (name: string, value: string) => void;
  onSearch: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="space-y-7">
      <form onSubmit={onSearch} role="search">
        <label className="text-eyebrow text-muted-foreground" htmlFor={`${idPrefix}-search`}>Axtarış</label>
        <div className="relative mt-3">
          <input
            key={state.query}
            id={`${idPrefix}-search`}
            name="q"
            type="search"
            defaultValue={state.query}
            placeholder="Məhsul axtar..."
            maxLength={100}
            className="min-h-11 w-full border border-border bg-background pr-11 pl-3 text-sm placeholder:text-muted-foreground/70"
          />
          <button type="submit" aria-label="Axtar" className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground hover:text-foreground">
            <Search aria-hidden="true" size={17} />
          </button>
        </div>
      </form>

      <fieldset>
        <legend className="text-eyebrow text-muted-foreground">Kateqoriya</legend>
        <div className="mt-4 space-y-3">
          {categoryOptions.map((option) => (
            <label className="flex items-center gap-3 text-sm" key={option.value}>
              <input
                type="radio"
                name={`${idPrefix}-category`}
                value={option.value}
                checked={state.category === option.value}
                onChange={() => onChange("category", option.value)}
                className="size-4 accent-antique-gold"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <SelectField id={`${idPrefix}-family`} label="Qoxu ailəsi" name="family" value={state.family ?? ""} options={fragranceFamilyOptions} onChange={onChange} />
      <SelectField id={`${idPrefix}-season`} label="Mövsüm" name="season" value={state.season ?? ""} options={seasonOptions} onChange={onChange} />
      <SelectField id={`${idPrefix}-occasion`} label="İstifadə zamanı" name="occasion" value={state.occasion ?? ""} options={occasionOptions} onChange={onChange} />
      <SelectField id={`${idPrefix}-gender`} label="Gender" name="gender" value={state.gender ?? ""} options={genderOptions} onChange={onChange} />
      <SelectField id={`${idPrefix}-stock`} label="Stok vəziyyəti" name="stock" value={state.stock === "all" ? "" : state.stock} options={stockOptions.filter((option) => option.value !== "all")} onChange={onChange} />
      <SelectField id={`${idPrefix}-sort`} label="Sıralama" name="sort" value={state.sort} options={sortOptions} placeholder="Tövsiyə edilən" onChange={onChange} />
    </div>
  );
}

export function CatalogControls({ state, activeFilterCount }: CatalogControlsProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hasOpenedRef = useRef(false);

  const updateParam = (name: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    const isDefault =
      !value ||
      (name === "category" && value === "all") ||
      (name === "stock" && value === "all") ||
      (name === "sort" && value === "recommended");
    if (isDefault) params.delete(name);
    else params.set(name, value);
    const query = params.toString();
    router.replace(query ? `/products?${query}` : "/products", { scroll: false });
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("q");
    updateParam("q", typeof value === "string" ? value.trim() : "");
  };

  const resetFilters = () => {
    setIsOpen(false);
    router.replace("/products", { scroll: false });
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      hasOpenedRef.current = true;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      if (!dialog.open) dialog.showModal();
      return () => { document.body.style.overflow = previousOverflow; };
    }
    if (dialog.open) dialog.close();
    if (hasOpenedRef.current) triggerRef.current?.focus();
  }, [isOpen]);

  return (
    <>
      <aside className="hidden border-r border-border pr-8 lg:block" aria-label="Məhsul filtrləri">
        <div className="sticky top-32">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-3xl">Filtrlər</h2>
            {activeFilterCount > 0 ? <button className="text-xs text-caspian underline-offset-4 hover:underline" onClick={resetFilters}>Sıfırla</button> : null}
          </div>
          <FilterFields state={state} idPrefix="desktop" onChange={updateParam} onSearch={handleSearch} />
        </div>
      </aside>

      <div className="mb-8 flex items-center justify-between lg:hidden">
        <Button ref={triggerRef} variant="outline" onClick={() => setIsOpen(true)} aria-expanded={isOpen} aria-controls="catalog-filter-dialog">
          <Filter aria-hidden="true" size={16} /> Filtrlər
          {activeFilterCount > 0 ? <span className="bg-antique-gold px-1.5 py-0.5 text-[0.625rem] text-dark-section">{activeFilterCount}</span> : null}
        </Button>
        {activeFilterCount > 0 || state.query ? <button className="text-xs text-caspian" onClick={resetFilters}>Sıfırla</button> : null}
      </div>

      <dialog
        ref={dialogRef}
        id="catalog-filter-dialog"
        className="m-0 mt-auto max-h-[90dvh] w-full max-w-none border-0 bg-background p-0 text-foreground backdrop:bg-dark-section/60 lg:hidden"
        onCancel={(event) => { event.preventDefault(); setIsOpen(false); }}
      >
        <div className="flex max-h-[90dvh] flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-display text-3xl">Filtrlər</h2>
            <IconButton aria-label="Filtrləri bağla" className="border-transparent" onClick={() => setIsOpen(false)}><X aria-hidden="true" size={20} /></IconButton>
          </div>
          <div className="overflow-y-auto px-5 py-7">
            <FilterFields state={state} idPrefix="mobile" onChange={updateParam} onSearch={handleSearch} />
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-border bg-surface px-5 py-4">
            <Button variant="ghost" onClick={resetFilters}>Sıfırla</Button>
            <Button onClick={() => setIsOpen(false)}>Nəticələri göstər</Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
