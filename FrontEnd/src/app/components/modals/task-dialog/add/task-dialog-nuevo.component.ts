import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm, FormBuilder, Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { TaskService,  } from "../../../../services/task.service";
import { MaterialModule } from "../../../user-table/material.module";
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { Task } from "../../../../models/task.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RoomService } from "../../../../services/room.service";


@Component({
    selector: 'app-task-dialog-nuevo',
    standalone: true,
    templateUrl: 'task-dialog-nuevo.component.html',
    styleUrl: './task-dialog-nuevo.component.css',
    imports: [CommonModule, FormsModule, MaterialModule,ReactiveFormsModule]
})

export class TaskDialogNuevoComponent implements OnInit, OnDestroy {

  taskForm: FormGroup | any;
  taskSubscription: Subscription = new Subscription();
  users: any[] = [];
  rooms: any[] = [];
  snackbarDuration = 5;
  priorityOptions = [
    { label: 'Alta', value: 'alta' },
    { label: 'Media', value: 'media' },
    { label: 'Baja', value: 'baja' }
  ];
  statusOptions = [
    { label: 'En Curso', value: 'enCurso' },
    { label: 'Terminada', value: 'terminada' },
    { label: 'Por Hacer', value: 'por hacer' }
  ];
  defaultStatus: string = 'Por Hacer';

  constructor(private taskService: TaskService,private roomService: RoomService, private dialogRef: MatDialog, private formBuilder: FormBuilder, private _snackbar: MatSnackBar) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      userId: ['', Validators.required],
      roomId: ['', Validators.required],
      priority: ['', Validators.required],
      observations: [''],
      status: ['']
    });
    this.loadUsers();
    this.loadRooms();
  }

  loadUsers() {
    this.taskService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  loadRooms() {
    this.taskService.getRooms().subscribe(
      rooms => {
        this.rooms = rooms;
      },
      error => {
        console.error('Error al cargar habitaciones:', error);
      }
    );
  }

  guardarTarea() {
    console.log('Add Task button clicked');
    console.log('Estado del formulario:', this.taskForm);

    if (this.taskForm.valid) {
      console.log('Formulario válido:', this.taskForm.value);

      // Busca el objeto Room correspondiente al ID seleccionado
      const selectedRoom = this.rooms.find(room => room.id === this.taskForm.value.roomId);

      // Busca el objeto User correspondiente al ID seleccionado
      const selectedUser = this.users.find(user => user.id === this.taskForm.value.userId);

      const tareaRequest: Task = {
        id:'',
        room: selectedRoom,
        priority: this.taskForm.value.priority,
        observations: this.taskForm.value.observations,
        status: this.taskForm.value.status,
        user: selectedUser
      };

      console.log('Enviando solicitud para guardar tarea:', tareaRequest);
      this.taskService.guardarTask(tareaRequest).subscribe(
        () => {
          this.openSnackBar('Tarea añadida exitosamente!');
          this.dialogRef.closeAll();
          console.log('Tarea guardada exitosamente.');
        },
        error => {
          console.error('Error al guardar la tarea:', error);
          this.openSnackBar('La habitación seleccionada ya esta asignada a una tarea');
          this.dialogRef.closeAll();
        }
      );
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos correctamente.');
    }
  }
  openSnackBar(message: string) {
    this._snackbar.open(message, 'Cerrar', {
      duration: this.snackbarDuration * 1000
    });
    this.dialogRef.closeAll();
  }

  cerrarDialog() {
    this.dialogRef.closeAll();
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }
}
