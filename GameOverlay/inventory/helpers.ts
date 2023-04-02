import { IFeaturedContent, IOtherContent } from '../../types/portfolioContent';

import { InventoryProject } from '../../types/cmsContent';
import { shuffleArray } from '../../helpers/solutions';

export const combineProjectArrays = (
  featuredProjects: IFeaturedContent[],
  otherProjects: IOtherContent[],
): InventoryProject[] => {
  if (featuredProjects.length === 0 && otherProjects.length === 0) {
    return [];
  }

  let result: InventoryProject[] = [];

  featuredProjects.forEach(
    ({ title, titleUrl, tags, content, iconName, iconColor }) => {
      result.push({
        title,
        url: titleUrl,
        techTags: [...tags],
        content,
        type: 'featured',
        iconName,
        iconColor,
      });
    },
  );

  otherProjects.forEach(
    ({ title, repositoryUrl, tags, content, iconName, iconColor }) => {
      result.push({
        title,
        url: repositoryUrl,
        techTags: [...tags],
        content,
        type: 'other',
        iconName,
        iconColor,
      });
    },
  );

  return shuffleArray(result);
};
