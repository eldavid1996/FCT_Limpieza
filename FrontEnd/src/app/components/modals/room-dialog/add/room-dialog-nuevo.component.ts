import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../user-table/material.module';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RoomService } from '../../../../services/room.service';
import { Room } from '../../../../models/room.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomSnackbarComponent } from './room-snackbar.component';
import { HttpErrorResponse } from '@angular/common/http';

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
    if (this.roomForm.valid) {
      const roomData: Room = {
        id: '',
        roomNumber: this.roomForm.value.roomNumber,
        floor: this.roomForm.value.floor,
        type: this.roomForm.value.type,
        status: this.roomForm.value.status,
      };

      this.roomService.getAllRooms().subscribe( //Comprobamos si alguna de todas de las habitaciones tiene el mismo roomNumber
        (rooms) => {
          const existingRoom = rooms.find(room => room.roomNumber === roomData.roomNumber);
          if (existingRoom) {
            // Habitación con el mismo número ya existe
            this.openSnackBar('¡La habitación ya existe!');
          } else {
            // Guardar la nueva habitación
            this.roomService.guardarRoom(roomData);
            this.roomSubscription = this.roomService.guardarRoomListener().subscribe(
              () => {
                this.dialogRef.closeAll();
                this.openSnackBar('Habitación guardada exitosamente.');
                console.log('Habitación guardada exitosamente.');
              },
              (error) => {
                console.error('Error al guardar la habitación:', error);
                this.openSnackBar('Error al guardar la habitación');
              }
            );
          }
        },
        (error) => {
          console.error('Error al obtener las habitaciones:', error);
          this.openSnackBar('Error al obtener las habitaciones');
        }
      );
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos correctamente.');
    }
  }


  // Snackbar for displaying error message
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: this.snackbarDuration * 1000
    });
    this.cerrarDialog();
  }


  cerrarDialog() {
    this.dialogRef.closeAll();
  }

  ngOnDestroy() {
    this.roomSubscription.unsubscribe();
  }
}
