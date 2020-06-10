import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapServiceProviderComponent } from './map-service-provider.component';

describe('MapServiceProviderComponent', () => {
  let component: MapServiceProviderComponent;
  let fixture: ComponentFixture<MapServiceProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapServiceProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
