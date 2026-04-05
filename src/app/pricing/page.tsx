import { Metadata } from "next";
import styles from "./pricing.module.scss";
import { OverlapContainer } from "@/components/ui";

export const metadata: Metadata = {
  title: "Услуги | Душа вашего дома",
  description: "Описание и состав пакетов услуг",
};

// Базовые услуги пакета "Проект для ремонта"
const repairProjectFeatures = [
  "Обмерный чертеж",
  "Схема демонтажа",
  "Схема монтажа",
  "Расстановка мебели",
  "Схема привязки сантехнического оборудования",
  "Схема открывания дверей",
  "Схема размещения розеток и выводов",
  "Схема размещения выключателей",
  "Схема размещения освещения",
  "Схема включения освещения",
  "Схема потолков",
  "Схема напольных покрытий",
  "Схема монтажа напольных плинтусов",
  "Развертки стен без мебели",
  "Визуализация помещений без мебели",
];

const pricingPlans = [
  {
    title: "Консультация по планировочному решению",
    price: "100 ₽/м²",
    features: [
      "Обмерный чертеж",
      "Схема демонтажа (при необходимости)",
      "Схема монтажа (при необходимости)",
      "Расстановка мебели и сантехнического оборудования",
      "Рекомендации по размещению электрики и освещения",
    ],
  },
  {
    title: "Проект для ремонта",
    price: "1 000 ₽/м²",
    features: repairProjectFeatures,
  },
  {
    title: "Дизайн-проект",
    price: "2 000 ₽/м²",
    includes: {
      title: "Всё из пакета «Проект для ремонта»",
      items: repairProjectFeatures,
    },
    features: [
      "Развертки стен с мебелью и декором",
      "Визуализация помещений с мебелью и декором",
    ],
  },
  {
    title: "Дизайн-проект с комплектацией",
    price: "2 500 ₽/м²",
    includes: {
      title: "Всё из пакета «Дизайн-проект»",
      items: [
        ...repairProjectFeatures,
        "Развертки стен с мебелью и декором",
        "Визуализация помещений с мебелью и декором",
      ],
    },
    features: [
      "Комплектовочные спецификации (чистовые материалы, электрика, освещение, сантехника, мебель)",
    ],
  },
  {
    title: "Дизайн-проект под ключ",
    price: "4 000 ₽/м²",
    includes: {
      title: "Всё из пакета «Дизайн-проект с комплектацией»",
      items: [
        ...repairProjectFeatures,
        "Развертки стен с мебелью и декором",
        "Визуализация помещений с мебелью и декором",
        "Комплектовочные спецификации (чистовые материалы, электрика, освещение, сантехника, мебель)",
      ],
    },
    features: [
      "Авторский надзор за реализацией дизайн-проекта (от консультации бригады до монтажа мебели и декора)",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className={styles.pricingPage}>
      {/* Hero секция */}
      <section className={styles.pricingHero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient} />
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>Пакеты услуг</h1>
              <p className={styles.heroSubtitle}>
                Выберите оптимальный формат сотрудничества для вашего проекта
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Сетка тарифов */}
      <OverlapContainer overlap="medium" borderRadius="medium">
        <section className={styles.pricingMain}>
          <div className="container">
            <div className={styles.pricingGrid}>
              {pricingPlans.map((plan, index) => (
                <article key={index} className={styles.pricingCard}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>{plan.title}</h2>
                    <div className={styles.cardPrice}>{plan.price}</div>
                  </div>

                  <div className={styles.cardFeatures}>
                    {/* Раскрывающийся блок с базовыми услугами */}
                    {plan.includes && (
                      <details className={styles.details}>
                        <summary className={styles.detailsSummary}>
                          <span className={styles.checkIcon}>✓</span>
                          <span className={styles.featureText}>
                            {plan.includes.title}
                          </span>
                        </summary>
                        <ul className={styles.nestedFeatures}>
                          {plan.includes.items.map((item, i) => (
                            <li key={i}>
                              <span className={styles.checkIcon}>✓</span>
                              <span className={styles.featureText}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}

                    {/* Дополнительные услуги текущего тарифа */}
                    {plan.features.map((feature, i) => (
                      <div key={i} className={styles.featureItem}>
                        <span className={styles.checkIcon}>✓</span>
                        <span className={styles.featureText}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={styles.cardButton}>Обсудить проект</button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </OverlapContainer>
    </main>
  );
}
