import React, { useState } from "react";
import styles from "./index.module.scss";
import Main from "@src/components/templates/Main";
import HeaderLayout from "@src/components/templates/HeaderLayout";
import { getOrderer } from "@src/utils/api";
import { OrdererResponse } from "@src/types/order";
import TextInput from "@src/components/atoms/TextInput";
import { Ellipse } from "@src/components/atoms/Ellipse";
import { addComma } from "@src/utils/math";
import { Button } from "@src/components/atoms/Button";

export default function MyPage() {
  const [phone, setPhone] = useState<string>("");
  const [info, setInfo] = useState<OrdererResponse>();

  return (
    <Main>
      {info ? (
        <HeaderLayout className={styles.container}>
          <Ellipse text={"PAYMENT"} />
          <div className={styles.orderer}>
            <div className={styles.title}>Orderer / 주문자</div>
            <div className={styles.row}>
              <div>Orderer / 주문자</div>
              <div>{info.username}</div>
              <div>{info.phone}</div>
            </div>
            <div className={styles.row}>
              <div>Shipping / 배송</div>
              <div>{info.address}</div>
            </div>
            <div className={styles.row}>
              <div>Donation / 기부처</div>
              <div>{info.donation}</div>
            </div>
          </div>
          <div className={styles.title}>Order Summary / 주문 내역</div>
          <hr />
          <table>
            <tbody>
              {info.orders.map((o) => (
                <tr key={o.order}>
                  <td>{o.order}</td>
                  <td>₩{addComma(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.check}>
            카카오뱅크
            <br />
            3333 - 05 - 6961823 (장한나)
          </div>
        </HeaderLayout>
      ) : (
        <HeaderLayout className={styles.container}>
          <TextInput label={"전화번호"} value={phone} onChange={(v) => setPhone(v)} placeholder={"01012345678"} />
          <Button
            text={"check!"}
            onClick={async () => {
              const info = await getOrderer(phone);
              if (info) setInfo(info);
              else alert("주문 정보가 없습니다.");
            }}
          />
        </HeaderLayout>
      )}
    </Main>
  );
}
