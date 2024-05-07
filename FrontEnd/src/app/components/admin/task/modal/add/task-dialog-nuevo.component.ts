import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm, FormBuilder, Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { TaskService,  } from "../../../../services/task.service";
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { Task } from "../../../../models/task.model";
import { MaterialModule } from "../../../../material.module";


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
  users: any[] = []; // Aquí deberías tener la lista de usuarios obtenida del servidor
  rooms: any[] = []; // Aquí deberías tener la lista de habitaciones obtenida del servidor
  priorityOptions = [
    { label: 'Alta', value: 'alta' },
    { label: 'Media', value: 'media' },
    { label: 'Baja', value: 'baja' }
  ];

  constructor(private taskService: TaskService, private dialogRef: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      userId: ['', Validators.required],
      roomId: ['', Validators.required],
      priority: ['', Validators.required]
    });
/*     this.loadUsers();
    this.loadRooms(); */
  }
/*   loadUsers() {
    this.taskService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }
 */
/*   loadRooms(){
    this.taskService.getRooms().subscribe(
      rooms => {
        this.rooms = rooms;
      },
      error => {
        console.error('Error al cargar habitaciones:', error);
      }
    );
  } */
/*   guardarTarea(form: NgForm) {
    console.log('Add Task button clicked'); // Log agregado

    if (form.valid) {
      console.log('Formulario válido:', form.value);

      const tareaRequest: Task = {
        id: '', // Debes obtener este ID del servidor, si es un campo requerido
        room: {
          roomNumber: '', // Asumiendo que roomId es el id de la habitación
          floor: '', // Aquí puedes agregar el número del piso si es relevante
          type: '', // Debes obtener este tipo del servidor, si es un campo requerido
          status: '', // Debes obtener este estado del servidor, si es un campo requerido
          id: form.value.roomId, // Debes obtener este ID del servidor, si es un campo requerido
          createdDate: new Date() // Puedes establecer la fecha de creación aquí si es relevante
        },
        user: {
          name: '', // Debes obtener este nombre del servidor, si es un campo requerido
          surname: '', // Debes obtener este apellido del servidor, si es un campo requerido
          username: '', // Debes obtener este nombre de usuario del servidor, si es un campo requerido
          birthDate: new Date(), // Debes obtener esta fecha de nacimiento del servidor, si es un campo requerido
          password: '', // Debes obtener esta contraseña del servidor, si es un campo requerido
          email: '', // Debes obtener este correo electrónico del servidor, si es un campo requerido
          phoneNumber: '', // Debes obtener este número de teléfono del servidor, si es un campo requerido
          cp: '', // Debes obtener este código postal del servidor, si es un campo requerido
          city: '', // Debes obtener esta ciudad del servidor, si es un campo requerido
          id: form.value.userId, // Debes obtener este ID del servidor, si es un campo requerido
        },
        priority: form.value.priority, // Prioridad obtenida del formulario
        observations: form.value.observations, // Puedes agregar las observaciones aquí si es necesario
        createdDate: new Date() // Puedes establecer la fecha de creación aquí si es relevante
      };

      console.log('Enviando solicitud para guardar tarea:', tareaRequest);
      this.taskService.guardarTask(tareaRequest);

      this.taskSubscription = this.taskService.guardarTaskListener().subscribe(
        () => {
          this.dialogRef.closeAll();
          console.log('Tarea guardada exitosamente.');
          // Puedes agregar lógica adicional aquí si es necesario
        },
        error => {
          console.error('Error al guardar la tarea:', error);
          this.dialogRef.closeAll();
        }
      );
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos correctamente.');
    }
  } */




  cerrarDialog() {
      this.dialogRef.closeAll();
  }

  ngOnDestroy() {
      this.taskSubscription.unsubscribe();
  }
}
