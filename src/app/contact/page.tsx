import { Metadata } from "next";

import styles from "./contact.module.scss";
import { OverlapContainer, ScrollToButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Контакты | Душа вашего дома",
  description: "Информация о контактных данных",
};

export default async function ContactPage() {
  return (
    <>
      <main className={styles.contactPage}>
        <section className={styles.contactHero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroGradient} />
          </div>
          <div className={styles.heroContent}>
            <div className="container">
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>Контакты</h1>
                <div className={styles.heroButtonsContainer}>
                  <ScrollToButton targetId="projects-section">
                    Проекты
                  </ScrollToButton>
                  <ScrollToButton targetId="projects-section" variant="outline">
                    Цены
                  </ScrollToButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <OverlapContainer overlap="medium" borderRadius="medium">
          <section className={styles.pricingMain}>
            Тут контактные данные
          </section>
        </OverlapContainer>
      </main>
    </>
  );
}
