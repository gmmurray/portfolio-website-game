import { OverlayContentKey } from '../types/overlayContent';
import React from 'react';
import { StateSelector } from '../types/redux';
import classNames from 'classnames';
import { combineCss } from '../helpers/combineCss';
import { gameCmsSelectors } from '../redux/gameCmsSlice';
import { overlaySelectors } from '../redux/overlaySlice';
import { useSelector } from 'react-redux';
import { useVisibleTimeout } from '../helpers/customHooks';

const selectorByKey: Record<number, StateSelector<any>> = {
  [OverlayContentKey.BIO]: gameCmsSelectors.selectGameCmsAboutContent,
};
const overlay_cn = 'game-overlay-message-component-container';

const base_cn = 'simple-text';
const container_cn = combineCss(base_cn, 'container');
const visible_container_cn = combineCss(container_cn, 'visible');
const content_cn = combineCss(base_cn, 'content');

const SimpleText = () => {
  const contentIsVisible = useVisibleTimeout(2000);
  const currentContentKey =
    useSelector(overlaySelectors.selectOverlayContentKey) ?? '';
  const content = useSelector(
    selectorByKey[currentContentKey as keyof typeof selectorByKey],
  ) as React.ReactFragment;

  return (
    <div
      className={classNames(overlay_cn, container_cn, {
        [visible_container_cn]: contentIsVisible,
      })}
    >
      <div className={content_cn}>{content}</div>
    </div>
  );
};

export default SimpleText;
