import { IExperienceContent, IPortfolioContent } from './portfolioContent';

export interface TechnologyTree {
  id: string;
  title: string;
  content: string;
  parent?: string;
  code: string;
  points: number;
  total: number;
  children?: TechnologyTree[];
}

export interface IndexedExperience extends IExperienceContent {
  index: number;
}

export interface IGameCmsContent {
  aboutContent: IPortfolioContent['about']['description'] | null;
  technologyContent: IPortfolioContent['about']['technologies'] | null;
  technologyTree: IPortfolioContent['about']['techTree'] | null;
  experiencesContent: IPortfolioContent['experience'] | null;
  featuredContent: IPortfolioContent['featured'] | null;
  otherContent: IPortfolioContent['other'] | null;
}

export class GameCmsContent implements IGameCmsContent {
  public aboutContent: IGameCmsContent['aboutContent'];
  public technologyContent: IGameCmsContent['technologyContent'] | null;
  public technologyTree: IGameCmsContent['technologyTree'] | null;
  public experiencesContent: IGameCmsContent['experiencesContent'] | null;
  public featuredContent: IGameCmsContent['featuredContent'] | null;
  public otherContent: IGameCmsContent['otherContent'] | null;

  constructor() {
    this.aboutContent = null;
    this.technologyContent = null;
    this.technologyTree = null;
    this.experiencesContent = null;
    this.featuredContent = null;
    this.otherContent = null;
  }
}

export interface InventoryProject {
  title: string;
  url: string;
  content: string;
  techTags: string[];
  type: 'featured' | 'other';
  iconName: string;
  iconColor: string;
}
