import { IExperienceContent } from '../../types/portfolioContent';
import { IndexedExperience } from '../../types/cmsContent';

export const filterQuests = (quests: IndexedExperience[], tab: 0 | 1 | 2) => {
  let filterCallback: (quest: IndexedExperience) => boolean;
  switch (tab) {
    case 0:
      filterCallback = () => true;
      break;
    case 1:
      filterCallback = quest => quest.isActive;
      break;
    case 2:
      filterCallback = quest => !quest.isActive;
      break;
  }

  return quests.filter(filterCallback);
};

export const identifyQuests = (
  quests: IExperienceContent[],
): IndexedExperience[] => quests.map((quest, index) => ({ ...quest, index }));
