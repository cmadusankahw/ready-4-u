import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDprofileComponent } from './customer-dprofile.component';

describe('CustomerDprofileComponent', () => {
  let component: CustomerDprofileComponent;
  let fixture: ComponentFixture<CustomerDprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
