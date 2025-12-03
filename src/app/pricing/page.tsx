import { Metadata } from "next";

import styles from "./pricing.module.scss";
import { OverlapContainer, ScrollToButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Услуги | Душа вашего дома",
  description: "Описание и состав пакетов услуг",
};

export default async function PricingPage() {
  return (
    <>
      <main className={styles.pricingPage}>
        <section className={styles.portfolioHero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroGradient} />
          </div>
          <div className={styles.heroContent}>
            <div className="container">
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>Пакеты услуг</h1>
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
          <section className={styles.pricingMain}>Тут тарифные планы</section>
        </OverlapContainer>
      </main>
    </>
  );
}
