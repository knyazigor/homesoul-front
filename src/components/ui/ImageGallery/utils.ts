import { getOptimizedImageUrl, getOriginalImageUrl } from "@/lib/image-utils";
import { StrapiImage } from "@/lib/types";
import { Photo } from "react-photo-album";

export const mapStrapiImages = (
  image: StrapiImage,
  preview: boolean = true
): Photo => ({
  key: image.documentId,
  src: preview ? getOptimizedImageUrl(image) : getOriginalImageUrl(image),
  width: image.width,
  height: image.height,
  alt: image.alternativeText || "",
  title: image.caption || "",
});
