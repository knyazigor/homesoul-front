"use client";

import classNames from "classnames";
import React, { FC, useState } from "react";
import styles from "./ContactButton.module.scss";
import { SocialLinks } from "./SocialLinks";

interface ContactButtonProps {
  title: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const ContactButton: FC<ContactButtonProps> = ({ title, onClick }) => {
  const [showContacts, setShowContacts] = useState(false);

  const handleButtonClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
      return;
    }
    setShowContacts(() => true);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.slider, {
          [styles.showContacts]: showContacts,
        })}
      >
        <div className={styles.slide}>
          <button
            type="button"
            className={styles.button}
            onClick={handleButtonClick}
          >
            <span className={styles.buttonTitle}>{title}</span>
          </button>
        </div>
        <div className={styles.slide} onClick={() => setShowContacts(false)}>
          <div className={styles.contactButtonsContainer}>
            <SocialLinks size="small" />
          </div>
        </div>
      </div>
    </div>
  );
};
