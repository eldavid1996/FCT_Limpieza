import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDialogNuevoComponent } from './room-dialog-nuevo.component';

describe('RoomDialogNuevoComponent', () => {
  let component: RoomDialogNuevoComponent;
  let fixture: ComponentFixture<RoomDialogNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDialogNuevoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomDialogNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
