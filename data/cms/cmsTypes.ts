export type DbEntity<T> = {
  id: string;
  createdAt: string;
  updatedAt: string;
} & T;

export type AboutPage = DbEntity<{
  intro: string;
  gameAbout?: string;
}>;

export type Experience = DbEntity<{
  title: string;
  employer: string;
  startDate: string;
  endDate?: string;
  feats: string[];
}>;

export type ListResponse<T> = {
  data: T[];
  total: number;
};

export type Project = DbEntity<{
  name: string;
  description: string;
  sourceUrl: string | null;
  siteUrl: string | null;
  tags: string[];
  isFavorite: boolean;
  isPublished: boolean;
  slug: string;
}>;

export type AboutPageContent = {
  page: AboutPage;
  experiences: ListResponse<Experience>;
};

export type ProjectsPageContent = {
  projects: ListResponse<Project>;
};

export type CmsData = {
  aboutDescription?: string;
  experiences: Experience[];
  projects: Project[];
};
