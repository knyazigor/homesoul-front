import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  uppercase?: boolean;
  width?: string | number; // Новый пропс
}

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  icon,
  iconPosition = "left",
  fullWidth = false,
  uppercase = true,
  width, // Новый пропс
  className = "",
  style = {}, // Добавляем поддержку style
  ...props
}) => {
  // Формируем стили для width
  const buttonStyles = {
    ...style,
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
  };

  return (
    <button
      className={`
        ${styles.button}
        ${styles[`variant-${variant}`]}
        ${styles[`size-${size}`]}
        ${fullWidth ? styles.fullWidth : ""}
        ${uppercase ? styles.uppercase : ""}
        ${className}
      `}
      style={buttonStyles} // Применяем стили
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className={styles.iconLeft}>{icon}</span>
      )}

      <span className={styles.text}>{children}</span>

      {icon && iconPosition === "right" && (
        <span className={styles.iconRight}>{icon}</span>
      )}
    </button>
  );
};
