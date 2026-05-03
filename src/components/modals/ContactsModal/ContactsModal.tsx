"use client";

import Modal from "react-pure-modal";
import { useState, useCallback } from "react";

import styles from "./ContactsModal.module.scss";
import { ContactLinks } from "@/components/entities";
import { FC } from "react";
import { useModal } from "@/components/providers/ModalProvider";

interface ContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactsModal: FC<ContactsModalProps> = ({ isOpen, onClose }) => {
  const [error, setError] = useState<string>("");

  const { isConsentChecked, setConsent } = useModal();

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsent(e.target.checked);
    if (e.target.checked) {
      setError("");
    }
  };

  const handleSocialLinkClick = useCallback(
    (url: string) => {
      if (!isConsentChecked) {
        setError("Пожалуйста, согласитесь на обработку персональных данных");
        return;
      }
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [isConsentChecked],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackdropClick={true}
      style={{
        "--box-shadow": "none",
        "--close-button-background": "transparent",
        "--close-button-border": "none",
        "--close-button-container-transform": "translate(-6px, 36px)",
        "--max-height": "90vh",
      }}
    >
      <Modal.Close />
      <div className={styles.container}>
        <h2 className={styles.title}>Связаться со мной</h2>

        <label className={styles.consentLabel}>
          <input
            type="checkbox"
            checked={isConsentChecked}
            onChange={handleConsentChange}
            className={styles.consentCheckbox}
          />
          <span className={styles.consentText}>
            Я соглашаюсь на{" "}
            <a
              href="/personal-data-policy"
              target="_blank"
              className={styles.consentLink}
              onClick={(e) => e.stopPropagation()}
            >
              обработку персональных данных
            </a>
          </span>
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <ContactLinks
          variant="column"
          disabled={!isConsentChecked}
          onLinkClick={handleSocialLinkClick}
        />

        <div className={styles.disclaimer}>
          * Деятельность компании Meta (владелец социальных сетей Instagram,
          Facebook и мессенджера WhatsApp) признана экстремистской и запрещена
          на территории РФ
        </div>
      </div>
    </Modal>
  );
};
