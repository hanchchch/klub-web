import React from "react";
import styles from "./index.module.scss";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";


interface NumberInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export default function NumberInput(props: NumberInputProps) {
  const {  label = "", value, onChange, placeholder = "" } = props;
  return (
    <div className={styles.wrapper}>
      {label}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
      />
      <div className={styles.buttons}>
        <BiUpArrow onClick={() => onChange(value+1)}/>
        <BiDownArrow onClick={() => onChange(value-1)}/>
      </div>
      <div>
      </div>
    </div>
  );
}