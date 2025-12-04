"use client";

import styles from "./BurgerMenuButton.module.scss";

interface BurgerMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const BurgerMenuButton = ({
  isOpen,
  onClick,
  className = "",
}: BurgerMenuButtonProps) => {
  return (
    <button
      className={`${styles.burgerButton} ${
        isOpen ? styles.open : ""
      } ${className}`}
      onClick={onClick}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={isOpen}
    >
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
    </button>
  );
};
