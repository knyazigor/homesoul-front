"use server";

import { strapiClient } from "@/lib/strapi";
import { unstable_cache } from "next/cache";
import { PortfolioProject } from "@/lib/types/portfolio";

export const getAllPortfolioProjects = unstable_cache(
  async (): Promise<PortfolioProject[]> => {
    return await strapiClient.getAllPortfolioProjects();
  },
  ["all-portfolio-projects"],
  {
    revalidate: 60,
    tags: ["portfolio"],
  }
);

export const getMainPagePortfolioProjects = unstable_cache(
  async (limit?: number): Promise<PortfolioProject[]> => {
    return await strapiClient.getMainPagePortfolioProjects(limit);
  },
  ["main-page-portfolio-projects"],
  {
    revalidate: 60,
    tags: ["portfolio"],
  }
);

export const getPortfolioProjects = unstable_cache(
  async (options?: {
    displayOnMainPage?: boolean;
    featured?: boolean;
    sortBy?: "publishedAt" | "createdAt" | "title" | "updatedAt";
    sortOrder?: "asc" | "desc";
    limit?: number;
  }): Promise<PortfolioProject[]> => {
    return await strapiClient.getPortfolioProjects(options);
  },
  ["portfolio-projects", "custom"], // Статический ключ
  {
    revalidate: 60,
    tags: ["portfolio"],
  }
);

export const getPortfolioProject = unstable_cache(
  async (id: string | number): Promise<PortfolioProject | null> => {
    return await strapiClient.getPortfolioProject(id);
  },
  ["portfolio-project"],
  {
    revalidate: 60,
    tags: ["portfolio"],
  }
);
