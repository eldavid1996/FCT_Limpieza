import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../user-table/material.module';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RoomService } from '../../../../services/room.service';
import { Room } from '../../../../models/room.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-room-dialog-nuevo',
  standalone: true,
  templateUrl: './room-dialog-nuevo.component.html',
  styleUrl: './room-dialog-nuevo.component.css',
  imports: [CommonModule, FormsModule, MaterialModule,ReactiveFormsModule]
})

export class RoomDialogNuevoComponent implements OnInit, OnDestroy {

  roomForm: FormGroup |any;
  roomSubscription: Subscription = new Subscription();
  defaultType: string = 'Individual';
  defaultStatus: string = 'Vacia';
  statusOptions = [
    { label: 'Vacia', value: 'Vacia' },
    { label: 'Ocupada', value: 'Ocupada' },
  ];
  typeOptions = [
    { label: 'Individual', value: 'Individual' },
    { label: 'Doble', value: 'Doble' },
    { label: 'Triple', value: 'Triple' },
    { label: 'Minusválidos', value: 'Minusvalido' },
    { label: 'Personalizada', value: 'Personalizada' },
  ];
  snackbarDuration = 5;


  constructor(private roomService: RoomService, private dialogRef: MatDialog, private formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.roomForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      floor: ['', Validators.required],
      type: [''],
      status: ['']
    });
  }

  guardarRoom() {
    console.log('Add Room button clicked');
    console.log('Estado del formulario:', this.roomForm);

    if (this.roomForm.valid) {
      console.log('Formulario válido:', this.roomForm.value);

      const roomData: Room = {
        roomNumber: this.roomForm.value.roomNumber,
        floor: this.roomForm.value.floor,
        type: this.roomForm.value.type,
        status: this.roomForm.value.status
      };

      console.log('Enviando solicitud para guardar habitación:', roomData);
      this.roomService.guardarRoom(roomData);

      this.roomSubscription = this.roomService.guardarRoomListener().subscribe(
        () => {
          this.dialogRef.closeAll();
          console.log('Habitación guardada exitosamente.');
        },
        (error) => {
          this.openSnackBar('Error al actualizar la contraseña');
        console.error('Error al actualizar la contraseña:', error);
        }
      );
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos correctamente.');
    }
  }
    // Snackbar with the update password action result from the API
    openSnackBar(message: string) {
      this._snackBar.openFromComponent(UpdatePasswordSnackbar, {
        duration: this.snackbarDuration * 1000,
        data: message,
      });
    }


  cerrarDialog() {
    this.dialogRef.closeAll();
  }

  ngOnDestroy() {
    this.roomSubscription.unsubscribe();
  }
}
