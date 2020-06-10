import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSProviderComponent } from './signup-s-provider.component';

describe('SignupSProviderComponent', () => {
  let component: SignupSProviderComponent;
  let fixture: ComponentFixture<SignupSProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupSProviderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
