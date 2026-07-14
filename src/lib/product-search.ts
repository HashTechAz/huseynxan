export type SearchableProduct = {
  name: string;
  subtitle: string;
  shortDescription: string;
  fragranceFamilies: readonly string[];
};

function normalizeSearchText(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("az-AZ").trim();
}

export function searchProducts<T extends SearchableProduct>(
  products: readonly T[],
  query: string,
): T[] {
  const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);

  if (terms.length === 0) return [...products];

  return products.filter((product) => {
    const searchableText = normalizeSearchText(
      [
        product.name,
        product.subtitle,
        product.shortDescription,
        ...product.fragranceFamilies,
      ].join(" "),
    );

    return terms.every((term) => searchableText.includes(term));
  });
}
