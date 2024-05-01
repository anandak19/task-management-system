import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsPageComponent } from './task-details-page.component';

describe('TaskDetailsPageComponent', () => {
  let component: TaskDetailsPageComponent;
  let fixture: ComponentFixture<TaskDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
