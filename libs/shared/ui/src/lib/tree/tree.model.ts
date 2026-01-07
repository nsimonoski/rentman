export interface TreeNode {
  text: string;
  value: number | string;
  children?: TreeNode[];
  selected?: boolean;
  expanded?: boolean;
}
