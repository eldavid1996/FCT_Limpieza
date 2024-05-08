import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { MaterialModule } from '../../../../../material.module';
import { RoomService } from '../../../../../services/room.service';
import { Room } from '../../../../../models/room.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insert-room-modal',
  standalone: true,
  templateUrl: 'insertRoomModal.component.html',
  styleUrl: './insertRoomModal.component.css',
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule],
})
export class InsertRoomModalComponent implements OnInit {
  roomForm: FormGroup | any;
  @Output() modalClosed = new EventEmitter<void>();

  constructor(
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  // Validators
  ngOnInit() {
    this.roomForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      floor: [''],
      type: [''],
      status: [''],
    });
  }

  // Try to insert a new room a get a toask with the response
  insertRoom() {
    const roomRequest: Room = {
      RoomNumber: this.roomForm.get('roomNumber')?.value,
      Floor: this.roomForm.get('floor')?.value,
      Type: this.roomForm.get('type')?.value,
      Status: this.roomForm.get('status')?.value,
    };
    this.roomService.insertRoom(roomRequest).subscribe({
      next: () => this.openSnackBar('Habitación añadida'),
      error: () =>
        this.openSnackBar('Error al añadir la habitación ¿Clave duplicada?'),
    });
    this.modalClosed.emit();
  }

  // Snackbar with the update password action result from the API
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', { duration: 3000 });
  }
}
