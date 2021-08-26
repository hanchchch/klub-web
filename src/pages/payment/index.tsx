import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Main from "@src/components/templates/Main";
import useOrderer from "@src/utils/hooks/orderer";
import useOrders from "@src/utils/hooks/order";
import { Ellipse } from "@src/components/atoms/Ellipse";
import router from "next/router";
import HeaderLayout from "@src/components/templates/HeaderLayout";
import { categoryOptions, deliveryCharge, options } from "@src/utils/store";
import { Product } from "@src/types/product";
import { sendSlackMessage } from "@src/utils/slack";
import { Button } from "@src/components/atoms/Button";

export default function Payment() {
  const [orders] = useOrders();
  const [orderer] = useOrderer();

  const [price, setPrice] = useState<number>(0);

  const optionKeys = (product: Product) =>
    product.category.map((category) => categoryOptions[category].map((option) => options[option].label)).flat();

  useEffect(() => {
    setPrice(orders.map((o) => o.product.price * o.options.quantity).reduce((a, b) => a + b, 0));
  }, [orders]);

  return (
    <Main>
      <HeaderLayout className={styles.container}>
        <Ellipse text={"PAYMENT"} />
        <div>Order Summary / 주문 내역</div>
        <hr />
        <table>
          <tbody>
            {orders.map((o) => (
              <tr key={o.product.name}>
                <td>{o.product.name}</td>
                <td>
                  {optionKeys(o.product)
                    .map((k) => o.options[k])
                    .join(" / ")}
                </td>
                <td>
                  ₩{o.product.price}*{o.options.quantity}
                </td>
              </tr>
            ))}
            <tr>
              <td>Shipping / 배송</td>
              <td></td>
              <td>₩{orderer.isShipping ? deliveryCharge : 0}</td>
            </tr>
            <tr>
              <td colSpan={3}>
                <hr className={styles.bold} />
              </td>
            </tr>
            <tr className={styles.total}>
              <td>TOTAL</td>
              <td></td>
              <td>₩{price + (orderer.isShipping ? deliveryCharge : 0)}</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.check}>
          카카오뱅크
          <br />
          3333 - 05 - 6961823 (장한나)
        </div>
        <div className={styles.orderer}>
          <div className={styles.confirm}>Confirm</div>
          <div className={styles.row}>
            <div>Orderer / 주문자</div>
            <div>{orderer.name}</div>
            <div>{orderer.phone}</div>
          </div>
          <div className={styles.row}>
            <div>Shipping / 배송</div>
            <div>{orderer.isShipping ? orderer.address : "현장 결제"}</div>
          </div>
          <div className={styles.row}>
            <div>Donation / 기부처</div>
            <div>{orderer.donation}</div>
          </div>
        </div>
        <Button
          text={"done!"}
          onClick={() => {
            alert("주문이 완료되었습니다");
            sendSlackMessage(orderer, orders, price, optionKeys);
            router.push("/");
          }}
        />
      </HeaderLayout>
    </Main>
  );
}
