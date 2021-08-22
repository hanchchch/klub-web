import React from "react";
import styles from "./index.module.scss";

interface OptionProps {
  label: string;
  options: {
    choice: string;
    value: number;
  }[];
}

export default function Option(props: OptionProps) {
  const { label, options } = props;
  return (
    <div className={styles.wrapper}>
      *{label}
      <div className={styles.container}>
        {options.map(option => (
          <div className={styles.row} key={option.choice}>
            <div className={styles.item}>
              {option.choice}
            </div>
            <div className={styles.item}>
              {option.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}