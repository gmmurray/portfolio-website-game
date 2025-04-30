import { PaginatedDocs, Sort, TypeWithTimestamps, Where } from 'payload';

export type PayloadApiSearchResponse<TData> = PaginatedDocs<TData>;

export type PayloadDataType = TypeWithTimestamps;

export type PayloadQuery = {
  sort?: Sort;
  limit?: number;
  where?: Where;
};

export interface CmsExperience extends PayloadDataType {
  title: string;
  employer: string;
  start: string;
  end: string;
  feats: { id: string; text: string }[];
  isPublished: boolean;
}

export interface CmsProject extends PayloadDataType {
  title: string;
  description: string;
  type: 'highlight' | 'other';
  sourceUrl?: string;
  siteUrl?: string;
  tags?: { id: string; text: string }[];
  isPublished: boolean;
}

export type CmsData = {
  experiences: CmsExperience[];
  projects: CmsProject[];
};
