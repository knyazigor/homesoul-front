import Image from "next/image";
import styles from "./page.module.scss";
import { Header } from "@/components/layout";
import { Hero } from "@/components/sections";
import { Portfolio } from "@/components/sections/Portfolio/ui/Portfolio";
import { getMainPagePortfolioProjects } from "@/actions/portfolio";

export default async function Home() {
  const projects = await getMainPagePortfolioProjects();
  return (
    <>
      <Header />
      <div className={styles.page}>
        <Hero />

        {/* О себе */}
        <section className={styles.about}>
          <div className="container">
            <div className={styles.aboutContent}>
              <div className={styles.aboutText}>
                <h2>Обо мне</h2>
                <p>
                  Я профессиональный дизайнер интерьеров с 8-летним опытом.
                  Специализируюсь на создании элегантных и функциональных
                  пространств для частных клиентов и коммерческих проектов.
                </p>
                <ul className={styles.features}>
                  <li>Более 50 реализованных проектов</li>
                  <li>Индивидуальный подход к каждому клиенту</li>
                  <li>Полное сопровождение от концепции до реализации</li>
                </ul>
              </div>
              <div className={styles.aboutImage}>
                <Image
                  src="/images/about/designer-portrait.jpg"
                  alt="Дизайнер"
                  width={640}
                  height={640}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Услуги */}
        {/* <Pricing /> */}

        {/* Портфолио */}
        <Portfolio projects={projects} />
        {/* CTA секция */}
        <section className={styles.cta}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Готовы преобразить ваше пространство?</h2>
              <p>
                Запишитесь на бесплатную консультацию и мы обсудим ваш проект
              </p>
              <form className={styles.ctaForm}>
                <input
                  type="tel"
                  placeholder="Ваш телефон"
                  className={styles.formInput}
                />
                <button type="submit" className={styles.primary}>
                  Записаться на консультацию
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
