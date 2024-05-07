import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDialogChangeComponent } from './room-dialog-change.component';

describe('RoomDialogChangeComponent', () => {
  let component: RoomDialogChangeComponent;
  let fixture: ComponentFixture<RoomDialogChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDialogChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomDialogChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
