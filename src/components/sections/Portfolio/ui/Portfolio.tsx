import { PortfolioGrid } from "@/components/entities/Portfolio";
import styles from "./Portfolio.module.scss";
import { PortfolioProject } from "@/lib/types";
import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

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
        <div className={styles.buttonContainer}>
          <Link href="/portfolio">
            <Button variant="outline" width={300}>
              Другие работы
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
