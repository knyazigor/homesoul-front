"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.scss";
import { SocialLinks } from "@/components/entities";
import { Phone, Mail } from "lucide-react";

export const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          {/* Основная информация */}
          <div className={styles.copyright}>
            <p>© {currentYear} Квашнина Полина Владимировна</p>
          </div>

          {/* Ссылки */}
          <div className={styles.links}>
            <Link
              href="/privacy-policy"
              className={`${styles.link} ${
                pathname === "/privacy-policy" ? styles.active : ""
              }`}
            >
              Политика конфиденциальности
            </Link>
          </div>

          {/* Контактная информация с иконками */}
          <div className={styles.contacts}>
            <div className={styles.contactItem}>
              <Phone size={18} className={styles.contactIcon} />

              <a href="tel:+79899594457" className={styles.contactLink}>
                +7 (989) 959-44-57
              </a>
            </div>

            <div className={styles.contactItem}>
              <Mail size={18} className={styles.contactIcon} />
              <a href="mailto:info@dushadoma.ru" className={styles.contactLink}>
                info@dushadoma.ru
              </a>
            </div>

            <div className={styles.socialSection}>
              <SocialLinks variant="rounded" size="medium" showLabels={false} />
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className={styles.divider} />

        {/* Нижняя часть */}
        <div className={styles.bottom}>
          <p className={styles.rights}>
            Все права защищены. Любое копирование материалов сайта без
            разрешения запрещено
          </p>
          <p className={styles.disclaimer}>
            Вся информация на сайте носит ознакомительный характер и не является
            публичной офертой
          </p>
          <p className={styles.disclaimer}>
            Деятельность компании Meta (владелец социальных сетей Instagram,
            Facebook и мессенджера WhatsApp) признана экстремистской и запрещена
            на территории РФ
          </p>
        </div>
      </div>
    </footer>
  );
};
