import {
  IBaseContent,
  IExperienceContent,
  IFeaturedContent,
  IOtherContent,
  IPortfolioContent,
} from '@components/types/portfolioContent';

import { ABOUT_DESCRIPTION } from './staticData';
import { CmsData } from './cms/cmsTypes';
import { TECH_TREE } from './techTree';
import dayjs from 'dayjs';
import { generateProjectIcons } from './projectIcons';
import { v4 as uuidv4 } from 'uuid';

const BASE_PROPS = (): Serializable<IBaseContent> => ({
  id: uuidv4(),
  status: 'published',
  updatedAt: dayjs().toISOString(),
  createdAt: dayjs().toISOString(),
});

export function dataConverter(
  cmsData: CmsData,
): Serializable<IPortfolioContent> {
  const { featured, other } = convertProjects(cmsData.projects);
  return {
    about: {
      description: cmsData.aboutDescription || ABOUT_DESCRIPTION,
      technologies: [],
      imageUrl: '',
      techTree: TECH_TREE,
      ...BASE_PROPS(),
    },
    experience: convertExperiences(cmsData.experiences),
    featured,
    other,
  };
}

function convertExperiences(
  experiences: CmsData['experiences'],
): Serializable<IExperienceContent[]> {
  const formatDate = (date: string) => dayjs(date).format('MMMM YYYY');

  return experiences.map(experience => {
    const isActive = !experience.end;
    const startString = formatDate(experience.start);
    const endString = isActive ? 'Present' : formatDate(experience.end);
    return {
      id: experience.id.toString(),
      status: experience.isPublished ? 'published' : 'draft',
      updatedAt: dayjs(experience.updatedAt).toISOString(),
      createdAt: dayjs(experience.createdAt).toISOString(),
      employer: experience.employer,
      title: experience.title,
      feats: experience.feats.map(feat => feat.text),
      startDate: dayjs(experience.start).toISOString(),
      endDate: experience.end ? dayjs(experience.end).toISOString() : null,
      isActive: !experience.end,
      dateString: `${startString} - ${endString}`,
    };
  });
}

function convertProjects(projects: CmsData['projects']): {
  featured: Serializable<IFeaturedContent[]>;
  other: Serializable<IOtherContent[]>;
} {
  const featuredItems: Serializable<IFeaturedContent[]> = [];
  const otherItems: Serializable<IOtherContent[]> = [];

  const icons = generateProjectIcons();

  projects.forEach((p, idx) => {
    const base = {
      id: p.id.toString(),
      updatedAt: dayjs(p.updatedAt).toISOString(),
      createdAt: dayjs(p.createdAt).toISOString(),
      status: p.isPublished ? 'published' : ('draft' as IBaseContent['status']),
      title: p.title,
      content: p.description,
      tags: p.tags?.map(t => t.text) ?? [],
      iconName: icons[idx].icon,
      iconColor: icons[idx].color,
    };

    if (p.type === 'highlight') {
      const featured: Serializable<IFeaturedContent> = {
        ...base,
        titleUrl: '',
        imageUrl: '',
      };

      featuredItems.push(featured);
    } else if (p.type === 'other') {
      const other: Serializable<IOtherContent> = {
        ...base,
        repositoryUrl: '',
        websiteUrl: '',
      };

      otherItems.push(other);
    }
  });

  return {
    featured: featuredItems,
    other: otherItems,
  };
}

export type Serializable<T> = T extends Date
  ? string
  : T extends null
    ? null
    : T extends undefined
      ? undefined
      : T extends Array<infer U>
        ? Serializable<U>[]
        : T extends object
          ? { [K in keyof T]: Serializable<T[K]> }
          : T;
