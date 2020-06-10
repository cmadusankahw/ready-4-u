import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpCurrentOrderComponent } from './sp-current-order.component';

describe('SpCurrentOrderComponent', () => {
  let component: SpCurrentOrderComponent;
  let fixture: ComponentFixture<SpCurrentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpCurrentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpCurrentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
