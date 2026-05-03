"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import Image from "next/image";
import { useHeaderScroll } from "../hooks/useHeaderScroll";
import { BurgerMenuButton } from "../ui/BurgerMenuButton";
import { useModal } from "@/components/providers/ModalProvider";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openContactsModal } = useModal();

  const { /* isVisible, */ isScrolled } = useHeaderScroll({
    hideThreshold: 100,
    scrolledThreshold: 50,
    debounceDelay: 50,
  });

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleRouteChange = () => {
      closeMobileMenu();
    };

    handleRouteChange();
  }, [pathname, closeMobileMenu]);

  const navItems = [
    { href: "/", label: "Главная" },
    { href: "/portfolio", label: "Портфолио" },
    { href: "/pricing", label: "Тарифы" },
    { href: "/documents", label: "Документы" },
    { href: "#", label: "Контакты", isModal: true },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleMobileLinkClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string,
      isModal?: boolean,
    ) => {
      if (isModal) {
        e.preventDefault();
        closeMobileMenu();
        setTimeout(() => {
          openContactsModal();
        }, 300);
      } else {
        e.preventDefault();
        closeMobileMenu();
        setTimeout(() => {
          if (href) {
            window.location.href = href;
          }
        }, 300);
      }
    },
    [closeMobileMenu, openContactsModal],
  );

  const handleDesktopLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, isModal?: boolean) => {
      if (isModal) {
        e.preventDefault();
        openContactsModal();
      }
    },
    [openContactsModal],
  );

  return (
    <>
      <Link href="/" className={styles.logo}>
        <Image
          src="/images/logo-header.svg"
          alt="Душа Вашего Дома"
          height={60}
          width={320}
          className={styles.logoImage}
          priority
        />
      </Link>
      <BurgerMenuButton
        isOpen={isMobileMenuOpen}
        onClick={toggleMobileMenu}
        className={`${styles.mobileMenuButton} ${
          isScrolled ? styles.scrolled : ""
        }`}
      />
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  isActiveLink(item.href) ? styles.active : ""
                }`}
                onClick={(e) => handleDesktopLinkClick(e, item.isModal)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

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
        <nav className={styles.mobileMenuContent}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileNavLink} ${
                isActiveLink(item.href) ? styles.active : ""
              }`}
              onClick={(e) => handleMobileLinkClick(e, item.href, item.isModal)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};
