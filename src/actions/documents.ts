"use server";

import { strapiClient } from "@/lib/strapi";
import { unstable_cache } from "next/cache";
import { Document } from "@/lib/types/document";

/**
 * Получение всех документов
 */
export const getAllDocuments = unstable_cache(
  async (): Promise<Document[]> => {
    const documents = await strapiClient.getAllDocuments();

    return documents;
  },
  ["all-documents"],
  {
    revalidate: 3600,
    tags: ["documents"],
  },
);
/**
 * Получение документа по ID
 */
export const getDocument = unstable_cache(
  async (id: string | number): Promise<Document | null> => {
    return await strapiClient.getDocument(id);
  },
  ["document"],
  {
    revalidate: 3600,
    tags: ["documents"],
  },
);

/**
 * Принудительный сброс кэша
 */
export const revalidateDocumentsCache = async () => {
  "use server";

  const { revalidateTag } = await import("next/cache");
  revalidateTag("documents", "page");
};
