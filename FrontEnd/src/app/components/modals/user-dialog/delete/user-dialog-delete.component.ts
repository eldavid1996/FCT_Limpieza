import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { UserService } from "../../../../services/user.service";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../../user-table/material.module";
import { User } from "../../../../models/user.model";

@Component({
  selector: 'app-user-dialog-delete',
  standalone: true,
  templateUrl: 'user-dialog-delete.component.html',
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule],
  styleUrls: ['./user-dialog-delete.component.css']
})
export class UserDialogDeleteComponent implements OnInit, OnDestroy {
  userSubscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit() {
    
  }

  confirmDelete() {
    const userId = this.data.user.id;
    this.userService.eliminarUser(userId).subscribe(
      () => {
        this.dialogRef.closeAll();
        console.log('Usuario eliminado exitosamente.');
        //this.toastr.success('Usuario eliminado correctamente', 'Éxito');
      },
      error => {
        console.error('Error al eliminar el usuario:', error);
        this.dialogRef.closeAll();
      }
    );
  }

  cancelDelete() {
    this.dialogRef.closeAll();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
