import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDialogDeleteComponent } from './room-dialog-delete.component';

describe('RoomDialogDeleteComponent', () => {
  let component: RoomDialogDeleteComponent;
  let fixture: ComponentFixture<RoomDialogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDialogDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
