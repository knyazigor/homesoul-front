import styles from "./Pricing.module.scss";

export const Pricing = () => {
  const pricingPlans = [
    {
      title: "Консультация по планировочному решению",
      price: "100 руб./м²",
      features: [
        { text: "Обмерный план", nested: false },
        { text: "План демонтажа (при необходимости)", nested: false },
        { text: "План монтажа (при необходимости)", nested: false },
        { text: "Расстановка мебели и сантехники", nested: false },
        {
          text: "Рекомендации по размещению электрики и освещения",
          nested: false,
        },
      ],
      recommended: false,
    },
    {
      title: "Проект для ремонта",
      price: "1000 руб./м²",
      features: [
        { text: "Обмерный план", nested: false },
        { text: "План демонтажа и монтажа", nested: false },
        { text: "Расстановка мебели", nested: false },
        { text: "План размещения розеток и выключателей", nested: false },
        { text: "План освещения и включения света", nested: false },
        { text: "План потолков и напольных покрытий", nested: false },
        { text: "Развертки стен без мебели", nested: false },
        { text: "Визуализация помещений без мебели", nested: false },
      ],
      recommended: false,
    },
    {
      title: "Дизайн-проект",
      price: "2000 руб./м²",
      features: [
        { text: "Полный комплект чертежей для ремонта", nested: false },
        { text: "Развертки стен с мебелью и декором", nested: false },
        { text: "Визуализация помещений с мебелью и декором", nested: false },
        { text: "Все чертежи из проекта для ремонта", nested: false },
      ],
      recommended: true,
    },
    {
      title: "Дизайн-проект с комплектацией",
      price: "2500 руб./м²",
      features: [
        {
          text: "Полный дизайн-проект (чертежи, развертки, визуализация)",
          nested: false,
        },
        { text: "Комплектовочные ведомости:", nested: false },
        { text: "Чистовые отделочные материалы", nested: true },
        { text: "Электрика и освещение", nested: true },
        { text: "Сантехническое оборудование", nested: true },
        { text: "Мебель и декор", nested: true },
      ],
      recommended: false,
    },
  ];

  return (
    <section className={styles.pricing}>
      <div className="container">
        <div className={styles.header}>
          <h2>Тарифы</h2>
          <p className={styles.subtitle}>
            Прозрачное ценообразование за квадратный метр. Выберите подходящий
            вариант для вашего проекта.
          </p>
        </div>

        <div className={styles.pricingContainer}>
          {/* Подсказка над контейнером */}
          <div className={styles.scrollHint}>← Прокрутите в сторону →</div>

          {/* Индикатор справа (опционально) */}
          <div className={styles.scrollIndicator}>→</div>

          <div className={styles.pricingGrid}>
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`${styles.pricingCard} ${
                  plan.recommended ? styles.recommended : ""
                }`}
              >
                {plan.recommended && (
                  <div className={styles.recommendedBadge}>Рекомендуем</div>
                )}

                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3>{plan.title}</h3>
                    <div className={styles.price}>{plan.price}</div>
                  </div>

                  <ul className={styles.features}>
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className={feature.nested ? styles.nestedItem : ""}
                      >
                        {feature.text}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.cardFooter}>
                    <button
                      className={`${styles.ctaButton} ${
                        plan.recommended ? styles.primary : styles.secondary
                      }`}
                    >
                      Выбрать тариф
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <p>
            💡 Все цены указаны за квадратный метр. Итоговая стоимость
            рассчитывается индивидуально.
          </p>
        </div>
      </div>
    </section>
  );
};
