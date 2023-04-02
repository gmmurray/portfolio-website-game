import React, { Fragment, MouseEvent, useCallback } from 'react';
import { gameCmsActions, gameCmsSelectors } from '../../redux/gameCmsSlice';
import { useDispatch, useSelector } from 'react-redux';

import InventoryItemDisplay from './InventoryItemDisplay';
import InventoryItemTooltip from './InventoryItemTooltip';
import { InventoryProject } from '../../types/cmsContent';
import classNames from 'classnames';
import { combineCss } from '../../helpers/combineCss';

const base_cn = 'inventory-item';
const rare_cn = combineCss(base_cn, 'rare');
const epic_cn = combineCss(base_cn, 'epic');
const occupied_cn = combineCss(base_cn, 'occupied');
const icon_cn = 'icon';

type InventoryItemProps = {
  item: InventoryProject | null;
};

const InventoryItem = ({ item }: InventoryItemProps) => {
  const selectedProject = useSelector(
    gameCmsSelectors.selectGameCmsSelectedProject,
  );
  const dispatch = useDispatch();
  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      dispatch(gameCmsActions.selectedProjectChanged(item));
    },
    [dispatch, item],
  );

  const isSelected =
    selectedProject && item && selectedProject.title === item.title;

  return (
    <div
      className={classNames(base_cn, {
        [occupied_cn]: !!item,
        [epic_cn]: item?.type === 'featured',
        [rare_cn]: item?.type === 'other',
      })}
      onClick={!!item ? handleClick : undefined}
    >
      {item && (
        <Fragment>
          <InventoryItemTooltip item={item} hidden={!!selectedProject}>
            <span className={icon_cn} style={{ color: item.iconColor }}>
              <i className={item.iconName}></i>
            </span>
          </InventoryItemTooltip>
          {isSelected && <InventoryItemDisplay />}
        </Fragment>
      )}
    </div>
  );
};

export default InventoryItem;
