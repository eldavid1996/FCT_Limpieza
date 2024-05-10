import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './deleteUserModal.component.html',
  styleUrls: ['./deleteUserModal.component.css'],
})
export class DeleteUserModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close('confirm');
  }
}
