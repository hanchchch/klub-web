import React, { useState } from "react";
import styles from "./index.module.scss";
import Main from "@src/components/templates/Main";
import ProductCard from "@src/components/molecules/ProductCard";
import { products } from "@src/utils/store";

export default function Index() {
  const [show, setShow] = useState<"set" | "all">("set");

  return (
    <Main>
      <div className={styles.header}>
        <div className={styles.logo}>
          <embed src={"/assets/klub_logo.svg"} />
        </div>
        <div className={styles.choice}>
          <div
            className={show === "set" ? styles.active : styles.deactive}
            onClick={() => setShow("set")}
          >
            SET
          </div>
          <div
            className={show === "all" ? styles.active : styles.deactive}
            onClick={() => setShow("all")}
          >
            ALL
          </div>
        </div>
      </div>
      <div className={styles.container}>
        {products.map(product => 
          <ProductCard
            key={product.id}
            product={product}
          />
        )}
      </div>
    </Main>
  );
}
