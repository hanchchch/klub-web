export type ViewProduct = "set" | "all";
export type ProductCategory = "shirt" | "sticker" | "tumbler" | "shirtSet";
export type Size = "M" | "L" | "XL";
export type Color = "White" | "Black" | "Pink";

export type OptionValue = {
  id: number;
  value: string;
};

export type Option = {
  name: string;
  values: OptionValue[];
};

export interface Product {
  id: number;
  name: string;
  description: string;
  original_price?: number;
  price: number;
  is_set: boolean;
  images: { image: string; is_main: boolean }[];
  options: Option[];
  fixed_options: OptionValue[];
}
