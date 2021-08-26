import React from "react";
import styles from "./index.module.scss";

interface EllipseProps {
  text?: string;
  className?: string;
}

export function Ellipse(props: EllipseProps) {
  const { className = "", text } = props;

  return (
    <div className={`${styles.ellipse} ${className}`} style={{ backgroundImage: "url('/assets/ellipse_2.svg')" }}>
      {text}
    </div>
  );
}
