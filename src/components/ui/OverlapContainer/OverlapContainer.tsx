"use client";

import { FC, ReactNode } from "react";
import styles from "./OverlapContainer.module.scss";

interface OverlapContainerProps {
  children: ReactNode;
  overlap?: "small" | "medium" | "large";
  borderRadius?: "small" | "medium" | "large";
  backgroundColor?: string;
  className?: string;
  animate?: boolean;
}

export const OverlapContainer: FC<OverlapContainerProps> = ({
  children,
  overlap = "medium",
  borderRadius = "medium",
  backgroundColor,
  className = "",
  animate = true,
}) => {
  return (
    <div
      className={`
        ${styles.overlapContainer} 
        ${styles[`overlap-${overlap}`]} 
        ${styles[`radius-${borderRadius}`]} 
        ${animate ? styles.animate : ""}
        ${className}
      `}
      style={{ backgroundColor }}
    >
      {children}
    </div>
  );
};
