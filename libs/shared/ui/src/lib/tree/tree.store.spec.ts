import { TreeStore } from './tree.store';
import { TreeNode } from './tree.model';
import { TestBed } from '@angular/core/testing';

describe('TreeStore', () => {
  const nodes: TreeNode[] = [
    {
      text: 'A',
      value: 1,
      expanded: false,
      children: [
        {
          text: 'B',
          value: 2,
          expanded: false,
        },
        {
          text: 'B1',
          value: 22,
          expanded: false,
        },
      ],
    },
    {
      text: 'C',
      value: 3,
      expanded: true,
      selected: undefined,
      children: [
        {
          text: 'D',
          value: 4,
          expanded: true,
          selected: true,
        },
        {
          text: 'E',
          value: 5,
          expanded: true,
          selected: true,
        },
      ],
    },
    {
      text: 'F',
      value: 6,
      expanded: false,
    },
  ];

  const setupStore = () => {
    TestBed.configureTestingModule({
      providers: [TreeStore],
    });

    const store = TestBed.inject(TreeStore);
    store.setNodes([...nodes]);
    return store;
  };

  it('setNodes shouuld set the nodes', () => {
    const store = setupStore();

    expect(store.nodes().length).toBe(nodes.length);
    expect(store.nodes()[0].text).toBe(nodes[0].text);
  });

  it('expand should expand the single node', () => {
    const store = setupStore();

    store.expand(store.nodes()[0]);

    expect(store.nodes()[0].expanded).toBeTruthy();
  });

  describe('select should select the correct nodes', () => {
    describe('when node WITH children', () => {
      it('is selected, all children should be selected', () => {
        const store = setupStore();

        store.select(store.nodes()[0], false);

        expect(store.nodes()[0].selected).toBeUndefined();
        expect(
          store.nodes()[0]?.children?.every((c) => c.selected)
        ).toBeTruthy();
        expect(store.nodes()[0].children?.some((c) => !c.selected)).toBeFalsy();
      });

      it('is deselected, all children should be deselected', () => {
        const store = setupStore();

        store.select(store.nodes()[1], true);

        expect(store.nodes()[1].selected).toBeUndefined();
        expect(
          store.nodes()[1]?.children?.every((c) => !c.selected)
        ).toBeTruthy();
      });
    });

    describe('when node WITHOUT children', () => {
      it('is selected, should select only that node', () => {
        const store = setupStore();

        store.select((store.nodes()[0].children || [])[0], false);

        expect(store.nodes()[0].selected).toBeUndefined();
        expect(store.nodes()[0].children?.some((c) => c.selected)).toBeTruthy();
        expect(store.nodes()[0].children?.every((c) => c.selected)).toBeFalsy();
      });
    });

    it('is deselected, should deselect only that node', () => {
      const store = setupStore();

      store.select((store.nodes()[1].children || [])[0], true);

      expect(store.nodes()[1].selected).toBeUndefined();
      expect(store.nodes()[1].children?.some((c) => c.selected)).toBeTruthy();
      expect(store.nodes()[1].children?.every((c) => c.selected)).toBeFalsy();
    });
  });
});
