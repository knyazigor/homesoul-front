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
import ProjectToolbar from "./ProjectToolbar";

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

export default async function ProjectPage({ params }: Props) {
  let project;
  let nextProjectId: string | null = null;
  let prevProjectId: string | null = null;

  try {
    const { id } = await params;
    project = await getPortfolioProject(id);
  } catch (error) {
    console.error("Error loading project:", error);
    notFound();
  }

  if (!project) {
    notFound();
  }

  try {
    const projects = await getAllPortfolioProjects();

    const index = projects.findIndex(
      (p) => p.documentId === project.documentId
    );

    if (index === -1) {
      console.error("Current project not found in projects list");
    } else {
      if (index > 0) {
        prevProjectId = projects[index - 1].documentId;
      }

      if (index < projects.length - 1) {
        nextProjectId = projects[index + 1].documentId;
      }
    }
  } catch (error) {
    console.error("Error determining next/prev projects:", error);
  }

  const coverImage = project.cover || project.images[0];

  return (
    <>
      <main className={styles.projectPage}>
        {coverImage && (
          <section className={styles.projectCover}>
            <div className={styles.coverImageContainer}>
              <Image
                src={getOriginalImageUrl(coverImage)}
                alt={coverImage.alternativeText || project.title}
                width={coverImage.width}
                height={coverImage.height}
                className={styles.coverImage}
                priority
              />
              <div className={styles.coverOverlay} />
            </div>
            <div className={styles.coverContent}>
              <div className="container">
                <div className={styles.coverText}>
                  <h1 className={styles.projectTitle}>{project.title}</h1>
                  {/* {project.subtitle && (
                    <p className={styles.projectSubtitle}>{project.subtitle}</p>
                  )} */}
                </div>
                <ProjectToolbar
                  prevProjectId={prevProjectId}
                  nextProjectId={nextProjectId}
                />
              </div>
            </div>
          </section>
        )}
        <OverlapContainer overlap="medium" borderRadius="medium">
          <nav className={styles.breadcrumbs}>
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

          <section className={styles.projectNavigation}>
            <div className="container">
              <Link href="/portfolio">
                <Button variant="outline" icon={<ArrowLeft />}>
                  Вернуться в портфолио
                </Button>
              </Link>
            </div>
          </section>
        </OverlapContainer>
      </main>
    </>
  );
}
