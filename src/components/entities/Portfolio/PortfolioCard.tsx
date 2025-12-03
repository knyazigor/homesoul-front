import Image from "next/image";
import Link from "next/link";
import styles from "./PortfolioCard.module.scss";
import { PortfolioProject } from "@/lib/types/portfolio";
import { getOptimizedImageUrl, getImageAltText } from "@/lib/image-utils";

interface PortfolioCardProps {
  project: PortfolioProject;
  href?: string;
  priority?: boolean;
  orientation?: "horizontal" | "vertical";
  showMeta?: boolean;
  className?: string;
}

export const PortfolioCard = ({
  project,
  href,
  priority = false,
  orientation = "horizontal",
  showMeta = false,
  className = "",
}: PortfolioCardProps) => {
  const { title, subtitle, cover, images } = project;
  const imageUrl = getOptimizedImageUrl(cover);
  const altText = getImageAltText(cover);

  const cardClassName = `${styles.card} ${styles[orientation]} ${
    href ? styles.hasLink : ""
  } ${className}`;

  const cardContent = (
    <article className={cardClassName}>
      <figure className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={altText}
          fill
          style={{ objectFit: "cover" }}
          className={styles.image}
          priority={priority}
          sizes={
            orientation === "horizontal"
              ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          }
        />
        <figcaption className={styles.caption}>
          <div className={styles.content}>
            <header className={styles.header}>
              <h3 className={styles.title}>{title}</h3>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </header>

            {showMeta && (
              <footer className={styles.meta}>
                <span className={styles.photoCount}>{images.length} фото</span>
              </footer>
            )}
          </div>
        </figcaption>
      </figure>
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={styles.link}
        aria-label={`Посмотреть проект: ${title}`}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
