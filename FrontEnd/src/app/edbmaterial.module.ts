import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatSidenavModule, MatToolbarModule,
    MatListModule, MatCardModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatDialogModule, MatSelectModule, MatDatepickerModule,MatNativeDateModule,MatSort,    ToastrModule.forRoot() // Agrega ToastrModule.forRoot() aquí
  ],
  exports: [MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatSidenavModule, MatToolbarModule,
    MatListModule, MatCardModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatDialogModule, MatSelectModule, MatDatepickerModule,MatNativeDateModule,MatSort]
})


export class MaterialModule { }
