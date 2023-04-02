import React, { useCallback, useMemo } from 'react';
import { gameCmsActions, gameCmsSelectors } from '../../redux/gameCmsSlice';
import { useDispatch, useSelector } from 'react-redux';

import InventoryItem from './InventoryItem';
import { combineCss } from '../../helpers/combineCss';
import { combineProjectArrays } from './helpers';

const COLUMN_COUNT = 5;
const ROW_COUNT = 6;
const MAX_ITEM_COUNT = COLUMN_COUNT * ROW_COUNT;

const base_cn = 'inventory';
const container_cn = combineCss(base_cn, 'container');
const inner_container_cn = combineCss(container_cn, 'inner');
const items_container_cn = combineCss(base_cn, 'items-container');

const Inventory = () => {
  const dispatch = useDispatch();
  const featuredProjects = useSelector(
    gameCmsSelectors.selectGameCmsFeaturedContent,
  );
  const otherProjects = useSelector(gameCmsSelectors.selectGameCmsOtherContent);

  const inventoryProjects = useMemo(() => {
    const items = combineProjectArrays(
      featuredProjects ?? [],
      otherProjects ?? [],
    );
    if (items.length === MAX_ITEM_COUNT) {
      return items;
    }

    return [...Array(MAX_ITEM_COUNT)].map((_, index) => {
      return items[index] ?? null;
    });
  }, [featuredProjects, otherProjects]);

  const handleDeselectProject = useCallback(() => {
    dispatch(gameCmsActions.selectedProjectChanged(null));
  }, [dispatch]);

  return (
    <div className={container_cn} onClick={handleDeselectProject}>
      <div className={inner_container_cn}>
        <h1>Inventory</h1>
        <div className={items_container_cn}>
          {(inventoryProjects ?? []).map((item, index) => (
            <InventoryItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
