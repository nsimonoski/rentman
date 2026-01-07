import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  Signal,
} from '@angular/core';

import { TreeGroupComponent } from './tree-group/tree-group.component';
import { TreeStore } from './tree.store';
import { TreeNode } from './tree.model';

const imports = [TreeGroupComponent];

@Component({
  selector: 'rm-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
  providers: [TreeStore],
})
export class TreeComponent {
  protected store = inject(TreeStore);
  /**
   *  Tree nodes data required input.
   */
  nodes = input.required<TreeNode[]>();

  /**
   *  Tree nodes to be displayed & manipulated.
   */
  storeNodes = computed<TreeNode[]>(() => this.store.nodes());

  constructor() {
    effect(() => this.store.setNodes(this.nodes()));
  }

  /**
   *  Deselects all selected nodes in the tree.
   */
  deselectAll(): void {
    this.store.deselectAll();
  }

  /**
   * Gets all selected nodes.
   *
   * @returns Array of selected node values
   */
  selectedNodes(): Signal<(number | string)[]> {
    return this.store.selectedNodes;
  }
}
