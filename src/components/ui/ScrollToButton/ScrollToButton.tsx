"use client";

import { FC } from "react";
import { Button } from "@/components/ui";

interface ScrollToButtonProps {
  targetId: string;
  children: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export const ScrollToButton: FC<ScrollToButtonProps> = ({
  targetId,
  children,
  variant = "primary",
}) => {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button variant={variant} onClick={handleClick}>
      {children}
    </Button>
  );
};
