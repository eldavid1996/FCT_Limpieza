import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-room-modal',
  templateUrl: './deleteRoomModal.component.html',
  styleUrls: ['./deleteRoomModal.component.css'],
})
export class DeleteRoomModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteRoomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close('confirm');
  }
}
