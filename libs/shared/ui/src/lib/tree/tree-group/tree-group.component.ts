import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TreeItemComponent } from '../item/tree-item.component';
import { TreeNode } from '../tree.model';

const imports = [TreeItemComponent];

@Component({
  selector: 'rm-tree-group',
  templateUrl: './tree-group.component.html',
  styleUrls: ['./tree-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
})
export class TreeGroupComponent {
  nodes = input.required<TreeNode[]>();
  depth = input<number>(1);
}
