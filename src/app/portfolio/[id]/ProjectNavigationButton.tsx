"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./project.module.scss";

interface ProjectNavigationButtonProps {
  prevProjectId?: string | null;
  nextProjectId?: string | null;
  type: "left" | "right";
}

export default function ProjectNavigationButton({
  prevProjectId,
  nextProjectId,
  type,
}: ProjectNavigationButtonProps) {
  const router = useRouter();

  const handleNavigation = (projectId?: string | null) => {
    if (projectId) {
      router.push(`/portfolio/${projectId}`);
    }
  };

  if (type === "left") {
    return (
      <button
        className={`${styles.navButton} ${styles.navButtonLeft}`}
        onClick={() => handleNavigation(prevProjectId)}
        disabled={!prevProjectId}
        aria-label="Предыдущий проект"
      >
        <ChevronLeft size={32} />
      </button>
    );
  }

  return (
    <button
      className={`${styles.navButton} ${styles.navButtonRight}`}
      onClick={() => handleNavigation(nextProjectId)}
      disabled={!nextProjectId}
      aria-label="Следующий проект"
    >
      <ChevronRight size={32} />
    </button>
  );
}
