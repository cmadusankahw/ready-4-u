import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderDashboardComponent } from './serviceprovider-dashboard.component';

describe('ServiceproviderDashboardComponent', () => {
  let component: ServiceproviderDashboardComponent;
  let fixture: ComponentFixture<ServiceproviderDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceproviderDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceproviderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
