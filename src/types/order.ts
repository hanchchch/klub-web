import { OptionValue, Product } from "./product";

export interface Orderer {
  name: string;
  phone: string;
  isShipping: boolean;
  address?: string;
  donation: string;
}

export interface Order {
  product: Product;
  options: OptionValue[];
  quantity: number;
  remaining?: number;
}

export type OrdererError = Partial<{ name: string; phone: string; address: string; donation: string }>;

export interface OrdererResponse {
  username: string;
  phone: string;
  address: string;
  donation: string;
  orders: {
    summary: string;
    total: number;
    created_time: Date;
    pay_time: Date;
  }[];
}
