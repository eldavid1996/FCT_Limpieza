import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm, FormBuilder, Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { UserService } from "../../../../services/user.service";
import { MaterialModule } from "../../../user-table/material.module";
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { ToastrModule, ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-user-dialog-nuevo',
  standalone: true,
  templateUrl: 'user-dialog-nuevo.component.html',
  styleUrl: './user-dialog-nuevo.component.css',
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, ToastrModule]
})

export class UserDialogNuevoComponent implements OnInit, OnDestroy {

  userForm: FormGroup | any;
  userSubscription: Subscription = new Subscription();
  birthDate: any;
  passwordForm: FormGroup | any;

  constructor(private userService: UserService, private dialogRef: MatDialog, private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
      pc: ['', Validators.required],
      birthDate: ['', Validators.required],
      username: ['', Validators.required]
    });
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]]
    });

  }

  get password() {

    return this.passwordForm.get('password');
  }


  guardarUser(form: NgForm) {
    console.log('Add User button clicked'); // Log agregado

    if (form.valid) {
      console.log('Formulario válido:', form.value);

      const userRequest = {
        id: '',
        name: form.value.name,
        surname: form.value.surname,
        email: form.value.email,
        password: this.passwordForm.value.password,
        phoneNumber: form.value.phoneNumber,
        city: form.value.city,
        cp: form.value.cp,
        birthDate: form.value.birthDate,
        username: form.value.username
      };

      console.log('Enviando solicitud para guardar usuario:', userRequest);
      this.userService.guardarUser(userRequest);

      this.userSubscription = this.userService.guardarUserListener().subscribe(
        () => {
          this.dialogRef.closeAll();
          console.log('Usuario guardado exitosamente.');
          //this.toastr.success('Usuario añadido correctamente', 'Éxito');
        },
        error => {
          console.error('Error al guardar el usuario:', error);
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
    this.userSubscription.unsubscribe();
  }
}
