"use client";

import Image from "next/image";
import styles from "./ContactLinks.module.scss";
import { MAX_LINK } from "@/lib/constants";
import { FC, MouseEventHandler } from "react";

interface ContactLink {
  name: string;
  url: string;
  icon: string;
  label: string;
  group: "contacts" | "messengers" | "social" | "phone" | "email";
}

interface ContactLinksProps {
  variant?: "default" | "minimal" | "rounded" | "column";
  size?: "small" | "medium" | "large";
  showLabels?: boolean;
  className?: string;
  disabled?: boolean;
  onLinkClick?: (url: string) => void;
}

export const ContactLinks: FC<ContactLinksProps> = ({
  variant = "default",
  size = "medium",
  showLabels = false,
  className = "",
  disabled = false,
  onLinkClick,
}) => {
  const contactLinks: ContactLink[] = [
    {
      name: "phone",
      url: "tel:+79899594457",
      icon: "/images/phone-white.svg",
      label: "+7 (989) 959-44-57",
      group: "phone",
    },
    {
      name: "email",
      url: "mailto:kvashninapv@gmail.com",
      icon: "/images/mail-white.svg",
      label: "kvashninapv@gmail.com",
      group: "email",
    },
    {
      name: "telegram",
      url: "https://t.me/polina261085",
      icon: "/images/telegram-logo-white.svg",
      label: "Telegram",
      group: "messengers",
    },
    {
      name: "whatsapp",
      url: "https://wa.me/79899594457",
      icon: "/images/whatsapp-logo-white.svg",
      label: "WhatsApp*",
      group: "messengers",
    },
    {
      name: "max",
      url: MAX_LINK,
      icon: "/images/max-white.svg",
      label: "Max",
      group: "messengers",
    },
    {
      name: "telegram",
      url: "https://t.me/dusha_vashegodoma",
      icon: "/images/telegram-logo-white.svg",
      label: "dusha_vashegodoma",
      group: "social",
    },
  ];

  const groupedLinks = {
    contacts: contactLinks.filter((link) => link.group === "contacts"),
    messengers: contactLinks.filter((link) => link.group === "messengers"),
    social: contactLinks.filter((link) => link.group === "social"),
    phone: contactLinks.filter((link) => link.group === "phone"),
    email: contactLinks.filter((link) => link.group === "email"),
  };

  const groupTitles = {
    phone: "Телефон",
    email: "Почта",
    contacts: "Контакты",
    messengers: "Мессенджеры",
    social: "Соцсети",
  };

  const sizeClasses = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  const imageSizes = {
    small: 20,
    medium: 24,
    large: 28,
  };

  const handleClick =
    (url: string): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.preventDefault();

      if (disabled) return;

      if (onLinkClick) {
        onLinkClick(url);
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    };

  const shouldShowLabels = variant === "column" ? true : showLabels;

  const renderGroup = (groupKey: keyof typeof groupedLinks) => {
    const links = groupedLinks[groupKey];
    if (links.length === 0) return null;

    return (
      <div key={groupKey} className={styles.group}>
        <h3 className={styles.groupTitle}>{groupTitles[groupKey]}</h3>
        <div className={styles.groupContent}>
          {links.map((contact) => (
            <button
              key={contact.name}
              onClick={handleClick(contact.url)}
              className={`${styles.contactLink} ${disabled ? styles.disabled : ""}`}
              aria-label={contact.label}
              title={contact.label}
              disabled={disabled}
              type="button"
            >
              <div className={styles.iconWrapper}>
                <Image
                  src={contact.icon}
                  alt={contact.label}
                  width={imageSizes[size]}
                  height={imageSizes[size]}
                  className={styles.icon}
                />
              </div>
              {shouldShowLabels && (
                <span className={styles.label}>{contact.label}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${styles.contactLinks} ${styles[variant]} ${sizeClasses[size]} ${className} ${disabled ? styles.disabled : ""}`}
    >
      {renderGroup("phone")}
      {renderGroup("email")}
      {renderGroup("contacts")}
      {renderGroup("messengers")}
      {renderGroup("social")}
    </div>
  );
};
