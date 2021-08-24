import React from "react";
import styles from "./index.module.scss";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
  name?: string;
  placeholder?: string;
  error?: string;
}

export default function TextInput(props: TextInputProps) {
  const { label, value, onChange, type = "text", name = "", placeholder = "", error } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>{label && `*${label}`}</div>
      <div className={styles.container}>
        <input
          type={type}
          value={value}
          name={name}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      <div className={styles.error}>{error}</div>
    </div>
  );
}
