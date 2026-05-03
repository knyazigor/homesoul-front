export interface StrapiFile {
  id: number;
  url: string;
  name: string;
  size: number;
  mime: string;
  ext: string;
}

export interface Document {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  order: number;
  file: StrapiFile | null;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiDocumentResponse {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  order: number;
  file: {
    id: number;
    url: string;
    name: string;
    size: number;
    mime: string;
    ext: string;
  } | null;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
