import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';

import { TreeComponent } from '@rentman/shared-ui';
import { DemoTreeStore } from './demo-tree.store';

const imports = [TreeComponent];

@Component({
  templateUrl: './demo-tree.component.html',
  styleUrls: ['./demo-tree.component.scss'],
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DemoTreeStore],
})
export class DemoTreeComponent {
  treeComponent = viewChild.required<TreeComponent>(TreeComponent);
  store = inject(DemoTreeStore);

  deselectAll(): void {
    this.treeComponent().deselectAll();
    this.store.showSnackBar('Success!! All nodes have been deselected.');
  }
}
