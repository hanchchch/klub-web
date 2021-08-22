import React, { useState, useEffect } from "react";
import styles from "./[id].module.scss";
import { categoryOptions, donation, options as optionsMap, products } from "@src/utils/store";
import Main from "@src/components/templates/Main";
import Dropdown from "@src/components/atoms/Dropdown";
import TextInput from "@src/components/atoms/TextInput";
import useOrders from "@src/utils/hooks/order";
import NumberInput from "@src/components/atoms/NumberInput";
import { BiX } from "react-icons/bi";

export default function ProductDetail(props: { id: number }) {
  const product = products.filter(product => product.id == props.id)[0];
  const optionKeys = product.category.map(category => (
    categoryOptions[category].map(option => (
      optionsMap[option].label
    ))
  )).flat();
  const initialOptions = Object.fromEntries(new Map(optionKeys.map(key => [key, ""])));
  const [options, setOptions] = useState(initialOptions);

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [isShipping, setIsShipping] = useState<boolean>(false);

  const [orders, setOrders] = useOrders();

  useEffect(() => {
    let blank = false;
    optionKeys.forEach(key => {
      if (options[key] === "") {
        blank = true;
      }
    });
    if (!blank) {
      setOptions(initialOptions);
      setOrders([
        ...orders,
        { product, options, quantity: 1 },
      ]);
    }
  }, [options]);

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
          categoryOptions[category].map(option => {
            const label = optionsMap[option].label;
            const values = optionsMap[option].values;
            return <Dropdown
              key={option}
              label={label}
              options={[
                { label: "Select", value: "" },
                ...values.map(value => ({ label: value, value: value }))
              ]}
              value={options[label]}
              onChange={(value) => setOptions(pre => ({ ...pre, [label]: value as string }))}
            />;
          })
        ))}
        <hr />
        {orders.map((order, index) => (
          <div className={styles.order} key={index}>
            <div>{optionKeys.map(key => order.options[key]).join(" / ")}</div>
            <div className={styles.control}>
              <NumberInput
                value={order.quantity}
                onChange={v => {
                  if (v < 1) return;
                  const oldOrders = orders;
                  oldOrders[index].quantity = v;
                  setOrders(oldOrders);
                }}
              />
              <BiX className={styles.cancel} onClick={() => {
                const oldOrders = orders;
                oldOrders.splice(index, 1);
                setOrders(oldOrders);
              }}/>
            </div>
          </div>
        ))}
        <hr />
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