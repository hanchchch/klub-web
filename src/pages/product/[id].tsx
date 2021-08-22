import React from "react";
import styles from "./[id].module.scss";
import Main from "@src/components/templates/Main";
import { categoryOptions, products } from "@src/utils/store";
import Dropdown from "@src/components/atoms/Dropdown";

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
      </div>
    </Main>
  );
}

ProductDetail.getInitialProps = async (ctx: { query: {id: number} }) => {
  return { id: ctx.query.id };
};