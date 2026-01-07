import { TestBed } from '@angular/core/testing';

import { TreeGroupComponent } from './tree-group.component';

describe('TreeGroupComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeGroupComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const component =
      TestBed.createComponent(TreeGroupComponent).componentInstance;
    expect(component).toBeTruthy();
  });
});
