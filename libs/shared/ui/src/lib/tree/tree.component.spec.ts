import { TestBed } from '@angular/core/testing';

import { TreeComponent } from './tree.component';

describe('TreeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const component = TestBed.createComponent(TreeComponent).componentInstance;
    expect(component).toBeTruthy();
  });
});
