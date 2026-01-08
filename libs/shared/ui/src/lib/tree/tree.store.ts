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

      expand(targetNode: TreeNode): void {
        const collapseNested = (node: TreeNode): TreeNode => ({
          ...node,
          expanded: false,
          children: node.children?.map((child) => collapseNested(child)),
        });

        const expandNodes = (
          nodes: TreeNode[],
          nodeToUpdate: TreeNode
        ): TreeNode[] =>
          nodes.map((n) => {
            // Duplicate values (itemId & parentId). Compare by reference, immutable nodes
            if (n === nodeToUpdate) {
              const expanded = !n.expanded;

              if (!expanded) {
                return collapseNested({ ...n, expanded });
              }

              return { ...n, expanded };
            }

            // traverse the tree until the node is found.
            return {
              ...n,
              children: n.children
                ? expandNodes(n.children, nodeToUpdate)
                : undefined,
            };
          });

        const nodes = expandNodes(state.nodes(), targetNode);
        patchState(state, { nodes });
      },

      select(targetNode: TreeNode, selected: boolean): void {
        const selectNested = (node: TreeNode): TreeNode => ({
          ...node,
          // node that have children have undefined selected state
          selected: node.children?.length ? undefined : !selected,
          children: node.children?.map((child) => selectNested(child)),
        });

        const updateNodes = (
          nodes: TreeNode[],
          nodeToUpdate: TreeNode
        ): TreeNode[] =>
          nodes.map((n) => {
            // Duplicate values (itemId & parentId). Compare by reference, immutable nodes
            if (n === nodeToUpdate) {
              return selectNested(n);
            }

            // traverse the tree until the node is found
            return {
              ...n,
              children: n.children
                ? updateNodes(n.children, nodeToUpdate)
                : undefined,
            };
          });

        const nodes = updateNodes(state.nodes(), targetNode);

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
