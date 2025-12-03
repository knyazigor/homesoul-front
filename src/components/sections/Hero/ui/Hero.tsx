import Image from "next/image";
import styles from "./Hero.module.scss";
import { Button } from "@/components/ui";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <Image
          src="/images/hero/hero-interior.jpg"
          alt="Элегантный дизайн интерьера"
          fill
          priority
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1280px"
          quality={85}
        />
        <div className={styles.heroOverlay}></div>
      </div>

      {/* Логотип по центру */}
      <div className={styles.heroLogo}>
        <Image
          src="/images/hero/hero-logo.svg"
          alt="Логотип"
          width={300}
          height={300}
          priority
        />
      </div>

      {/* Кнопки выше */}
      <div className={styles.heroBottom}>
        <div className={styles.heroCtas}>
          <Button variant="secondary" width={300}>
            Обсудить проект
          </Button>
          <Link href="/portfolio">
            <Button variant="secondary" width={300}>
              Посмотреть работы
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
