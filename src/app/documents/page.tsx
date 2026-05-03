console.log("🔥🔥🔥 PAGE MODULE LOADED - FIRE 🔥🔥🔥");

import { Metadata } from "next";
import styles from "./documents.module.scss";
import { OverlapContainer } from "@/components/ui";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Документы и договоры | Душа вашего дома",
  description: "Документы и формы договоров для сотрудничества",
};

export default async function DocumentsPage() {
  console.log("🖼️ [PAGE] Render function START");

  // Динамический импорт, чтобы проверить, что он вообще работает
  const { getAllDocuments } = await import("@/actions/documents");
  console.log(
    "🖼️ [PAGE] getAllDocuments imported, type:",
    typeof getAllDocuments,
  );

  let documents = [];
  let error = null;

  try {
    console.log("🖼️ [PAGE] Calling getAllDocuments...");
    documents = await getAllDocuments();
    console.log(
      "🖼️ [PAGE] getAllDocuments returned, length:",
      documents.length,
    );
  } catch (err) {
    error = String(err);
    console.error("🖼️ [PAGE] Error:", err);
  }

  console.log("🖼️ [PAGE] Rendering with documents:", documents.length);

  return (
    <main className={styles.documentsPage}>
      <section className={styles.documentsHero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>Документы и договоры</h1>

                <div
                  style={{
                    background: "#fff",
                    padding: "20px",
                    marginTop: "20px",
                    borderRadius: "8px",
                    color: "#000",
                  }}
                >
                  <h3>Диагностика:</h3>
                  <p>Документов: {documents.length}</p>
                  <p>Ошибка: {error || "нет"}</p>
                  <p>BASE_URL: {process.env.BASE_URL || "нет"}</p>
                  <pre
                    style={{
                      fontSize: "10px",
                      overflow: "auto",
                      maxHeight: "200px",
                    }}
                  >
                    {JSON.stringify(documents, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
