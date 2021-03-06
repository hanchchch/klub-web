import React, { useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import Main from "@src/components/templates/Main";
import ProductCard from "@src/components/molecules/ProductCard";
import { Product } from "@src/types/product";
import useView from "@src/utils/hooks/view";
import { useEffect } from "react";
import { listProducts } from "@src/utils/api";

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [show, setShow] = useView();

  useEffect(() => {
    listProducts().then((products) => setProducts(products));
  }, []);

  return (
    <Main>
      <div className={styles.header}>
        <div className={styles.buttons}>
          <Link href={"/my"}>
            <a>
              <div className={styles.myOrder}>My Orders</div>
            </a>
          </Link>
        </div>
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
          .filter((product) => (show === "all" ? !product.is_set : product.is_set))
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.notice}>
          <div>
            <div className={styles.title}>서버 지원</div>
            <div className={styles.content}>
              <a href="https://devkorops.notion.site/DevKor-4ad582d6659647edb9131625da3da387">
                소프트웨어 개발 연구 학회 DevKor
              </a>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>문의</div>
            <div className={styles.content}>
              <a href="https://www.instagram.com/klub_project/">instagram @klub_project</a>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}
