"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./SocialLinks.module.scss";

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
}

interface SocialLinksProps {
  variant?: "default" | "minimal" | "rounded";
  size?: "small" | "medium" | "large";
  showLabels?: boolean;
  className?: string;
}

export const SocialLinks = ({
  variant = "default",
  size = "medium",
  showLabels = false,
  className = "",
}: SocialLinksProps) => {
  const socialLinks: SocialLink[] = [
    {
      name: "telegram",
      url: "t.me/dusha_vashegodoma",
      icon: "/images/telegram-logo-white.svg",
      label: "Telegram",
    },
    {
      name: "whatsapp",
      url: "https://wa.me/79899594457",
      icon: "/images/whatsapp-logo-white.svg",
      label: "WhatsApp",
    },
    {
      name: "vk",
      url: "https://vkvideo.ru/@club233008937",
      icon: "/images/vk-logo-white.svg",
      label: "ВКонтакте",
    },
    {
      name: "max",
      url: "https://max.ru/u/f9LHodD0cOIr8wE3Zw2qXKAK3_M5G6JthcHU2M0NElRpLMLwYAxgriI1AbI",
      icon: "/images/max-white.svg",
      label: "max",
    },
  ];

  const sizeClasses = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  return (
    <div
      className={`${styles.socialLinks} ${styles[variant]} ${sizeClasses[size]} ${className}`}
    >
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label={social.label}
          title={social.label}
        >
          <div className={styles.iconWrapper}>
            <Image
              src={social.icon}
              alt={social.label}
              width={32}
              height={32}
              className={styles.icon}
            />
          </div>
          {showLabels && <span className={styles.label}>{social.label}</span>}
        </Link>
      ))}
    </div>
  );
};
