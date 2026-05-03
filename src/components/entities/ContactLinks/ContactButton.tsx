"use client";

import React, { FC } from "react";
import { useModal } from "@/components/providers/ModalProvider";
import { Button, ButtonProps } from "@/components/ui";

interface ContactButtonProps extends ButtonProps {
  title?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const ContactButton: FC<ContactButtonProps> = ({ onClick, ...rest }) => {
  const { openContactsModal } = useModal();

  const handleButtonClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
      return;
    }
    openContactsModal();
  };

  return <Button {...rest} onClick={handleButtonClick} />;
};
