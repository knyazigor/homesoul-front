import { Metadata } from "next";
import Image from "next/image";
import styles from "./documents.module.scss";
import { OverlapContainer } from "@/components/ui";
import { getAllDocuments } from "@/actions/documents";
import { Document } from "@/lib/types/document";

export const metadata: Metadata = {
  title: "Документы и договоры | Душа вашего дома",
  description: "Документы и формы договоров для сотрудничества",
};

const getFileIcon = (mimeType: string) => {
  if (mimeType === "application/pdf") {
    return { src: "/images/file-pdf.svg", alt: "PDF" };
  }
  if (mimeType.includes("word") || mimeType.includes("document")) {
    return { src: "/images/file-doc.svg", alt: "DOC" };
  }
  return { src: "/images/file.svg", alt: "File" };
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default async function DocumentsPage() {
  console.log("🖼️ [DocumentsPage] Render START");
  console.log(
    "🖼️ [DocumentsPage] NEXT_PUBLIC_STRAPI_URL:",
    process.env.NEXT_PUBLIC_STRAPI_URL,
  );
  console.log("🖼️ [DocumentsPage] BASE_URL:", process.env.BASE_URL);

  const documents = await getAllDocuments();

  console.log("🖼️ [DocumentsPage] Received documents:", documents.length);
  console.log("🖼️ [DocumentsPage] First document title:", documents[0]?.title);

  return (
    <main className={styles.documentsPage}>
      {/* Hero секция */}
      <section className={styles.documentsHero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>Документы и договоры</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Список документов */}
      <OverlapContainer overlap="medium" borderRadius="medium">
        <section className={styles.documentsMain}>
          <div className="container">
            {documents.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Документы временно недоступны</p>
                <p className={styles.emptySubtitle}>
                  Пожалуйста, зайдите позже
                </p>
              </div>
            ) : (
              <div className={styles.documentsGrid}>
                {documents.map((doc: Document) => {
                  const fileIcon = doc.file
                    ? getFileIcon(doc.file.mime)
                    : { src: "/images/file.svg", alt: "File" };

                  const fileUrl = doc.file
                    ? `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}${doc.file.url}`
                    : "#";

                  return (
                    <article
                      key={doc.documentId}
                      className={styles.documentCard}
                    >
                      <div className={styles.cardIcon}>
                        <Image
                          src={fileIcon.src}
                          alt={fileIcon.alt}
                          width={40}
                          height={40}
                        />
                      </div>

                      <div className={styles.cardContent}>
                        <h2 className={styles.cardTitle}>{doc.title}</h2>
                        {doc.description && (
                          <p className={styles.cardDescription}>
                            {doc.description}
                          </p>
                        )}
                        {doc.file && (
                          <div className={styles.fileInfo}>
                            <span className={styles.fileName}>
                              {doc.file.name}
                            </span>
                            <span className={styles.fileSize}>
                              {formatFileSize(doc.file.size)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className={styles.cardAction}>
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.downloadButton}
                          download={doc.file?.name}
                        >
                          <span>Скачать</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 1V11M8 11L11 8M8 11L5 8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2 14H14"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            <div className={styles.disclaimer}>
              <p>
                Все документы представлены в актуальной версии. При
                возникновении вопросов вы можете связаться со мной для получения
                дополнительной информации.
              </p>
            </div>
          </div>
        </section>
      </OverlapContainer>
    </main>
  );
}
