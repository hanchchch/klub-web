import React from "react";
import styles from "./index.module.scss";


interface CardProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Card(props: CardProps) {
  const {  onClick = () => null, children } = props;
  return (
    <div className={styles.card} onClick={() => onClick()}>
      {children}
    </div>
  );
}