"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ContactsModal } from "../modals";

interface ModalContextType {
  openContactsModal: () => void;
  closeContactsModal: () => void;
  isConsentChecked: boolean;
  setConsent: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
  const [isConsentChecked, setIsConsentChecked] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        openContactsModal: () => {
          setIsContactsModalOpen(true);
          setIsConsentChecked(false);
        },
        closeContactsModal: () => {
          setIsContactsModalOpen(false);
          setIsConsentChecked(false);
        },
        setConsent: (value: boolean) => {
          setIsConsentChecked(value);
        },
        isConsentChecked,
      }}
    >
      {children}
      <ContactsModal
        isOpen={isContactsModalOpen}
        onClose={() => setIsContactsModalOpen(false)}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}
