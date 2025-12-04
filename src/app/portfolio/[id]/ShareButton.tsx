"use client";

import { Button } from "@/components/ui";
import { Share } from "lucide-react";
import { useState } from "react";

export default function ShareButton() {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;

    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Ссылка скопирована в буфер обмена!");
      } else {
        // Fallback для браузеров без поддержки
        prompt("Скопируйте ссылку:", window.location.href);
      }
    } catch (error) {
      console.error("Ошибка при попытке поделиться:", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleShare}
      disabled={isSharing}
      aria-label="Поделиться проектом"
      icon={<Share />}
    >
      {isSharing ? "Поделиться..." : "Поделиться"}
    </Button>
  );
}
