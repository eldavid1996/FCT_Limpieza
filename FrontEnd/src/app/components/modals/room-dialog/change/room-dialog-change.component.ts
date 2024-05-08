import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../user-table/material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RoomService } from '../../../../services/room.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-room-dialog-change',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './room-dialog-change.component.html',
  styleUrl: './room-dialog-change.component.css'
})

export class RoomDialogChangeComponent implements OnInit, OnDestroy {
  roomForm: FormGroup | any;
  roomSubscription: Subscription = new Subscription();
  editedroom: any;
  form: FormGroup|any

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private roomService: RoomService, private dialogRef: MatDialog, private formBuilder: FormBuilder,private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      floor: ['', Validators.required],
      type: ['',Validators.required],
      status: ['',Validators.required]
    });
  }
  editarRoom(form: NgForm) {


    if (form.valid) {
      const roomRequest = {
        id:this.data.room.id,
        roomNumber:form.value.roomNumber,
        status:form.value.status,
        type:form.value.type,
        floor:form.value.floor
      };
      this.roomService.getAllRooms().subscribe( //Comprobamos si alguna de todas de las habitaciones tiene el mismo roomNumber
      (rooms) => {
        const existingRoom = rooms.find(room => room.roomNumber === roomRequest.roomNumber);
        if (existingRoom) {
          // Habitación con el mismo número ya existe
          this.openSnackBar('¡La habitación ya existe!');
        } else {
          // editar la nueva habitación
          this.roomService.editarRoom(roomRequest);
          this.roomSubscription = this.roomService.editarRoomListener().subscribe(
            () => {
              this.dialogRef.closeAll();
              this.openSnackBar('Habitación editada exitosamente.');
              console.log('Habitación editada exitosamente.');
            },
            (error) => {
              console.error('Error al editar la habitación:', error);
              this.openSnackBar('Error al editar la habitación');
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
    this.cerrarEditar();
  }
  cerrarEditar() {
    this.dialogRef.closeAll();
  }
  ngOnDestroy() {
    this.roomSubscription.unsubscribe();
  }

}
