import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import { TreeNode } from './tree.model';
import { computed } from '@angular/core';

export const TreeStore = signalStore(
  withState<{ nodes: TreeNode[] }>({ nodes: [] }),
  withMethods((state) => {
    return {
      setNodes(nodes: TreeNode[]): void {
        patchState(state, { nodes });
      },
      expand(node: TreeNode): void {
        const collapseNested = (node: TreeNode): TreeNode => ({
          ...node,
          expanded: false,
          children: node.children?.map((child) => collapseNested(child)),
        });

        const expand = (nodes: TreeNode[], node: TreeNode): TreeNode[] =>
          nodes.map((n) => {
            if (n.value === node.value) {
              const expanded = !n.expanded;

              if (!expanded) {
                return collapseNested({ ...n, expanded });
              }

              return { ...n, expanded };
            }

            // nested level node expansion
            return {
              ...n,
              children: n.children ? expand(n.children, node) : undefined,
            };
          });

        const nodes = expand(state.nodes(), node);
        patchState(state, { nodes });
      },
      select(node: TreeNode, selected: boolean): void {
        const selectNested = (node: TreeNode): TreeNode => ({
          ...node,
          // node that have children have undefined selected state
          selected: node.children?.length ? undefined : !selected,
          children: node.children?.map((child) => selectNested(child)),
        });

        const updateNodes = (nodes: TreeNode[], node: TreeNode): TreeNode[] =>
          nodes.map((n) => {
            if (n === node) {
              return selectNested(n);
            }

            // nested level node selection
            return {
              ...n,
              // node that have children have undefined selected state
              selected: n.children?.length ? undefined : n.selected,
              children: n.children ? updateNodes(n.children, node) : undefined,
            };
          });
        const nodes = updateNodes(state.nodes(), node);

        patchState(state, { nodes });
      },

      deselectAll(): void {
        const deselectAllNodes = (nodes: TreeNode[]): TreeNode[] => {
          return nodes.map((node) => ({
            ...node,
            selected: false,
            children: node.children
              ? deselectAllNodes(node.children)
              : undefined,
          }));
        };

        const nodes = deselectAllNodes(state.nodes());
        patchState(state, { nodes });
      },
    };
  }),
  withComputed((state) => {
    return {
      selectedNodes: computed<(number | string)[]>(() => {
        const selectNodes = (nodes: TreeNode[]): (number | string)[] =>
          nodes.flatMap((node) => [
            ...(node.selected ? [node.value] : []),
            ...(node.children ? selectNodes(node.children) : []),
          ]);

        return selectNodes(state.nodes());
      }),
    };
  })
);
