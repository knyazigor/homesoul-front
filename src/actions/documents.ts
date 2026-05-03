"use server";

import { strapiClient } from "@/lib/strapi";
import { Document } from "@/lib/types/document";

/**
 * Получение всех документов
 */
export const getAllDocuments = async (): Promise<Document[]> => {
  const documents = await strapiClient.getAllDocuments();

  return documents;
};

/**
 * Получение документа по ID
 */
export const getDocument = async (
  id: string | number,
): Promise<Document | null> => {
  return await strapiClient.getDocument(id);
};
