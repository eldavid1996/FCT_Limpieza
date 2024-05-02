import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm, FormBuilder, Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { TaskService,  } from "../../../../services/task.service";
import { MaterialModule } from "../../../user-table/material.module";
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule


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
  birthDate: any;

  constructor(private taskService: TaskService, private dialogRef: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.taskForm = this.formBuilder.group({
          name: ['', Validators.required],
          surname: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
          phoneNumber: ['', Validators.required],
          city: ['', Validators.required],
          pc: ['', Validators.required],
          birthDate: ['', Validators.required],
          taskname: ['', Validators.required]
      });
  }
  checkPasswordStrength(control: FormControl) {
    const password = control.value;
    console.log('Password being validated:', password); // Agregar para depuración
    const strongRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    if (!strongRegex.test(password)) {
        console.log('Weak password detected.'); // Agregar para depuración
        return { weakPassword: true };
    } else {
        console.log('Strong password detected.'); // Agregar para depuración
        return null;
    }
}

  guardarTask(form: NgForm) {
      console.log('Add task button clicked'); // Log agregado

      if (form.valid) {
          console.log('Formulario válido:', form.value);

          const taskRequest = {
              id: '',

          };

          console.log('Enviando solicitud para guardar tarea:', taskRequest);
          this.taskService.guardarTask(taskRequest);

          this.taskSubscription = this.taskService.guardarTaskListener().subscribe(
              () => {
                  this.dialogRef.closeAll();
                  console.log('Tarea guardado exitosamente.');
              },
              error => {
                  console.error('Error al guardar el tarea:', error);
                  this.dialogRef.closeAll();
              }
          );
      } else {
          console.log('Formulario inválido. Por favor, complete todos los campos correctamente.');
      }
  }

  cerrarDialog() {
      this.dialogRef.closeAll();
  }

  ngOnDestroy() {
      this.taskSubscription.unsubscribe();
  }
}
