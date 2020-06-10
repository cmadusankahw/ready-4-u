import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderDhomeComponent } from './serviceprovider-dhome.component';

describe('ServiceproviderDhomeComponent', () => {
  let component: ServiceproviderDhomeComponent;
  let fixture: ComponentFixture<ServiceproviderDhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceproviderDhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceproviderDhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
