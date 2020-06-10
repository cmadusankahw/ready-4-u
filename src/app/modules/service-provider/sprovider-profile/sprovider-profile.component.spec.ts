import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SproviderProfileComponent } from './sprovider-profile.component';

describe('SproviderProfileComponent', () => {
  let component: SproviderProfileComponent;
  let fixture: ComponentFixture<SproviderProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SproviderProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SproviderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
