import { useState, useEffect, useRef } from "react";

interface UseHeaderScrollOptions {
  /**
   * Минимальное количество пикселей скролла для активации скрытия
   * @default 100
   */
  hideThreshold?: number;
  /**
   * Количество пикселей для добавления класса scrolled
   * @default 50
   */
  scrolledThreshold?: number;
  /**
   * Время задержки для debounce (мс)
   * @default 100
   */
  debounceDelay?: number;
}

interface UseHeaderScrollReturn {
  /** Видима ли шапка */
  isVisible: boolean;
  /** Скроллнута ли страница больше чем на scrolledThreshold */
  isScrolled: boolean;
}

/**
 * Хук для управления скрытием и показом шапки при скролле
 */
export const useHeaderScroll = (
  options?: UseHeaderScrollOptions
): UseHeaderScrollReturn => {
  const {
    hideThreshold = 100,
    scrolledThreshold = 50,
    debounceDelay = 100,
  } = options || {};

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const lastScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const scrollingDown = currentScrollY > lastScrollY.current;

      if (scrollingDown && currentScrollY > hideThreshold) {
        setIsVisible(false);
      } else if (!scrollingDown) {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > scrolledThreshold);

      lastScrollY.current = currentScrollY;
    };

    const debouncedHandleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(handleScroll, debounceDelay);
    };

    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hideThreshold, scrolledThreshold, debounceDelay]);

  return { isVisible, isScrolled };
};
