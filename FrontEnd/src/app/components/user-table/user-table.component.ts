import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './user.model';
import { UserService } from './user.service';
import { MaterialModule } from './material.module';
import { PaginationUser } from './paginationUser.model';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {

  totalLibros = 0;
  usersPorPagina = 2;
  paginaCombo = [1, 2, 5, 10];
  pagina = 1;
  sort = 'id';
  sortDirection = 'asc';
  filterValue: any = null;
  displayedColumns= ["id","name","email","phone"];

  dataSource =  new MatTableDataSource<User>();

  constructor(private userService: UserService){}
  ngOnInit(): void {
    this.dataSource.data = this.userService.getUsers();
  }

}
