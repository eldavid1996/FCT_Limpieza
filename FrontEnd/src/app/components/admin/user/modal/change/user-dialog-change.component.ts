import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm, FormBuilder, Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { UserService } from "../../../../../services/user.service";
import { MaterialModule } from "../../../../../material.module";



@Component({
  selector: 'app-user-dialog-change',
  standalone: true,
  templateUrl: 'user-dialog-change.component.html',
  styleUrl: './user-dialog-change.component.css',
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule]
})

export class UserDialogChangeComponent implements OnInit, OnDestroy {
  userForm: FormGroup | any;
  userSubscription: Subscription = new Subscription();
  birthDate: any;
  passwordForm: FormGroup | any;
  dniForm : FormGroup | any;
  editedUser: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private userService: UserService, private dialogRef: MatDialog, private formBuilder: FormBuilder,) {}

  ngOnInit() {
    this.editedUser = { ...this.data.user };

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
      pc: ['', Validators.required],
      birthDate: ['', Validators.required],
      username: ['', Validators.required],

    });
    this.dniForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/)]]
    });


  }

  get dni() {
    return this.dniForm.get('dni');
  }
  get password() {
    return this.passwordForm.get('password');
  }
  editarUser(form: NgForm) {
    if (form.valid) {
      const userRequest = {
        id: this.editedUser.id, // Utiliza el ID del usuario seleccionado
        name: form.value.name,
        surname: form.value.surname,
        email: form.value.email,
        phoneNumber: form.value.phoneNumber,
        city: form.value.city,
        cp: form.value.cp,
        birthDate: form.value.birthDate,
        username: form.value.username,
        roleAdmin: false,
        token: '',
        urlImage: '',
        dni: this.dniForm.value.dni
      };

      console.log('Enviando solicitud para editar usuario:', userRequest);
      this.userService.editarUser(userRequest);

      this.userSubscription = this.userService.editarUserListener().subscribe(
        () => {
          this.dialogRef.closeAll();
          console.log('Usuario editado exitosamente.');
          //this.toastr.success('Usuario añadido correctamente', 'Éxito');
        },
        error => {
          console.error('Error al editar el usuario:', error);
          this.dialogRef.closeAll();
        }
      );
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos correctamente.');
    }
  }
  cerrarEditar() {
    this.dialogRef.closeAll();
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
