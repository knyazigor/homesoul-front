"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import Image from "next/image";
import { useHeaderScroll } from "../hooks/useHeaderScroll";
import { Menu, X } from "lucide-react";
import { SocialLinks } from "@/components/entities";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { isVisible, isScrolled } = useHeaderScroll({
    hideThreshold: 100,
    scrolledThreshold: 50,
    debounceDelay: 50,
  });

  // Блокируем скролл body при открытом мобильном меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: "/", label: "Главная" },
    { href: "/portfolio", label: "Портфолио" },
    { href: "/pricing", label: "Тарифы" },
    { href: "/contact", label: "Контакты" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${
          !isVisible ? styles.hidden : ""
        } ${isMobileMenuOpen ? styles.menuOpen : ""}`}
      >
        <div className="container">
          <nav className={styles.nav}>
            {/* Логотип */}
            <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
              <Image
                src="/images/logo-header.svg"
                alt="Душа Вашего Дома"
                height={60}
                width={320}
                className={styles.logoImage}
                priority
              />
            </Link>

            {/* Десктопное меню */}
            <div className={styles.navLinks}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${
                    isActiveLink(item.href) ? styles.active : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Кнопка мобильного меню */}
            <button
              className={styles.mobileMenuButton}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X size={24} className={styles.menuIcon} />
              ) : (
                <Menu size={24} className={styles.menuIcon} />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Мобильное меню */}
      <div
        className={`${styles.mobileMenuOverlay} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
        onClick={closeMobileMenu}
        aria-hidden={!isMobileMenuOpen}
      />

      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className={styles.mobileMenuHeader}>
          <Link
            href="/"
            className={styles.mobileLogo}
            onClick={closeMobileMenu}
          >
            <Image
              src="/images/logo-header.svg"
              alt="Душа Вашего Дома"
              height={60}
              width={320}
              className={styles.mobileLogoImage}
            />
          </Link>
          <button
            className={styles.mobileMenuClose}
            onClick={closeMobileMenu}
            aria-label="Закрыть меню"
          >
            <X size={24} />
          </button>
        </div>

        <nav className={styles.mobileMenuContent}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileNavLink} ${
                isActiveLink(item.href) ? styles.active : ""
              }`}
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.mobileSocialLinks}>
          <SocialLinks variant="rounded" size="small" showLabels={false} />
        </div>
      </div>
    </>
  );
};
