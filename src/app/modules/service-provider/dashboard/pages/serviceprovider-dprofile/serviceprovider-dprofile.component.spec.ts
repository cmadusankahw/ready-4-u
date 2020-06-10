import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderDprofileComponent } from './serviceprovider-dprofile.component';

describe('ServiceproviderDprofileComponent', () => {
  let component: ServiceproviderDprofileComponent;
  let fixture: ComponentFixture<ServiceproviderDprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceproviderDprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceproviderDprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
