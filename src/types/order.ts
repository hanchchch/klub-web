import { Product } from "./product";

export interface Orderer {
  name: string;
  phone: string;
  isShipping: boolean;
  address?: string;
  donation: string;
}

export interface Order {
  product: Product;
  options: {
    [key: string]: string | number;
    quantity: number;
  };
}

export type OrdererError = Partial<{ name: string; phone: string; address: string; donation: string }>;
