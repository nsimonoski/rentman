import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DemoTreeComponent } from './demo-tree.component';

describe('DemoTreeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoTreeComponent],
      providers: [{ provide: HttpClient, useValue: {} }],
    }).compileComponents();
  });

  it('should create', () => {
    const component =
      TestBed.createComponent(DemoTreeComponent).componentInstance;
    expect(component).toBeTruthy();
  });
});
