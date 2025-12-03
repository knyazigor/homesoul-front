import { StrapiImage } from "./strapi";

export interface PortfolioProject {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  images: StrapiImage[];
  cover: StrapiImage;
  displayOnMainPage?: boolean;
  order: number | null;
}
