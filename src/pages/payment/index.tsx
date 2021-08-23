import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Main from "@src/components/templates/Main";
import useOrderer from "@src/utils/hooks/orderer";
import useOrders from "@src/utils/hooks/order";
import { Ellipse } from "@src/components/atoms/Ellipse";
import router from "next/router";
import HeaderLayout from "@src/components/templates/HeaderLayout";
import { deliveryCharge } from "@src/utils/store";

export default function Payment() {
  const [orders] = useOrders();
  const [orderer] = useOrderer();

  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setPrice(
      orders
        .map(o => o.product.price * o.quantity)
        .reduce((a, b) => a + b, 0)
    );
  }, [orders]);

  return (
    <Main>
      <HeaderLayout className={styles.container}>
        <Ellipse text={"PAYMENT"} />
        <div>Order Summary / 주문 내역</div>
        <hr />
        <table>
          <tbody>
            <tr>
              <td>Subtotal / 합계</td>
              <td>₩{price}</td>
            </tr>
            <tr>
              <td>Shipping / 배송</td>
              <td>₩{orderer.isShipping ? deliveryCharge : 0}</td>
            </tr>
            <tr>
              <td colSpan={2}><hr className={styles.bold}/></td>
            </tr>
            <tr className={styles.total}>
              <td>TOTAL</td>
              <td>₩{price + (orderer.isShipping ? deliveryCharge : 0)}</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.check} >
          카카오뱅크<br />
          3333 - 05 - 6961823 (장한나)
        </div>
        <Ellipse text={"DONE!"} onClick={() => router.push("/payment")} />
      </HeaderLayout>
    </Main>
  );
}
