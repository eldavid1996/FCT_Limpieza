import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogNuevoComponent } from './task-dialog-nuevo.component';

describe('TaskDialogNuevoComponent', () => {
  let component: TaskDialogNuevoComponent;
  let fixture: ComponentFixture<TaskDialogNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDialogNuevoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDialogNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
