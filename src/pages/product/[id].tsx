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

  const [isShipping, setIsShipping] = useState<boolean>(false);

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
        <div className={styles.ordernow} style={{ backgroundImage: "url('/assets/ellipse_2.svg')" }}>
          ORDER NOW
        </div>
        {product.category.map(category => (
          categoryOptions[category].map(option => (
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
          ))
        ))}
        <TextInput
          label="Your Name / 주문자 성명"
          placeholder="임꺽정"
          value={name}
          onChange={(v) => setName(v)}
        />
        <TextInput
          label="Phone Number / 연락처"
          placeholder="01012345678"
          value={phone}
          onChange={(v) => setPhone(v)}
        />
        <Dropdown
          label={"Shipping / 배송 여부"}
          options={[{
            label: "배송",
            value: "true",
          }, {
            label: "현장 결제",
            value: "false",
          }]}
          onChange={(v) => setIsShipping(v === "true")}
          value={`${isShipping}`}
        />
        {isShipping && <TextInput
          label="Address / 주소"
          value={address}
          onChange={(v) => setAddress(v)}
        />}
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
    </Main>
  );
}

ProductDetail.getInitialProps = async (ctx: { query: {id: number} }) => {
  return { id: ctx.query.id };
};