import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTimeCountdownComponent } from './task-time-countdown.component';

describe('TaskTimeCountdownComponent', () => {
  let component: TaskTimeCountdownComponent;
  let fixture: ComponentFixture<TaskTimeCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTimeCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTimeCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
