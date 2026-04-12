import { Metadata } from "next";
import Image from "next/image";
import styles from "./pricing.module.scss";
import { OverlapContainer } from "@/components/ui";
import { ContactButton } from "@/components/entities";

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

const rulerIcon = { src: "/images/ruler.svg", alt: "Ruler" };
const cartIcon = { src: "/images/cart.svg", alt: "Cart" };
const premiumIcon = { src: "/images/premium.svg", alt: "Gem" };
const planIcon = { src: "/images/plan.svg", alt: "Plan" };
const designIcon = { src: "/images/design.svg", alt: "Brush" };

const pricingPlans = [
  {
    title: "Консультация по планировочному решению",
    subtitle: "Первые шаги к идеальному дому",
    price: 100,
    images: [rulerIcon],
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
    subtitle: "Ремонт без сюрпризов",
    price: 1000,
    images: [rulerIcon, planIcon],
    features: repairProjectFeatures,
  },
  {
    title: "Дизайн-проект",
    subtitle: "Ваша мечта в деталях",
    price: 2000,
    images: [rulerIcon, planIcon, designIcon],
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
    subtitle: "Список покупок готов",
    price: 2500,
    images: [rulerIcon, planIcon, designIcon, cartIcon],
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
    subtitle: "От идеи до финального штриха",
    price: 4000,
    images: [rulerIcon, planIcon, designIcon, cartIcon, premiumIcon],
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
          <div className={styles.heroGradient}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>Пакеты услуг</h1>
                <p className={styles.heroSubtitle}>
                  Выберите оптимальный формат сотрудничества для вашего проекта
                </p>
              </div>
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
                    <h3 className={styles.cardSubtitle}>{plan.subtitle}</h3>
                    <div className={styles.cardPrice}>
                      <span>{plan.price.toLocaleString("ru-RU")}</span>
                      <span className={styles.currency}>₽/м²</span>
                    </div>
                    <div className={styles.iconsContainer}>
                      {plan.images.map((image) => (
                        <Image
                          key={image.src}
                          src={image.src}
                          alt={image.alt}
                          width={24}
                          height={24}
                          className={styles.icon}
                        />
                      ))}
                    </div>
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

                  <ContactButton title="Обсудить проект" />
                </article>
              ))}
            </div>
          </div>
        </section>
      </OverlapContainer>
    </main>
  );
}
