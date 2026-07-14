export type CartLineInput = Readonly<{
  productId: string;
  quantity: number;
}>;

export type CartItem = Readonly<{
  productId: string;
  slug: string;
  name: string;
  price: number;
  currency: "AZN";
  volume: string;
  image: string;
  imageAlt: string;
  quantity: number;
}>;

export type CartState = Readonly<{
  schemaVersion: number;
  updatedAt: number;
  items: readonly CartItem[];
}>;
