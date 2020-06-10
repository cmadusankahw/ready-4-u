import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderListComponent } from './serviceprovider-list.component';

describe('ServiceproviderListComponent', () => {
  let component: ServiceproviderListComponent;
  let fixture: ComponentFixture<ServiceproviderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceproviderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceproviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
