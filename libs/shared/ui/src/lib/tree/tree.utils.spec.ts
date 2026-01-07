import { expandAllNodes, sortAlphabetically } from './tree.utils';
import { TreeNode } from './tree.model';

describe('Tree utils', () => {
  const nodes: TreeNode[] = [
    {
      text: 'B',
      value: 1,
      expanded: false,
      children: [
        {
          text: 'F',
          value: 2,
          expanded: false,
        },
        {
          text: 'C',
          value: 2,
          expanded: false,
        },
      ],
    },
    {
      text: 'D',
      value: 3,
      expanded: false,
    },
    {
      text: 'A',
      value: 3,
      expanded: false,
    },
  ];

  it('expandAll should expand all nodes', () => {
    const result = expandAllNodes(nodes);

    expect(result[0].expanded).toBe(true);
    expect(result[0].children?.every((c) => c.expanded)).toBe(true);
    expect(result[1].expanded).toBe(true);
  });

  it('sortAlphabetically should sort nodes alphabetically', () => {
    const result = sortAlphabetically(nodes);

    expect(result[0].text).toEqual('B');
    expect(result[0].children?.[0].text).toEqual('C');
    expect(result[1].text).toEqual('A');
    expect(result[2].text).toEqual('D');
  });
});
