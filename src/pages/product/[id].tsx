import React, { useState } from "react";
import styles from "./[id].module.scss";
import { categoryOptions, donation, products } from "@src/utils/store";
import Main from "@src/components/templates/Main";
import Dropdown from "@src/components/atoms/Dropdown";
import TextInput from "@src/components/atoms/TextInput";

export default function ProductDetail(props: { id: number }) {
  const product = products.filter(product => product.id == props.id)[0];
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  return (
    <Main>
      <div className={styles.header}>
        <a href="/">
          <div className={styles.logo} >
            <embed src={"/assets/klub_logo.svg"}/>
          </div>
        </a>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          {product?.name}
        </div>
        <div className={styles.image}>

        </div>
        <div className={styles.description}>
          {product?.description}
        </div>
        <div className={styles.ordernow} style={{ backgroundImage: "url('/assets/ellipse.svg')" }}>
          ORDER NOW
        </div>
        {product.category.map(category => (
          <div key={category} className={styles.category}>
            {categoryOptions[category].map(option => (
              <Dropdown
                key={option}
                label={"Size"}
                options={[{
                  label: "M",
                  value: "M",
                }, {
                  label: "L",
                  value: "L",
                }, {
                  label: "XL",
                  value: "XL",
                }]}
              />
            ))}
          </div>
        ))}
        <div>
          <TextInput
            label="Your Name / 주문자 성명"
            placeholder="임꺽정"
            value={name}
            onChange={(v) => setName(v)}
          />
        </div>
        <div>
          <TextInput
            label="Phone Number / 연락처"
            placeholder="01012345678"
            value={phone}
            onChange={(v) => setPhone(v)}
          />
        </div>
        <div>
          <Dropdown
            label={"Shipping / 배송 여부"}
            options={[{
              label: "예",
              value: "true",
            }, {
              label: "아니오",
              value: "false",
            }]}
          />
        </div>
        <div>
          <TextInput
            label="Address / 주소"
            value={address}
            onChange={(v) => setAddress(v)}
          />
        </div>
        <div>
          <Dropdown
            label={"Donation / 기부처"}
            options={donation.map(donation => ({
              label: donation,
              value: donation,
            }))}
          />
          <div className={styles.donation}>
            Where should we donate?<br />
            수익금 기부를 위한 기부처를 골라주세요.
          </div>
        </div>
      </div>
    </Main>
  );
}

ProductDetail.getInitialProps = async (ctx: { query: {id: number} }) => {
  return { id: ctx.query.id };
};