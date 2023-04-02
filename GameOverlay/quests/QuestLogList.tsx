import React, { useCallback } from 'react';
import { gameCmsActions, gameCmsSelectors } from '../../redux/gameCmsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { IndexedExperience } from '../../types/cmsContent';
import classNames from 'classnames';
import { combineCss } from '../../helpers/combineCss';

type QuestLogListProps = {
  items: IndexedExperience[];
};

const base_cn = 'quest-log';
const list_cn = combineCss(base_cn, 'list');
const list_item_cn = combineCss(list_cn, 'item');
const active_list_item_cn = combineCss(list_item_cn, 'active');

const QuestLogList = ({ items }: QuestLogListProps) => {
  const dispatch = useDispatch();
  const activeQuest = useSelector(gameCmsSelectors.selectGameCmsSelectedQuest);

  const handleSelectQuest = useCallback(
    (id: number) => () => dispatch(gameCmsActions.selectedQuestChanged(id)),
    [dispatch],
  );

  return (
    <div className={list_cn}>
      {items.map((item, index) => (
        <div
          key={index}
          className={classNames(list_item_cn, {
            [active_list_item_cn]: activeQuest === item.index,
          })}
          onClick={handleSelectQuest(item.index)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default QuestLogList;
