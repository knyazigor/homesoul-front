import {
  StrapiResponse,
  PortfolioProject,
  StrapiItemResponse,
  Document,
  StrapiDocumentResponse,
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

    console.log("🔗 Strapi Request URL:", url);

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
        `Strapi API error: ${response.status} ${response.statusText} URL: ${this.baseUrl}${endpoint}`,
      );
    }

    return response.json();
  }

  async getPortfolioProjects(
    options?: PortfolioQueryOptions,
  ): Promise<PortfolioProject[]> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("populate", "*");

      if (options?.displayOnMainPage !== undefined) {
        queryParams.append(
          "filters[displayOnMainPage][$eq]",
          options.displayOnMainPage.toString(),
        );
      }

      if (options?.featured !== undefined) {
        queryParams.append(
          "filters[featured][$eq]",
          options.featured.toString(),
        );
      }

      if (options?.category) {
        queryParams.append("filters[category][$eq]", options.category);
      }

      if (options?.sortBy) {
        const sortOrder = options.sortOrder === "desc" ? "desc" : "asc";
        queryParams.append("sort", `${options.sortBy}:${sortOrder}`);
      }

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
    limit?: number,
  ): Promise<PortfolioProject[]> {
    return this.getPortfolioProjects({
      displayOnMainPage: true,
      sortBy: "publishedAt",
      sortOrder: "desc",
      limit: limit || 6,
    });
  }

  async getPortfolioProject(
    id: string | number,
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

  /**
   * Получение всех документов из коллекции docs
   */
  async getAllDocuments(): Promise<Document[]> {
    try {
      // Строим URL с параметрами
      const queryParams = new URLSearchParams();
      queryParams.append("populate", "file");
      queryParams.append("sort", "order:asc");
      queryParams.append("pagination[pageSize]", "100");

      const response = await this.fetchFromStrapi<{
        data: StrapiDocumentResponse[];
      }>(`/docs?${queryParams.toString()}`);

      if (!response.data) {
        return [];
      }

      return response.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        order: item.order,
        file: item.file
          ? {
              id: item.file.id,
              url: item.file.url,
              name: item.file.name,
              size: item.file.size,
              mime: item.file.mime,
              ext: item.file.ext,
            }
          : null,
        publishedAt: item.publishedAt,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
    } catch (error) {
      console.error("Error fetching documents:", error);
      return [];
    }
  }

  /**
   * Получение одного документа по ID из коллекции docs
   */
  async getDocument(id: string | number): Promise<Document | null> {
    try {
      const response = await this.fetchFromStrapi<{
        data: StrapiDocumentResponse;
      }>(`/docs/${id}?populate=file`);

      if (!response.data) {
        return null;
      }

      const item = response.data;
      return {
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        order: item.order,
        file: item.file
          ? {
              id: item.file.id,
              url: item.file.url,
              name: item.file.name,
              size: item.file.size,
              mime: item.file.mime,
              ext: item.file.ext,
            }
          : null,
        publishedAt: item.publishedAt,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    } catch (error) {
      console.error(`Error fetching document ${id}:`, error);
      return null;
    }
  }
}

export const strapiClient = new StrapiClient();
