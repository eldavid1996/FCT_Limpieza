import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-moveToHistory-task-modal',
  templateUrl: './moveToHistoryTaskModal.component.html',
  styleUrls: ['./moveToHistoryTaskModal.component.css'],
})
export class MoveToHistoryTaskModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MoveToHistoryTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close('confirm');
  }
}
