import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderOrdersComponent } from './serviceprovider-orders.component';

describe('ServiceproviderOrdersComponent', () => {
  let component: ServiceproviderOrdersComponent;
  let fixture: ComponentFixture<ServiceproviderOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceproviderOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceproviderOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
