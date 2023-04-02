import React, { useCallback } from 'react';
import { gameCmsActions, gameCmsSelectors } from '../../redux/gameCmsSlice';
import { useDispatch, useSelector } from 'react-redux';

import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import { combineCss } from '../../helpers/combineCss';

const base_cn = 'inventory-item-display';
const container_cn = combineCss(base_cn, 'container');
const title_cn = combineCss(base_cn, 'title');
const title_container_cn = combineCss(title_cn, 'container');
const title_text_cn = combineCss(title_cn, 'text');
const title_button_cn = combineCss(title_cn, 'button');
const content_cn = combineCss(base_cn, 'content');
const tags_cn = combineCss(base_cn, 'tags');
const epic_item_cn = 'epic-item';
const rare_item_cn = 'rare-item';
const icon_cn = 'icon';
const x_mark_cn = 'fa-solid fa-xmark';

const InventoryItemDisplay = () => {
  const dispatch = useDispatch();
  const project = useSelector(gameCmsSelectors.selectGameCmsSelectedProject);

  const handleClose = useCallback(
    () => dispatch(gameCmsActions.selectedProjectChanged(null)),
    [dispatch],
  );

  const isEpic = project?.type === 'featured';
  return (
    <div className={container_cn} onClick={e => e.stopPropagation()}>
      <div className={title_container_cn}>
        <h1 className={title_text_cn}>{project?.title}</h1>
        <span
          className={classNames(icon_cn, title_button_cn)}
          onClick={handleClose}
        >
          <i className={x_mark_cn} />
        </span>
      </div>
      <div>
        <h2>Binds when {isEpic ? 'picked up' : 'equipped'}</h2>
      </div>
      <div>
        <h2
          className={classNames({
            [epic_item_cn]: isEpic,
            [rare_item_cn]: !isEpic,
          })}
        >
          {isEpic ? 'Epic' : 'Rare'} Item
        </h2>
      </div>
      <div className={tags_cn}>
        {(project?.techTags ?? []).map((tt, key) => (
          <span key={key}>
            {isEpic ? '+10' : '+5'} {tt}
          </span>
        ))}
      </div>
      <div className={content_cn}>
        <ReactMarkdown>{project!.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default InventoryItemDisplay;
