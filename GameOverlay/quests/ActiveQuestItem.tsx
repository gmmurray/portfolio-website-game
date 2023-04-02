import { IExperienceContent } from '../../types/portfolioContent';
import React from 'react';
import { combineCss } from '../../helpers/combineCss';

const calcXp = (item: IExperienceContent) => {
  let start = new Date(item.startDate);
  let end = item.isActive ? new Date() : new Date(item.endDate ?? new Date());
  const diff = (end.getTime() - start.getTime()) / 1000;
  return Math.abs(Math.round(diff / (60 * 60 * 24 * 7 * 4)));
};

const base_cn = 'quest-log';
const detail_cn = combineCss(base_cn, 'detail');
const item_cn = combineCss(detail_cn, 'item');
const subtitle_cn = combineCss(item_cn, 'subtitle');
const employer_cn = combineCss(item_cn, 'employer');
const objectives_container_cn = combineCss(item_cn, 'objectives-container');
const objectives_title_cn = combineCss(objectives_container_cn, 'title');
const objectives_items_cn = combineCss(objectives_container_cn, 'items');
const item_divider_cn = combineCss(item_cn, 'divider');
const rewards_container_cn = combineCss(item_cn, 'rewards-container');
const rewards_title_cn = combineCss(rewards_container_cn, 'title');
const empty_cn = combineCss(detail_cn, 'empty');

type ActiveQuestItemProps = {
  item?: IExperienceContent;
};

const ActiveQuestItem = ({ item }: ActiveQuestItemProps) => {
  if (!item) {
    return (
      <div className={detail_cn}>
        <div className={empty_cn}>
          <h1>Select a quest</h1>
        </div>
      </div>
    );
  }
  return (
    <div className={detail_cn}>
      <div className={item_cn}>
        <h1>{item.title}</h1>
        <h2 className={subtitle_cn}>{item.dateString}</h2>
        <h2 className={employer_cn}>{item.employer}</h2>
        <div className={objectives_container_cn}>
          <h2 className={objectives_title_cn}>Objectives</h2>
          <hr className={item_divider_cn} />
          <ul className={objectives_items_cn}>
            {item.feats.map((c, index) => (
              <li key={index}>{c}</li>
            ))}
          </ul>
        </div>
        <div className={rewards_container_cn}>
          <h2 className={rewards_title_cn}>Rewards</h2>
          <hr className={item_divider_cn} />+{calcXp(item)} XP
        </div>
      </div>
    </div>
  );
};

export default ActiveQuestItem;
