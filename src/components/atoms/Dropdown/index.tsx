import React from "react";
import styles from "./index.module.scss";
import { BiDownArrow } from "react-icons/bi";

interface DropdownProps {
  label?: string;
  options: {
    label: string;
    value: string | number;
  }[];
  value?: string | number;
  onChange?: (value: string | number) => void;
}

export default function Dropdown(props: DropdownProps) {
  const { label = "", options, value, onChange } = props;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div>{label && `*${label}`}</div>
        <BiDownArrow className={styles.arrow}/>
      </div>
      <div className={styles.container}>
        <select onChange={handleChange} value={value}>
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