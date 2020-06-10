import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderDashStatComponent } from './serviceprovider-dash-stat.component';

describe('ServiceproviderDashStatComponent', () => {
  let component: ServiceproviderDashStatComponent;
  let fixture: ComponentFixture<ServiceproviderDashStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceproviderDashStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceproviderDashStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
