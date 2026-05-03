// src/actions/documents.ts
"use server";

import { strapiClient } from "@/lib/strapi";
import { unstable_cache } from "next/cache";
import { Document } from "@/lib/types/document";

/**
 * Получение всех документов
 */
export const getAllDocuments = unstable_cache(
  async (): Promise<Document[]> => {
    console.log("🔍 [getAllDocuments] START");
    console.log("🔍 [getAllDocuments] BASE_URL:", process.env.BASE_URL);
    console.log(
      "🔍 [getAllDocuments] NEXT_PUBLIC_STRAPI_URL:",
      process.env.NEXT_PUBLIC_STRAPI_URL,
    );

    try {
      const documents = await strapiClient.getAllDocuments();
      console.log("✅ [getAllDocuments] Count:", documents.length);
      return documents;
    } catch (error) {
      console.error("❌ [getAllDocuments] Error:", error);
      return [];
    }
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
