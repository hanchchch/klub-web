import { Order, Orderer, OrdererResponse } from "@src/types/order";
import { OptionValue, Product } from "@src/types/product";
import axios from "axios";

export const getQuantities = async (options: OptionValue[], is_set: boolean) => {
  const res = await axios.post<{ id: number; quantity: number }[]>("/api/product/quantity", { options, is_set });
  return res.data;
};

export const postOrder = async (orderer: Orderer, orders: Order[], total: number) => {
  let ordererId: number;
  const checkPhone = await axios.get(`/api/order/orderer/${orderer.phone}/`, { validateStatus: () => true });
  if (checkPhone.status === 404) {
    const resOrderer = await axios.post("/api/order/orderer/", {
      username: orderer.name,
      phone: orderer.phone,
      address: orderer.isShipping ? orderer.address : "유니스토어 현장 수령",
      donation: orderer.donation,
    });
    ordererId = resOrderer.data.id;
  } else {
    ordererId = checkPhone.data.id;
  }

  for (const order of orders) {
    const quantities = await getQuantities([...order.options, ...order.product.fixed_options], order.product.is_set);

    if (quantities.filter((q) => q.quantity < order.quantity).length > 0) {
      throw new Error("재고가 부족합니다.");
    }

    const resOrder = await axios.post("/api/order/order/", {
      summary: `\n>*${order.product.name}* (${order.product.options
        .map((o) => o.values.map((v) => v.value))
        .flat()
        .join(" / ")}) ${order.quantity}개`,
      quantity: order.quantity,
      total: total,
      target: quantities.map((q) => q.id),
      orderer: ordererId,
    });
    if (resOrder.status === 200) {
      return resOrder.data;
    }
  }
  return null;
};

export const getOrderer = async (phone: string) => {
  const res = await axios.get<OrdererResponse>(`/api/order/orderer/${phone}/`, { validateStatus: () => true });

  if (res.status === 200) {
    return res.data;
  }
  return null;
};

export const listProducts = async () => {
  const res = await axios.get<Product[]>("/api/product/product", { validateStatus: () => true });

  if (res.status === 200) {
    return res.data;
  }
  return null;
};

export const getProduct = async (id: number) => {
  const res = await axios.get<Product>(`/api/product/product/${id}/`, { validateStatus: () => true });

  if (res.status === 200) {
    return res.data;
  }
  return null;
};
