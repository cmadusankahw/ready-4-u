import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderTaskCountdownComponent } from './serviceprovider-task-countdown.component';

describe('ServiceproviderTaskCountdownComponent', () => {
  let component: ServiceproviderTaskCountdownComponent;
  let fixture: ComponentFixture<ServiceproviderTaskCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceproviderTaskCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceproviderTaskCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
