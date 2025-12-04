"use client";

import { Button } from "@/components/ui";
import { PortfolioProject } from "@/lib/types";
import { ChevronLeft, Share, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./project.module.scss";

interface ProjectToolbarProps {
  nextProjectId?: PortfolioProject["documentId"] | null;
  prevProjectId?: PortfolioProject["documentId"] | null;
}

export default function ProjectToolbar({
  nextProjectId,
  prevProjectId,
}: ProjectToolbarProps) {
  const router = useRouter();
  const [isSharing, setIsSharing] = useState(false);

  const handleNextProjectClick = () => {
    if (nextProjectId) {
      router.push(`/portfolio/${nextProjectId}`);
    }
  };

  const handlePrevProjectClick = () => {
    if (prevProjectId) {
      router.push(`/portfolio/${prevProjectId}`);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Ссылка скопирована в буфер обмена!");
      }
    } catch (error) {
      console.error("Ошибка при попытке поделиться:", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className={styles.coverToolbar}>
      <Button
        variant="ghost"
        disabled={!prevProjectId}
        onClick={handlePrevProjectClick}
        aria-label="Предыдущий проект"
      >
        <ChevronLeft size="36" className={styles.toolbarIcon} />
      </Button>
      <Button
        variant="ghost"
        onClick={handleShare}
        disabled={isSharing}
        aria-label="Поделиться"
      >
        <Share size="36" className={styles.toolbarIcon} />
      </Button>
      <Button
        variant="ghost"
        disabled={!nextProjectId}
        onClick={handleNextProjectClick}
        aria-label="Следующий проект"
      >
        <ChevronRight size="36" className={styles.toolbarIcon} />
      </Button>
    </div>
  );
}
