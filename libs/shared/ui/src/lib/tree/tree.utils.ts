import { TreeNode } from './tree.model';

/**
 * Expands all nodes in the tree.
 *
 * @param nodes - Array of tree nodes
 * @returns Array of tree nodes with all nodes expanded
 */
export const expandAllNodes = (nodes: TreeNode[]): TreeNode[] => {
  return nodes.map((node) => ({
    ...node,
    expanded: true,
    children: node.children ? expandAllNodes(node.children) : undefined,
  }));
};

/**
 * Sorts all nodes in the tree alphabetically with folders coming first.
 *
 * @param nodes - Array of tree nodes
 * @returns Array of tree nodes with all nodes sorted
 */
export const sortAlphabetically = (nodes: TreeNode[]): TreeNode[] => {
  return [...nodes]
    .sort((a, b) => {
      // Folders first
      if (a.children && !b.children) {
        return -1;
      }
      if (!a.children && b.children) {
        return 1;
      }

      return a.text.localeCompare(b.text);
    })
    .map((node) => ({
      ...node,
      children: node.children ? sortAlphabetically(node.children) : undefined,
    }));
};
