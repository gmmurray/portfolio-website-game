/* eslint-disable @next/next/no-img-element */

import { OverlayContentKey } from '../types/overlayContent';
import React from 'react';
import classNames from 'classnames';
import { combineCss } from '../helpers/combineCss';
import { overlaySelectors } from '../redux/overlaySlice';
import { useSelector } from 'react-redux';
import { useVisibleTimeout } from '../helpers/customHooks';

const diplomaContent = {
  [OverlayContentKey.UF]: {
    type: 'Arts',
    school: 'University of Florida',
    degree: 'Anthropology',
    year: '2018',
  },
  [OverlayContentKey.UNF]: {
    type: 'Science',
    school: 'University of North Florida',
    degree: 'Computing and Information Sciences',
    year: '2020',
  },
};

const IMAGE_SRC = '/assets/game/images/paper_scroll.png';

const overlay_cn = 'game-overlay-message-component-container';
const base_cn = 'diploma';
const container_cn = combineCss(base_cn, 'container');
const visible_container_cn = combineCss(container_cn, 'visible');
const image_cn = combineCss(base_cn, 'image');
const content_cn = combineCss(base_cn, 'content');
const school_content_cn = combineCss(content_cn, 'school');
const type_content_cn = combineCss(content_cn, 'type');
const degree_content_cn = combineCss(content_cn, 'degree');
const year_content_cn = combineCss(content_cn, 'year');

const Diploma = () => {
  const contentIsVisible = useVisibleTimeout(2000);
  const key = useSelector(overlaySelectors.selectOverlayContentKey);
  const { type, school, degree, year } =
    diplomaContent[(key as keyof typeof diplomaContent) ?? 1];

  return (
    <div
      className={classNames(overlay_cn, container_cn, {
        [visible_container_cn]: contentIsVisible,
      })}
    >
      <img src={IMAGE_SRC} className={image_cn} alt="diploma" />
      <div className={content_cn}>
        <h1 className={school_content_cn}>{school}</h1>
        <p className={type_content_cn}>Bachelor of {type}</p>
        <p className={degree_content_cn}>{degree}</p>
        <p className={year_content_cn}>{year}</p>
      </div>
    </div>
  );
};

export default Diploma;
