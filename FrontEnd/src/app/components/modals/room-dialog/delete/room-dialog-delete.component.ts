import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RoomService } from '../../../../services/room.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../user-table/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-room-dialog-delete',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './room-dialog-delete.component.html',
  styleUrl: './room-dialog-delete.component.css'
})
export class RoomDialogDeleteComponent implements OnInit, OnDestroy {
  roomSubscription: Subscription = new Subscription();
  snackbarDuration = 5;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomService: RoomService,
    private dialogRef: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {

  }

  confirmDelete() {
    const roomId = this.data.room.id;
    this.roomService.eliminarRoom(roomId).subscribe(
      () => {
        this.dialogRef.closeAll();
        console.log('Room eliminado exitosamente.');
        //this.toastr.success('Usuario eliminado correctamente', 'Éxito');
      }
    );

    this.openSnackBar('¡Habitación eliminada exitosamente!');
    this.dialogRef.closeAll();
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: this.snackbarDuration * 1000
    });
    this.dialogRef.closeAll();
  }

  cancelDelete() {
    this.dialogRef.closeAll();
  }

  ngOnDestroy() {
    this.roomSubscription.unsubscribe();
  }
}
