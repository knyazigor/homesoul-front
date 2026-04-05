import Image from "next/image";
import styles from "./page.module.scss";
import { Hero } from "@/components/sections";
import { Portfolio } from "@/components/sections/Portfolio/ui/Portfolio";
import { getMainPagePortfolioProjects } from "@/actions/portfolio";

export default async function Home() {
  const projects = await getMainPagePortfolioProjects();

  return (
    <>
      <div className={styles.page}>
        <Hero />

        {/* О себе */}
        <section className={styles.about}>
          <div className="container">
            <div className={styles.aboutContent}>
              <div className={styles.aboutText}>
                <h2>Антикризисное управление вашим ремонтом</h2>
                <h3>
                  От жестких заводских рамок и Главного метролога ПАО
                  &rdquo;ОДК–УМПО&rdquo; к созиданию и личной ответственности
                </h3>
                <p>
                  Я верю, что интерьер — это отражение души. Я вижу, что за
                  каждой сметой стоит человек, а за каждым кирпичом — мечта. Но
                  чтобы ваш внутренний мир обрел форму в бетоне и дереве, нужен
                  не просто художник, а Руководитель.
                </p>
                <p>
                  Я пришла в дизайн интерьера из мира авиастроения, где знание
                  норм — это вопрос безопасности, а управление — это искусство.
                </p>
                <h3>Мои личные принципы в работе</h3>
                <ol className={styles.features}>
                  <li>
                    <span className={styles.strong}>Взаимное уважение</span>Я
                    управленец в третьем поколении и мать троих сыновей. Я умею
                    решать проблемы там, где всё пропало, но не терплю
                    несправедливости.
                  </li>
                  <li>
                    <span className={styles.strong}>
                      Абсолютная финансовая чистота
                    </span>
                    Я принципиально не беру агентские вознаграждения у магазинов
                    отделочных материалов и мебели. Это официально прописано в
                    моём договоре. Моя задача — сэкономить ваши деньги, а не
                    заработать на ваших покупках.
                  </li>
                  <li>
                    <span className={styles.strong}>
                      Системность против хаоса
                    </span>
                    Мой мозг заточен под масштабные задачи. Я фокусируюсь на
                    глобальной архитектуре и жизнеспособности проекта. Если
                    стройка подбрасывает сюрпризы, я принимаю решение на месте.
                  </li>
                </ol>
                <p>
                  Из метрологии я забрала системное мышление. Из управления —
                  масштаб. А в дизайне я обрела смысл: создавать интерьеры, в
                  которых люди чувствуют себя по-настоящему дома, где живёт
                  душа.
                </p>
                <p>
                  Я не просто рисую интерьер. Я создаю для вас пространство,
                  основанное на честности, инженерной логике и уважении к каждой
                  детали вашей жизни.
                </p>
                <p>
                  Я — главный создатель вашего пространства, и я отвечаю за
                  результат своим именем.
                </p>
              </div>
              <div className={styles.aboutImage}>
                <Image
                  src="/images/about/designer-portrait.jpg"
                  alt="Дизайнер интерьера"
                  width={640}
                  height={640}
                  style={{ objectFit: "cover", width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </section>

        <Portfolio projects={projects} />
      </div>
    </>
  );
}
