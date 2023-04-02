export const baseContentStatusOptions = ['draft', 'published'] as const;

export interface IBaseContent {
  id: string;
  updatedAt: Date;
  createdAt: Date;
  status: typeof baseContentStatusOptions[number]; // 'published' or 'draft'
}

export interface IAboutContent extends IBaseContent {
  description: string;
  technologies: string[];
  techTree: ITechTree;
  imageUrl: string;
}

export interface ITechTree {
  items: {
    id: string;
    code: string;
    title: string;
    total: number;
    points: number;
    content: string;
    parent?: string;
  }[];
}

export interface IExperienceContent extends IBaseContent {
  employer: string;
  title: string;
  feats: string[];
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  dateString: string;
}

export interface IFeaturedContent extends IBaseContent {
  title: string;
  titleUrl: string;
  content: string; // markdown
  imageUrl: string;
  tags: string[];
  iconName: string; // font awesome icon name
  iconColor: string; //hex color code
}

export interface IOtherContent extends IBaseContent {
  title: string;
  content: string; // markdown
  repositoryUrl: string;
  websiteUrl?: string;
  tags: string[];
  iconName: string; // font awesome icon name
  iconColor: string; //hex color code
}

export interface IPortfolioContent {
  about: IAboutContent;
  experience: IExperienceContent[];
  featured: IFeaturedContent[];
  other: IOtherContent[];
}
