import React, { FC } from 'react';

import { TechnologyTree } from '../../types/cmsContent';
import classNames from 'classnames';
import { combineCss } from '../../helpers/combineCss';

type TalentNodeProps = {
  onClick: () => any;
  selected: boolean;
} & TechnologyTree;

const base_cn = 'talent-tree';
const node_cn = combineCss(base_cn, 'row-node');
const active_node_cn = combineCss(node_cn, 'active');
const active_selected_cn = combineCss(active_node_cn, 'selected');
const inactive_selected_cn = combineCss(node_cn, 'selected');
const points_cn = combineCss(base_cn, 'points');
const icon_cn = 'icon';

const TalentNode: FC<TalentNodeProps> = ({ onClick, selected, ...props }) => {
  const isActive = props.points > 0;

  return (
    <div
      id={props.id}
      className={classNames(node_cn, {
        [active_node_cn]: isActive,
        [active_selected_cn]: isActive && selected,
        [inactive_selected_cn]: !isActive && selected,
      })}
      onClick={onClick}
    >
      <span className={icon_cn}>
        <i className={props.code}></i>
      </span>
      <div className={points_cn}>
        {props.points}/{props.total}
      </div>
    </div>
  );
};

export default TalentNode;
