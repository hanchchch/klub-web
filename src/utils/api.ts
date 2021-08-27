import { Order, Orderer, OrdererResponse } from "@src/types/order";
import { Product } from "@src/types/product";
import axios from "axios";

export const postOrder = async (
  orderer: Orderer,
  orders: Order[],
  total: number,
  optionKeys: (product: Product) => string[]
) => {
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

  const resOrder = await axios.post("/api/order/order/", {
    order: orders
      .map(
        (o) =>
          `\n>*${o.product.name}* (${optionKeys(o.product)
            .map((k) => o.options[k])
            .join(" / ")}) ${o.options.quantity}개`
      )
      .join("\n>"),
    total: total,
    orderer: ordererId,
  });
  if (resOrder.status === 200) {
    return resOrder.data;
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
