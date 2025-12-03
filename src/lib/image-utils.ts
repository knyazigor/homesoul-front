import { OptimizedImage, StrapiImage } from "@/lib/types";

export function getOptimizedImageUrl(
  image: OptimizedImage | StrapiImage | null | undefined
): string {
  const baseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;

  if (!baseUrl) {
    console.warn("NEXT_PUBLIC_MEDIA_BASE_URL is not defined");
    return "/images/placeholder.jpg";
  }

  if (!image) {
    return "/images/placeholder.jpg";
  }

  if (image.formats?.medium) {
    return `${baseUrl}${image.formats.medium.url}`;
  }

  if (image.formats?.small) {
    return `${baseUrl}${image.formats.small.url}`;
  }

  if (image.url) {
    return `${baseUrl}${image.url}`;
  }

  return "/images/placeholder.jpg";
}

export function getBlurDataUrl(): string {
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PC9zdmc+";
}

export function getImageAltText(
  image: OptimizedImage | StrapiImage | null | undefined
): string {
  if (!image) {
    return "Изображение проекта";
  }

  return image.alternativeText || "Изображение проекта";
}

export function getOriginalImageUrl(
  image: OptimizedImage | StrapiImage | null | undefined
): string {
  const baseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;

  if (!baseUrl) {
    console.warn("NEXT_PUBLIC_MEDIA_BASE_URL is not defined");
    return "/images/placeholder.jpg";
  }

  if (!image) {
    return "/images/placeholder.jpg";
  }

  if (image.url) {
    return `${baseUrl}${image.url}`;
  }

  return "/images/placeholder.jpg";
}
