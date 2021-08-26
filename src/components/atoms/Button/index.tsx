import React from "react";
import styles from "./index.module.scss";

interface ButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  const { className = "", text, onClick } = props;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`${styles.button} ${className}`} onClick={handleClick}>
      {text}
    </div>
  );
}
