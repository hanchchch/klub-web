import React from "react";
import styles from "./[id].module.scss";
import Main from "@src/components/templates/Main";
import { categoryOptions, products } from "@src/utils/store";
import Option from "@src/components/atoms/Option";

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
              <Option
                key={option}
                label={"Size"}
                options={[{
                  choice: "M",
                  value: 0,
                }, {
                  choice: "L",
                  value: 0,
                }, {
                  choice: "XL",
                  value: 0,
                }]}
              />
            ))}
          </div>
        ))}
      </div>
    </Main>
  );
}

ProductDetail.getInitialProps = async (ctx: { query: {id: number} }) => {
  return { id: ctx.query.id };
};