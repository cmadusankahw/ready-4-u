import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmownerProfileComponent } from './firmowner-profile.component';

describe('FirmownerProfileComponent', () => {
  let component: FirmownerProfileComponent;
  let fixture: ComponentFixture<FirmownerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmownerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmownerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
