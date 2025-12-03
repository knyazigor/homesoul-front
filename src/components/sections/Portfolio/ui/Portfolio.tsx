import { PortfolioGrid } from "@/components/entities/Portfolio";
import styles from "./Portfolio.module.scss";
import { PortfolioProject } from "@/lib/types";
import { FC } from "react";

interface PortfolioProps {
  projects?: PortfolioProject[];
}

export const Portfolio: FC<PortfolioProps> = async ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <section className={styles.portfolio}>
        <div className="container">
          <h2>Избранные проекты</h2>
          <p className={styles.emptyMessage}>
            Скоро здесь появятся новые проекты...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.portfolio}>
      <div className="container">
        <h2>Избранные проекты</h2>
        <PortfolioGrid projects={projects} />
      </div>
    </section>
  );
};
