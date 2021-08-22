export type ProductCategory =  "shirt" | "sticker" | "tumbler";

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
  category: ProductCategory[];
}
