import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDhomeComponent } from './customer-dhome.component';

describe('CustomerDhomeComponent', () => {
  let component: CustomerDhomeComponent;
  let fixture: ComponentFixture<CustomerDhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
