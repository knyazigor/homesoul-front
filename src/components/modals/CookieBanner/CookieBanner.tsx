"use client";

import { useState, useEffect } from "react";
import styles from "./CookieBanner.module.scss";

const COOKIE_CONSENT_KEY = "cookie-consent-accepted";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasAccepted) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p className={styles.text}>
          Мы используем файлы cookie для улучшения работы сайта. Продолжая
          использовать наш сайт, вы соглашаетесь с{" "}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Политикой конфиденциальности
          </a>
          .
        </p>
        <button onClick={handleAccept} className={styles.button}>
          Согласен
        </button>
      </div>
    </div>
  );
};
