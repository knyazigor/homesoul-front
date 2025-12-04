import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button, ImageGallery, OverlapContainer } from "@/components/ui";
import {
  getPortfolioProject,
  getAllPortfolioProjects,
} from "@/actions/portfolio";
import ReactMarkdown from "react-markdown";
import styles from "./project.module.scss";
import { getOriginalImageUrl } from "@/lib/image-utils";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import ProjectNavigationButton from "./ProjectNavigationButton";
import ShareButton from "./ShareButton";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const project = await getPortfolioProject(id);

    if (!project) {
      return { title: "Проект не найден" };
    }

    return {
      title: `${project.title} | Дизайн интерьеров`,
      description: project.subtitle || project.description,
    };
  } catch (error) {
    console.error(error);
    return { title: "Ошибка загрузки" };
  }
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const projects = await getAllPortfolioProjects();
    return projects.map((project) => ({
      id: project.documentId,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

async function getProjectNavigation(projectId: string) {
  try {
    const projects = await getAllPortfolioProjects();
    const index = projects.findIndex((p) => p.documentId === projectId);

    if (index === -1) return { prevProjectId: null, nextProjectId: null };

    return {
      prevProjectId: index > 0 ? projects[index - 1].documentId : null,
      nextProjectId:
        index < projects.length - 1 ? projects[index + 1].documentId : null,
    };
  } catch (error) {
    console.error("Error getting project navigation:", error);
    return { prevProjectId: null, nextProjectId: null };
  }
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;

  // Параллельная загрузка данных
  const [project, navigation] = await Promise.all([
    getPortfolioProject(id).catch(() => null),
    getProjectNavigation(id),
  ]);

  if (!project) {
    notFound();
  }

  const coverImage = project.cover || project.images[0];

  return (
    <main className={styles.projectPage}>
      {/* Hero секция */}
      {coverImage && (
        <section className={styles.heroSection}>
          <div className={styles.heroImageContainer}>
            <Image
              src={getOriginalImageUrl(coverImage)}
              alt={coverImage.alternativeText || project.title}
              width={coverImage.width}
              height={coverImage.height}
              className={styles.heroImage}
              priority
              sizes="100vw"
            />
            <div className={styles.heroOverlay} />
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroLayout}>
              {/* Десктопные кнопки (скрываются на мобильных) */}
              <div className={styles.desktopNavButtons}>
                <ProjectNavigationButton
                  prevProjectId={navigation.prevProjectId}
                  type="left"
                />
              </div>

              <div className={styles.heroText}>
                <h1 className={styles.projectTitle}>{project.title}</h1>
              </div>

              <div className={styles.desktopNavButtons}>
                <ProjectNavigationButton
                  nextProjectId={navigation.nextProjectId}
                  type="right"
                />
              </div>

              {/* Мобильные кнопки (скрываются на десктопе) */}
              <div className={styles.mobileNavButtons}>
                <ProjectNavigationButton
                  prevProjectId={navigation.prevProjectId}
                  type="left"
                />
                <ProjectNavigationButton
                  nextProjectId={navigation.nextProjectId}
                  type="right"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <OverlapContainer overlap="medium" borderRadius="medium">
        <nav className={styles.contentBreadcrumbs}>
          <div className="container">
            <Link href="/portfolio" className={styles.breadcrumbLink}>
              Портфолио
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{project.title}</span>
          </div>
        </nav>

        <section className={styles.projectGallery}>
          <div className="container">
            <ImageGallery images={project.images} />
          </div>
        </section>

        {project.description && (
          <section className={styles.projectDescription}>
            <div className="container">
              <div className={styles.descriptionContent}>
                <h2>О проекте</h2>
                <ReactMarkdown>{project.description}</ReactMarkdown>
              </div>
            </div>
          </section>
        )}

        <footer className={styles.projectFooter}>
          <div className="container">
            <div className={styles.footerNavigation}>
              <Link href="/portfolio">
                <Button variant="outline" icon={<ArrowLeft />}>
                  Вернуться в портфолио
                </Button>
              </Link>

              <ShareButton />
            </div>
          </div>
        </footer>
      </OverlapContainer>
    </main>
  );
}
