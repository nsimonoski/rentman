import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { TreeStore } from '../tree.store';
import { TreeNode } from '../tree.model';

const imports = [NgClass];

@Component({
  selector: 'rm-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
})
export class TreeItemComponent {
  store = inject(TreeStore);
  node = input.required<TreeNode>();
  depth = input.required<number>();

  selected = computed<boolean>(
    () => this.node().selected || this.allDescendantSelected(this.node())
  );

  indeterminate = computed<boolean>(
    () =>
      !this.allDescendantSelected(this.node()) &&
      this.someDescendantSelected(this.node())
  );

  hasChildren = computed<boolean>(() => !!this.node().children?.length);

  expand(): void {
    if (this.node().children?.length) {
      this.store.expand(this.node());
    }
  }

  select(): void {
    this.store.select(this.node(), this.selected());
  }

  private allDescendantSelected(node: TreeNode): boolean {
    if (!node.children?.length) {
      return node.selected || false;
    }

    return node.children.every((child) => this.allDescendantSelected(child));
  }

  private someDescendantSelected(node: TreeNode): boolean {
    if (!node.children?.length) {
      return false;
    }

    return node.children.some(
      (child) => child.selected || this.someDescendantSelected(child)
    );
  }
}
