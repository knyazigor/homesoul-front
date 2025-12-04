import { PortfolioProject } from "@/lib/types/portfolio";
import { PortfolioCard } from "@/components/entities/Portfolio/PortfolioCard";
import styles from "./PortfolioGrid.module.scss";

interface PortfolioGridProps {
  projects: PortfolioProject[];
}

export const PortfolioGrid = ({ projects }: PortfolioGridProps) => {
  if (!projects || projects.length === 0) {
    return (
      <section className={styles.portfolioGridSection}>
        <div className="container">
          <div className={styles.emptyState}>
            <h2>Проекты временно недоступны</h2>
            <p>Скоро здесь появятся новые работы из нашего портфолио</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.portfolioGridSection}>
      <div className="container">
        <div className={styles.portfolioGrid}>
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.id}
              project={project}
              href={`/portfolio/${project.documentId}`}
              priority={index < 6}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
