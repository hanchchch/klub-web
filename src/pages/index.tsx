import React from "react";
import styles from "./index.module.scss";
import Main from "@src/components/templates/Main";
import ProductCard from "@src/components/molecules/ProductCard";
import { products } from "@src/utils/store";
import { Product } from "@src/types/product";
import useView from "@src/utils/hooks/view";

export default function Index() {
  const [show, setShow] = useView();
  const isSet = (p: Product) => p.category.length > 1;

  return (
    <Main>
      <div className={styles.header}>
        <div className={styles.logo}>
          <embed src={"/assets/klub_logo.svg"} />
        </div>
        <div className={styles.choice}>
          <div className={show === "set" ? styles.active : styles.deactive} onClick={() => setShow("set")}>
            SET
          </div>
          <div className={show === "all" ? styles.active : styles.deactive} onClick={() => setShow("all")}>
            ALL
          </div>
        </div>
      </div>
      <div className={styles.container}>
        {products
          .filter((product) => (show === "all" ? !isSet(product) : isSet(product)))
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Main>
  );
}
