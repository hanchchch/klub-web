import React from "react";
import styles from "./index.module.scss";
import { BiDownArrow } from "react-icons/bi";

interface DropdownProps {
  label?: string;
  options: {
    label: string;
    value: string | number;
  }[];
}

export default function Dropdown(props: DropdownProps) {
  const { label = "", options } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div>{label && `*${label}`}</div>
        <BiDownArrow className={styles.arrow}/>
      </div>
      <div className={styles.container}>
        <select>
          {options.map(option => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}