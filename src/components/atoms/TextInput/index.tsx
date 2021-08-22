import React from "react";
import styles from "./index.module.scss";


interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TextInput(props: TextInputProps) {
  const {  label, value, onChange, placeholder = "" } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        {label && `*${label}`}
      </div>
      <div className={styles.container}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}