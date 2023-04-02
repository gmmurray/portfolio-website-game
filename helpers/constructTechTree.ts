import { IAboutContent } from '../types/portfolioContent';
import { TechnologyTree } from '../types/cmsContent';
import cloneDeep from 'lodash.clonedeep';

export const constructTechTree = (input: IAboutContent['techTree']) => {
  const clone = cloneDeep(input);
  const { items } = clone;

  const map: Record<string, TechnologyTree> = {
    '0': {
      content: 'root',
      id: '0',
      code: '',
      points: 1,
      total: 1,
      title: 'root',
      children: [],
    },
  };

  items.forEach(item => {
    map[item.id] = item;
  });

  items.forEach(item => {
    const key = item.parent === undefined ? '0' : item.parent;

    map[key].children = [...(map[key]?.children ?? []), item];
  });

  let result = map['0'];
  const assemble = (tree: TechnologyTree) => {
    if (map[tree.id].children && (map[tree.id].children ?? []).length > 0) {
      (map[tree.id].children ?? []).forEach(child => assemble(child));
    }
    return tree;
  };

  return assemble(result);
};

export const createRows = (data: TechnologyTree) => {
  const items = { ...data };
  const rows: TechnologyTree[][] = [];

  const createNodes = (node: TechnologyTree, rowNum: number) => {
    if (rows[rowNum]) {
      rows[rowNum].push(node);
    } else {
      rows[rowNum] = [node];
    }

    if (node.children) {
      node.children.forEach(child => createNodes(child, rowNum + 1));
    }
  };

  createNodes(items, 0);
  return rows;
};
