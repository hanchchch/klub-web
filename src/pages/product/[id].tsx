import React, { useState, useEffect, useRef } from "react";
import styles from "./[id].module.scss";
import colors from "@styles/colors.module.scss";
import { donation } from "@src/utils/store";
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
import { addComma } from "@src/utils/math";
import { IoIosPhotos } from "react-icons/io";
import { OptionValue, Product } from "@src/types/product";
import { getProduct, getQuantities } from "@src/utils/api";

export default function ProductDetail(props: { id: number }) {
  const imageContainer = useRef<HTMLDivElement>();

  // const product = products.filter((product) => product.id == props.id)[0];
  // const optionKeys = product
  //   ? product.category.map((category) => categoryOptions[category].map((option) => optionsMap[option].label)).flat()
  //   : [];
  // const nonOption = optionKeys.length == 0;
  // const initialOptions = Object.fromEntries(new Map(optionKeys.map((key) => [key, ""])));
  const [product, setProduct] = useState<Product>();

  const [optionKeys, setOptionKeys] = useState<string[]>([]);
  const [options, setOptions] = useState<{ [k: string]: OptionValue }>({});

  const [ordererError, setOrdererError] = useState<OrdererError>({});
  const [agree, setAgree] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const [orderer, setOrderer] = useOrderer();
  const [orders, setOrders] = useOrders();

  const getInitOptions = (keys: string[]) =>
    Object.fromEntries(new Map(keys.map((key) => [key, { id: -1, value: "" }])));

  useEffect(() => {
    getProduct(props.id).then((product) => setProduct(product));
    setOrders([]);
  }, []);

  useEffect(() => {
    if (product) {
      const keys = product.options.map((option) => option.name);
      setOptionKeys(keys);
      setOptions(getInitOptions(keys));
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    if (optionKeys.length == 0) {
      setOrders([
        {
          product,
          options: product.fixed_options,
          quantity: 1,
        },
      ]);
      return;
    }

    let blank = false;
    const optionsArray = optionKeys.map((key) => options[key]);
    optionsArray.forEach((option) => {
      if (option.id == -1) {
        blank = true;
      }
    });

    if (!blank) {
      let isSameExists = false;
      orders.forEach((order) => {
        let same = true;
        optionsArray.forEach((option) => {
          if (!order.options?.includes(option)) same = false;
        });
        if (same) isSameExists = true;
      });

      setOptions(getInitOptions(optionKeys));

      if (isSameExists) return;
      getQuantities([...optionsArray, ...product.fixed_options], product.is_set).then((quantities) => {
        console.log(quantities.map((q) => q.quantity));
        let available = true;

        if (quantities.length == 0) {
          alert("Something went wrong");
          return;
        }

        quantities.forEach((q) => {
          if (q.quantity <= 0) {
            alert(`${optionsArray.map((o) => o.value).join(" / ")} 재고가 부족합니다.`);
            available = false;
          }
        });

        setOrders(
          available
            ? [
              ...orders,
              {
                product,
                options: optionsArray,
                quantity: 1,
                remaining: Math.min(...quantities.map((q) => q.quantity)),
              },
            ]
            : orders
        );
      });
    }
  }, [options]);

  useEffect(() => {
    setImageIndex(Math.round(scroll / imageContainer.current.clientWidth));
  }, [scroll]);

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
        <div className={styles.image} onScroll={(e) => setScroll(e.currentTarget.scrollLeft)} ref={imageContainer}>
          {product?.images.map((image) => (
            <div key={image.image}>
              <img src={image.image} />
            </div>
          ))}
        </div>
        <div className={styles.imageIndex}>
          <div>
            {imageIndex + 1}/{product?.images.length}
          </div>
          <IoIosPhotos color={colors.black} />
        </div>
        <div className={styles.price}>
          {product?.original_price != 0 && (
            <div className={styles.original}>₩{addComma(product?.original_price || 0)}</div>
          )}
          ₩{addComma(product?.price || 0)}
        </div>
        <div className={styles.description}>{product?.description}</div>
        <Ellipse text={"ORDER NOW"} />
        {product?.options.map((option) => (
          <Dropdown
            key={option.name}
            label={option.name}
            options={[
              { label: "Select", value: -1 },
              ...option.values.map((value) => ({ label: value.value, value: value.id })),
            ]}
            value={options[option.name]?.id || -1}
            onChange={(id) =>
              setOptions((pre) => ({ ...pre, [option.name]: option.values.filter((v) => v.id == id)[0] }))
            }
          />
        ))}
        <hr />
        {orders.map((order, index) => (
          <div className={styles.order} key={index}>
            <div>{optionKeys.length != 0 ? order.options?.map((option) => option.value).join(" / ") : "수량"}</div>
            <div className={styles.control}>
              <NumberInput
                value={order.quantity}
                onChange={(v) => {
                  if (v < 1) return;
                  if (v > order.remaining) return;
                  const oldOrders = orders;
                  oldOrders[index].quantity = v;
                  setOrders(oldOrders);
                }}
              />
              {optionKeys.length != 0 && (
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
