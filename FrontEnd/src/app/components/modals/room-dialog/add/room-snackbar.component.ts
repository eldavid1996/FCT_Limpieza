import { Component, Inject, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MaterialModule } from '../../../user-table/material.module';

@Component({
  selector: 'room-snackbar',
  templateUrl: 'room-snackbar.component.html',
  standalone: true,
  imports: [MaterialModule],
})
export class RoomSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
  // Set snackbar message in the constructor from data field
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
