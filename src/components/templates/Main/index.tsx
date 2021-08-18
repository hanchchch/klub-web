import React from "react";
import styles from "./index.module.scss";

export interface MainTemplateProps {
  children: React.ReactNode;
}

export default function MainTemplate(props: MainTemplateProps) {
  return (
    <>
      <div className={styles.root}>{props.children}</div>
    </>
  );
}
