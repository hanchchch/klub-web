import React, { useState, useEffect } from "react";
import styles from "./[id].module.scss";
import { categoryOptions, donation, options as optionsMap, products } from "@src/utils/store";
import Main from "@src/components/templates/Main";
import HeaderLayout from "@src/components/templates/HeaderLayout";
import Dropdown from "@src/components/atoms/Dropdown";
import TextInput from "@src/components/atoms/TextInput";
import useOrderer from "@src/utils/hooks/orderer";
import useOrders from "@src/utils/hooks/order";
import NumberInput from "@src/components/atoms/NumberInput";
import { BiX } from "react-icons/bi";
import { Ellipse } from "@src/components/atoms/Ellipse";
import router from "next/router";
import { validateOrderer } from "@src/utils/validate";
import { OrdererError } from "@src/types/order";
import { Button } from "@src/components/atoms/Button";

export default function ProductDetail(props: { id: number }) {
  const product = products.filter((product) => product.id == props.id)[0];
  const optionKeys = product
    ? product.category.map((category) => categoryOptions[category].map((option) => optionsMap[option].label)).flat()
    : [];
  const nonOption = optionKeys.length == 0;
  const initialOptions = Object.fromEntries(new Map(optionKeys.map((key) => [key, ""])));
  const [options, setOptions] = useState(initialOptions);
  const [ordererError, setOrdererError] = useState<OrdererError>({});
  const [agree, setAgree] = useState<boolean>(false);

  const [orderer, setOrderer] = useOrderer();
  const [orders, setOrders] = useOrders();

  useEffect(() => {
    setOrders([]);
  }, []);

  useEffect(() => {
    if (nonOption) {
      setOrders([
        {
          product,
          options: {
            quantity: 1,
          },
        },
      ]);
      return;
    }

    let blank = false;
    optionKeys.forEach((key) => {
      if (options[key] === "") blank = true;
    });
    if (!blank) {
      let isSameExists = false;
      orders.forEach((order) => {
        let same = true;
        optionKeys.forEach((key) => {
          if (order.options[key] !== options[key]) same = false;
        });
        if (same) isSameExists = true;
      });

      setOptions(initialOptions);

      if (isSameExists) return;
      setOrders([
        ...orders,
        {
          product,
          options: {
            ...options,
            quantity: 1,
          },
        },
      ]);
    }
  }, [options]);

  const handleDone = () => {
    if (orders.length <= 0) {
      alert("옵션을 선택해주세요.");
      return;
    }

    const errors = validateOrderer(orderer);
    if (Object.keys(errors).length > 0) {
      setOrdererError(errors);
    } else {
      if (!agree) {
        alert("주문자 식별 및 안내와 배송을 위해 주문자의 전화번호와 주소 제공의 동의가 필요합니다.");
      } else {
        router.push("/payment");
      }
    }
  };

  return (
    <Main>
      <HeaderLayout>
        <div className={styles.title}>{product?.name}</div>
        <div className={styles.image}>
          {product?.images.map((image) => (
            <div key={image}>
              <img src={image} />
            </div>
          ))}
        </div>
        <div className={styles.price}>
          {product?.orignalPrice && (
            <div className={styles.original}>
              ₩{product.orignalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
          )}
          ₩{product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
        <div className={styles.description}>{product?.description}</div>
        <Ellipse text={"ORDER NOW"} />
        {product?.category.map((category) =>
          categoryOptions[category].map((option) => {
            const label = optionsMap[option].label;
            const values = optionsMap[option].values;
            return (
              <Dropdown
                key={option}
                label={label}
                options={[{ label: "Select", value: "" }, ...values.map((value) => ({ label: value, value: value }))]}
                value={options[label]}
                onChange={(value) => setOptions((pre) => ({ ...pre, [label]: value as string }))}
              />
            );
          })
        )}
        <hr />
        {orders.map((order, index) => (
          <div className={styles.order} key={index}>
            <div>{!nonOption ? optionKeys.map((key) => order.options[key]).join(" / ") : "수량"}</div>
            <div className={styles.control}>
              <NumberInput
                value={order.options.quantity}
                onChange={(v) => {
                  if (v < 1) return;
                  const oldOrders = orders;
                  oldOrders[index].options.quantity = v;
                  setOrders(oldOrders);
                }}
              />
              {!nonOption && (
                <BiX
                  className={styles.cancel}
                  onClick={() => {
                    const oldOrders = orders;
                    oldOrders.splice(index, 1);
                    setOrders(oldOrders);
                  }}
                />
              )}
            </div>
          </div>
        ))}
        <hr />
        <TextInput
          label="Your Name / 주문자 성명"
          placeholder="임꺽정"
          name="name"
          value={orderer.name}
          error={ordererError.name}
          onChange={(v) => setOrderer({ ...orderer, name: v })}
        />
        <TextInput
          label="Phone Number / 연락처"
          placeholder="01012345678"
          type="number"
          name="phone"
          value={orderer.phone}
          error={ordererError.phone}
          onChange={(v) => setOrderer({ ...orderer, phone: v })}
        />
        <Dropdown
          label={"Shipping / 배송 여부"}
          options={[
            {
              label: "배송",
              value: "true",
            },
            {
              label: "유니스토어 현장 수령",
              value: "false",
            },
          ]}
          value={`${orderer.isShipping}`}
          onChange={(v) => setOrderer({ ...orderer, isShipping: v === "true" })}
        />
        {orderer.isShipping && (
          <TextInput
            label="Address / 주소"
            value={orderer.address}
            error={ordererError.address}
            onChange={(v) => setOrderer({ ...orderer, address: v })}
          />
        )}
        <Dropdown
          label={"Donation / 기부처"}
          options={[
            { label: "Select", value: "" },
            ...donation.map((donation) => ({
              label: donation,
              value: donation,
            })),
          ]}
          value={orderer.donation}
          error={ordererError.donation}
          onChange={(v) => setOrderer({ ...orderer, donation: v })}
        />
        <div className={styles.donation}>
          Where should we donate?
          <br />
          수익금 기부를 위한 기부처를 골라주세요.
        </div>
        <div className={styles.agree}>
          <div>개인 정보 수집 동의</div>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        </div>
        <Button text={"check!"} className={styles.check} onClick={handleDone} />
      </HeaderLayout>
    </Main>
  );
}

ProductDetail.getInitialProps = async (ctx: { query: { id: number } }) => {
  return { id: ctx.query.id };
};
