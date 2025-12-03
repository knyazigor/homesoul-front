import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout";
import { PortfolioGrid } from "@/components/entities/Portfolio/PortfolioGrid";
import { getAllPortfolioProjects } from "@/actions/portfolio";
import styles from "./portfolio.module.scss";
import { OverlapContainer } from "@/components/ui";
import { ScrollToButton } from "@/components/ui/ScrollToButton/ScrollToButton";

export const metadata: Metadata = {
  title: "Портфолио | Дизайн интерьеров",
  description:
    "Все проекты дизайнера интерьеров. Реализованные работы в различных стилях для квартир, домов и коммерческих помещений.",
};

export default async function PortfolioPage() {
  const projects = await getAllPortfolioProjects();

  return (
    <>
      <Header />
      <main className={styles.portfolioPage}>
        {/* Hero секция без отступов */}
        <section className={styles.portfolioHero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroGradient} />
          </div>
          <div className={styles.heroContent}>
            <div className="container">
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>Портфолио проектов</h1>
                <p className={styles.heroSubtitle}>
                  Реализованные работы в различных стилях — от уютных квартир до
                  просторных загородных домов и коммерческих помещений
                </p>
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

        {/* Сетка проектов с якорем */}
        <div id="projects-section">
          <OverlapContainer overlap="medium" borderRadius="medium">
            <PortfolioGrid projects={projects} />
          </OverlapContainer>
        </div>

        {/* CTA секция */}
        <section className={styles.portfolioCta}>
          <div className="container">
            <div className={styles.portfolioCtaContent}>
              <h2>Вдохновились нашими работами?</h2>
              <p>Давайте обсудим, как мы можем реализовать ваши идеи в жизнь</p>
              <div className={styles.portfolioCtaActions}>
                <Link href="/contact">Обсудить проект</Link>
                <Link href="/">На главную</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
