import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderReportsComponent } from './serviceprovider-reports.component';

describe('ServiceproviderReportsComponent', () => {
  let component: ServiceproviderReportsComponent;
  let fixture: ComponentFixture<ServiceproviderReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceproviderReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceproviderReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
