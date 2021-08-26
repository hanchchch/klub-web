import React from "react";
import styles from "./index.module.scss";
import Head from "next/head";

export interface MainTemplateProps {
  children: React.ReactNode;
}

export default function MainTemplate(props: MainTemplateProps) {
  return (
    <>
      <Head>
        <title>KLUB</title>
      </Head>
      <div className={styles.root}>{props.children}</div>
    </>
  );
}
