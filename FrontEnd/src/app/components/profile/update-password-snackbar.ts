import { Component, Inject, inject } from '@angular/core';
import { MaterialModule } from '../user-table/material.module';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'snack-bar-annotated-component-example',
  templateUrl: 'update-password-snackbar.html',
  standalone: true,
  imports: [MaterialModule],
})
export class UpdatePasswordSnackbar {
  snackBarRef = inject(MatSnackBarRef);
  // Set snackbar message in the constructor from data field
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
