import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSetComponent } from './location-set.component';

describe('LocationSetComponent', () => {
  let component: LocationSetComponent;
  let fixture: ComponentFixture<LocationSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
