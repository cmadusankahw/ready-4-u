import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDordersComponent } from './customer-dorders.component';

describe('CustomerDordersComponent', () => {
  let component: CustomerDordersComponent;
  let fixture: ComponentFixture<CustomerDordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
