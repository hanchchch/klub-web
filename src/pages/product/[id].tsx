import React from "react";
import styles from "./[id].module.scss";
import Main from "@src/components/templates/Main";
import { products } from "@src/utils/store";

export default function ProductDetail(props: { id: number }) {
  const product = products.filter(product => product.id == props.id)[0];

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

          <div className={styles.description}>
            {product?.description}
          </div>
        </div>
        <div className={styles.ordernow} style={{ backgroundImage: "url('/assets/ellipse.svg')" }}>
          ORDER NOW
        </div>
        {product?.price}
      </div>
    </Main>
  );
}

ProductDetail.getInitialProps = async (ctx: { query: {id: number} }) => {
  return { id: ctx.query.id };
};