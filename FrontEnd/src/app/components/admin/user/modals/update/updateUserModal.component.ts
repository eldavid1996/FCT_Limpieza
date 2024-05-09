import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { MaterialModule } from '../../../../../material.module';
import { UserService } from '../../../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { InsertOrUpdateUser } from '../../../../../models/userUpdateOrInsert.model';
import { dniValidator } from '../insert/insertUser-validators';
import { SecurityService } from '../../../../../services/security.service';
import { User } from '../../../../../models/user.model';
import { UpdateUserPasswordModal } from './updateUserPasswordModal/updateUserPasswordModal.component';

@Component({
  selector: 'app-update-user-modal',
  standalone: true,
  templateUrl: 'updateUserModal.component.html',
  styleUrl: './updateUserModal.component.css',
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule],
})
export class UpdateUserModalComponent implements OnInit {
  userForm: FormGroup | any;
  @Output() modalClosed = new EventEmitter<void>();
  constructor(
    private securityService: SecurityService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateUserModalComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Validators
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, dniValidator]],
      roleAdmin: [false, Validators.required],
      phoneNumber: [''],
      birthDate: [''],
      city: [''],
      cp: [''],
      urlImage: [''],
    });
    this.userForm.get('name')?.setValue(this.data.user.name);
    this.userForm.get('surname')?.setValue(this.data.user.surname);
    this.userForm.get('email')?.setValue(this.data.user.email);
    this.userForm.get('dni')?.setValue(this.data.user.dni);
    this.userForm.get('roleAdmin')?.setValue(this.data.user.roleAdmin);
    this.userForm.get('phoneNumber')?.setValue(this.data.user.phoneNumber);
    this.userForm.get('birthDate')?.setValue(this.data.user.birthDate);
    this.userForm.get('city')?.setValue(this.data.user.city);
    this.userForm.get('cp')?.setValue(this.data.user.cp);
    this.userForm.get('urlImage')?.setValue(this.data.user.urlImage);
  }

  // Try to update the user with the new data
  updateUser(Id: string) {
    const userRequest: InsertOrUpdateUser = {
      Name: this.userForm.get('name')?.value,
      Surname: this.userForm.get('surname')?.value,
      Email: this.userForm.get('email')?.value,
      DNI: this.userForm.get('dni')?.value,
      PhoneNumber: this.userForm.get('phoneNumber')?.value,
      BirthDate: this.userForm.get('birthDate')?.value,
      CP: this.userForm.get('cp')?.value,
      City: this.userForm.get('city')?.value,
      RoleAdmin: this.userForm.get('roleAdmin')?.value,
      urlImage: '',
    };
    this.userService.updateUser(Id, userRequest).subscribe({
      next: () => this.openSnackBar('Usuario actualizado'),
      error: (error) => console.log(error),
    });
    this.modalClosed.emit();
  }

  // Snackbar with the update password action result from the API
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', { duration: 3000 });
  }

  // Used for dont show some options for the user logged (for example, he cant change him rol)
  getUserLoggedId(): string {
    return this.securityService.getUserLoggedId();
  }

  updateUserPasswordModal(user: User) {
    this.dialog.open(UpdateUserPasswordModal, {
      width: '400px',
      data: { user },
    });
  }
}
