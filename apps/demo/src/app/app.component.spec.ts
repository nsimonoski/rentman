import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create component', () => {
    const component = TestBed.createComponent(AppComponent).componentInstance;
    expect(component).toBeTruthy();
  });
});
