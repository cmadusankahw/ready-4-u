import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCustomerComponent } from './map-customer.component';

describe('MapCustomerComponent', () => {
  let component: MapCustomerComponent;
  let fixture: ComponentFixture<MapCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
