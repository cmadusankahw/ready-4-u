import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustCurrentOrderComponent } from './cust-current-order.component';

describe('CustCurrentOrderComponent', () => {
  let component: CustCurrentOrderComponent;
  let fixture: ComponentFixture<CustCurrentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustCurrentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustCurrentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
