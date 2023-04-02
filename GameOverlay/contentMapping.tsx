import { OverlayContentKey, OverlayContentMap } from '../types/overlayContent';

import Diploma from './Diploma';
import Inventory from './inventory/Inventory';
import QuestLog from './quests/QuestLog';
import React from 'react';
import SimpleText from './SimpleText';
import TechTalentTree from './talentTree/TechTalentTree';

export const overlayContentMapping: OverlayContentMap = {
  [OverlayContentKey.UF]: {
    lead: `You find a scroll hidden behind the trophy...`,
    component: <Diploma />,
  },
  [OverlayContentKey.UNF]: {
    lead: `You find a scroll hidden behind the medal...`,
    component: <Diploma />,
  },
  [OverlayContentKey.SKILLS]: {
    lead: `The PC battlestation turns on, accessing Greg's secret RPG talent trees...`,
    component: <TechTalentTree />,
    unlockedKey: 'talentTree',
  },
  [OverlayContentKey.BIO]: {
    lead: 'You seem to have stumbled across an autobiography of sorts...',
    component: <SimpleText />,
  },
  [OverlayContentKey.EXPERIENCES]: {
    lead: `Inside the chest is Greg's quest log...`,
    component: <QuestLog />,
    unlockedKey: 'questLog',
  },
  [OverlayContentKey.PROJECTS]: {
    lead: `The chest gives you access to Greg's inventory...`,
    component: <Inventory />,
    unlockedKey: 'inventory',
  },
};
