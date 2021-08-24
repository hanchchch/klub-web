import React from "react";
import styles from "./index.module.scss";
import { BiDownArrow } from "react-icons/bi";

interface DropdownProps<T> {
  label?: string;
  options: {
    label: string;
    value: T;
  }[];
  value?: T;
  onChange?: (value: T) => void;
  error?: string;
}

export default function Dropdown<T extends string | number>(props: DropdownProps<T>) {
  const { label = "", options, value, onChange, error } = props;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value as T);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div>{label && `*${label}`}</div>
        <BiDownArrow className={styles.arrow} />
      </div>
      <div className={styles.container}>
        <select onChange={handleChange} value={value}>
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.error}>{error}</div>
    </div>
  );
}
