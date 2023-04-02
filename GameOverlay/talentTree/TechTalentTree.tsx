import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  THEME_DARK_YELLOW,
  THEME_LIGHT_GREY,
  THEME_WHITE,
  THEME_YELLOW,
} from '../../constants/gameConstants';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { constructTechTree, createRows } from '../../helpers/constructTechTree';
import { gameCmsActions, gameCmsSelectors } from '../../redux/gameCmsSlice';
import { useDispatch, useSelector } from 'react-redux';

import TalentNode from './TalentNode';
import { TechnologyTree } from '../../types/cmsContent';
import classNames from 'classnames';
import { combineCss } from '../../helpers/combineCss';
import { overlaySelectors } from '../../redux/overlaySlice';
import { useVisibleTimeout } from '../../helpers/customHooks';
import { mdiArrowLeftThick, mdiArrowRightThick } from '@mdi/js';
import Icon from '@mdi/react';

const overlay_cn = 'game-overlay-message-component-container';
const base_cn = 'talent-tree';
const container_cn = combineCss(base_cn, 'container');
const shifted_cn = combineCss(container_cn, 'shifted');
const visible_cn = combineCss(container_cn, 'visible');
const selector_cn = combineCss(base_cn, 'selector');
const next_selector_cn = combineCss(selector_cn, 'next');
const row_cn = combineCss(base_cn, 'row');
const info_cn = combineCss(base_cn, 'info');
const visible_info_cn = combineCss(info_cn, 'visible');
const info_header_cn = combineCss(info_cn, 'header');
const info_header_title_cn = combineCss(info_header_cn, 'title');
const info_header_points_cn = combineCss(info_header_cn, 'points');
const info_content_cn = combineCss(info_cn, 'content');
const small_btn_cn = 'button is-small';

const TechTalentTree = () => {
  const dispatch = useDispatch();
  const data = useSelector(gameCmsSelectors.selectGameCmsData)?.technologyTree;
  const selectedTreeIndex = useSelector(
    gameCmsSelectors.selectSelectedTalentTree,
  );
  const { talentTree } = useSelector(overlaySelectors.selectUnlockedFeatures);

  const [selectedNode, setSelectedNode] = useState<TechnologyTree | null>(null);

  const treeIsVisible = useVisibleTimeout(talentTree ? 0 : 2000);

  const [infoIsVisible, setInfoIsVisible] = useState(false);

  const tree = useMemo(
    () => constructTechTree({ ...(data ?? { items: [] }) }),
    [data],
  );
  const talentTrees = (tree?.children ?? []).map(c => createRows(c));

  const handleNextTree = useCallback(() => {
    if (selectedTreeIndex === talentTrees.length - 1) {
      return;
    }
    dispatch(gameCmsActions.selectedTalentTreeChanged(selectedTreeIndex + 1));
  }, [dispatch, selectedTreeIndex, talentTrees.length]);

  const handlePrevTree = useCallback(() => {
    if (selectedTreeIndex === 0) {
      return;
    }
    dispatch(gameCmsActions.selectedTalentTreeChanged(selectedTreeIndex - 1));
  }, [dispatch, selectedTreeIndex]);

  useEffect(() => {
    setSelectedNode(null);
  }, [selectedTreeIndex]);

  const handleSelectNode = useCallback(
    (node: TechnologyTree | null) => setSelectedNode(node),
    [],
  );

  useEffect(() => {
    const newValue = selectedNode !== null;
    setInfoIsVisible(newValue);
  }, [selectedNode]);

  return (
    <div className={classNames(overlay_cn, base_cn)}>
      <div
        className={classNames(container_cn, {
          [shifted_cn]: selectedNode !== null,
          [visible_cn]: treeIsVisible,
        })}
      >
        <div className={selector_cn}>
          <button
            className={small_btn_cn}
            disabled={selectedTreeIndex === 0}
            onClick={handlePrevTree}
          >
            <Icon path={mdiArrowLeftThick} size={1} />
          </button>
          <button
            className={classNames(small_btn_cn, next_selector_cn)}
            disabled={selectedTreeIndex === talentTrees.length - 1}
            onClick={handleNextTree}
          >
            <Icon path={mdiArrowRightThick} size={1} />
          </button>
        </div>
        {(talentTrees[selectedTreeIndex] ?? []).map(
          (row: TechnologyTree[], index) => (
            <div className={row_cn} key={index}>
              {row.map(item => {
                const selected = selectedNode && selectedNode.id === item.id;

                const nodeProps = {
                  ...item,
                  selected: selected === true,
                  onClick: () => handleSelectNode(selected ? null : item),
                };

                let arrowColor: string;
                if (item.points > 0) {
                  arrowColor = selected ? THEME_WHITE : THEME_LIGHT_GREY;
                } else {
                  arrowColor = selected ? THEME_YELLOW : THEME_DARK_YELLOW;
                }

                return (
                  <Xwrapper key={item.id}>
                    <TalentNode {...nodeProps} />
                    {item.parent !== undefined && (
                      <Xarrow
                        key={`${item.id}-${selected}`}
                        start={item.id}
                        end={item.parent}
                        curveness={0}
                        showTail={false}
                        showHead={false}
                        animateDrawing={false}
                        color={arrowColor}
                        endAnchor="bottom"
                        startAnchor="top"
                      />
                    )}
                  </Xwrapper>
                );
              })}
            </div>
          ),
        )}
      </div>
      {selectedNode && (
        <div
          className={classNames(info_cn, {
            [visible_info_cn]: infoIsVisible,
          })}
        >
          <div className={info_header_cn}>
            <p className={info_header_title_cn}>{selectedNode.title}</p>
            <p className={info_header_points_cn}>
              {selectedNode.points}/{selectedNode.total}
            </p>
          </div>
          <p className={info_content_cn}>{selectedNode.content}</p>
        </div>
      )}
    </div>
  );
};

export default TechTalentTree;
