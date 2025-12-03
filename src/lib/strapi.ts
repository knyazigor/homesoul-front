import {
  StrapiResponse,
  PortfolioProject,
  StrapiItemResponse,
} from "@/lib/types";

interface PortfolioQueryOptions {
  displayOnMainPage?: boolean;
  featured?: boolean;
  sortBy?: "publishedAt" | "createdAt" | "title" | "updatedAt";
  sortOrder?: "asc" | "desc";
  limit?: number;
  category?: string;
}

class StrapiClient {
  private baseUrl: string;
  private apiToken?: string;

  constructor() {
    this.baseUrl = process.env.BASE_URL!;
    this.apiToken = process.env.ACCESS_TOKEN;

    if (!this.baseUrl) {
      throw new Error("BASE_URL is not defined in environment variables");
    }
  }

  private async fetchFromStrapi<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.apiToken) {
      headers["Authorization"] = `Bearer ${this.apiToken}`;
    }

    const response = await fetch(url, {
      headers,
      next: {
        revalidate: 60,
        tags: ["portfolio"],
      },
    });

    if (!response.ok) {
      throw new Error(
        `Strapi API error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  async getPortfolioProjects(
    options?: PortfolioQueryOptions
  ): Promise<PortfolioProject[]> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("populate", "*");

      // Фильтр по displayOnMainPage
      if (options?.displayOnMainPage !== undefined) {
        queryParams.append(
          "filters[displayOnMainPage][$eq]",
          options.displayOnMainPage.toString()
        );
      }

      // Фильтр по featured (если нужно)
      if (options?.featured !== undefined) {
        queryParams.append(
          "filters[featured][$eq]",
          options.featured.toString()
        );
      }

      // Фильтр по категории (если нужно)
      if (options?.category) {
        queryParams.append("filters[category][$eq]", options.category);
      }

      // Сортировка
      if (options?.sortBy) {
        const sortOrder = options.sortOrder === "desc" ? "desc" : "asc";
        queryParams.append("sort", `${options.sortBy}:${sortOrder}`);
      }

      // Лимит
      if (options?.limit) {
        queryParams.append("pagination[pageSize]", options.limit.toString());
      }

      const response = await this.fetchFromStrapi<
        StrapiResponse<PortfolioProject>
      >(`/projects?${queryParams.toString()}`);

      return response.data;
    } catch (error) {
      console.error("Failed to fetch portfolio projects:", error);
      return [];
    }
  }

  async getAllPortfolioProjects(): Promise<PortfolioProject[]> {
    return this.getPortfolioProjects({
      sortBy: "publishedAt",
      sortOrder: "desc",
    });
  }

  async getMainPagePortfolioProjects(
    limit?: number
  ): Promise<PortfolioProject[]> {
    return this.getPortfolioProjects({
      displayOnMainPage: true,
      sortBy: "publishedAt",
      sortOrder: "desc",
      limit: limit || 6,
    });
  }

  async getPortfolioProject(
    id: string | number
  ): Promise<PortfolioProject | null> {
    try {
      const response = await this.fetchFromStrapi<
        StrapiItemResponse<PortfolioProject>
      >(`/projects/${id}?populate=*`);
      return response.data || null;
    } catch (error) {
      console.error(`Failed to fetch portfolio project ${id}:`, error);
      return null;
    }
  }
}

export const strapiClient = new StrapiClient();
