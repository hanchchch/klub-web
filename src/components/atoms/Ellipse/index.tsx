import React from "react";
import styles from "./index.module.scss";


interface EllipseProps {
  text?: string;
  className?: string;
  onClick?: () => void;
}

export function Ellipse(props: EllipseProps) {
  const { className = "", text, onClick } = props;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`${styles.ordernow} ${className}`}
      style={{
        backgroundImage: "url('/assets/ellipse_2.svg')",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={handleClick}
    >
      {text}
    </div>
  );
}