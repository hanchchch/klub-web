import React from "react";
import styles from "./index.module.scss";
import Main from "@src/components/templates/Main";


export default function HeaderLayout(props: { children?: React.ReactNode, className?: string }) {
  return (
    <Main>
      <div className={styles.header}>
        <a href="/">
          <div className={styles.logo} >
            <embed src={"/assets/klub_logo.svg"}/>
          </div>
        </a>
      </div>
      <div className={`${styles.container} ${props.className ?? ""}`}>
        {props.children}
      </div>
    </Main>
  );
}
