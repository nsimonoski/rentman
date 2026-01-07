import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { TreeItemComponent } from './tree-item.component';
import { TreeStore } from '../tree.store';
import { TreeNode } from '../tree.model';

describe('TreeItemComponent', () => {
  beforeEach(async () => {
    const treeStore = {
      nodes: signal(new Array<TreeNode>()),
      expand: jest.fn(),
      select: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TreeItemComponent],
      providers: [{ provide: TreeStore, useValue: treeStore }],
    }).compileComponents();
  });

  const setupComponent = (node: TreeNode) => {
    const fixture = TestBed.createComponent(TreeItemComponent);
    fixture.componentRef.setInput('node', node);
    return fixture.componentInstance;
  };

  describe('should get selected value and return', () => {
    it('true select', () => {
      const component = setupComponent({
        text: 'A',
        value: 1,
        selected: true,
      });

      expect(component.selected()).toBeTruthy();
    });

    it('true when all childs are selected', () => {
      const component = setupComponent({
        text: 'A',
        value: 1,
        children: [
          {
            text: 'B',
            value: 2,
            selected: true,
          },
        ],
      });

      expect(component.selected()).toBeTruthy();
    });

    it('false', () => {
      const component = setupComponent({
        text: 'A',
        value: 1,
        selected: false,
      });

      expect(component.selected()).toBeFalsy();
    });

    it('false when all childs are not selected', () => {
      const component = setupComponent({
        text: 'A',
        value: 1,
        children: [
          {
            text: 'B',
            value: 2,
            selected: true,
          },
          {
            text: 'B1',
            value: 22,
            selected: false,
          },
        ],
      });

      expect(component.selected()).toBeFalsy();
    });
  });

  describe('should get indeterminate value and return', () => {
    it('false when all values childs are selected', () => {
      const component = setupComponent({
        text: 'A',
        value: 1,
        children: [
          {
            text: 'B',
            value: 2,
            selected: true,
          },
          {
            text: 'B1',
            value: 22,
            selected: true,
          },
        ],
      });

      expect(component.indeterminate()).toBeFalsy();
    });

    it('true when some childs are selected', () => {
      const component = setupComponent({
        text: 'A',
        value: 1,
        children: [
          {
            text: 'B',
            value: 2,
            selected: true,
          },
          {
            text: 'B1',
            value: 22,
            selected: false,
          },
        ],
      });

      expect(component.indeterminate()).toBeTruthy();
    });
  });

  describe('should call expand', () => {
    it('an call the store', () => {
      const component = setupComponent({
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
      });

      component.expand();

      expect(component.store.expand).toHaveBeenCalled();
    });

    it('should do not call the store', () => {
      const component = setupComponent({
        text: 'A',
        value: 1,
        expanded: false,
      });

      component.expand();

      expect(component.store.expand).not.toHaveBeenCalled();
    });
  });

  it('should call select', () => {
    const component = setupComponent({
      text: 'A',
      value: 1,
      expanded: false,
    });

    component.select();

    expect(component.store.select).toHaveBeenCalledWith(
      component.node(),
      component.selected()
    );
  });
});
