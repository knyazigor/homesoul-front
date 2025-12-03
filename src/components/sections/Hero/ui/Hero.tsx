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
      <div className="container">
        <div className={styles.heroContent}>
          <h1>Интерьер с чувствами к Вам</h1>
          <p className={styles.subtitle}>
            Создаю пространства, которые отражают вашу индивидуальность и дарят
            комфорт каждый день
          </p>
          <div className={styles.heroCtas}>
            <Button variant="secondary">Обсудить проект</Button>
            <Link href="/portfolio">
              <Button variant="secondary">Посмотреть работы</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
