import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderDordersComponent } from './serviceprovider-dorders.component';

describe('ServiceproviderDordersComponent', () => {
  let component: ServiceproviderDordersComponent;
  let fixture: ComponentFixture<ServiceproviderDordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceproviderDordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceproviderDordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
