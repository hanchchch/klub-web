export type ProductCategory =  "shirt" | "sticker" | "tumbler" | "shirtSet";
export type Size = "M" | "L" | "XL";
export type Color = "White" | "Black" | "Pink";

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
  category: ProductCategory[];
}
