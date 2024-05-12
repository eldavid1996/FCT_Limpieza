import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { SecurityService } from '../../../services/security.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private securityService: SecurityService) {
    this.getLoggedUser();
  }
  userData: User = {
    id: '',
    name: '',
    surname: '',
    email: '',
    dni: '',
    phoneNumber: '',
    birthDate: new Date(Date.now()),
    cp: '',
    city: '',
    roleAdmin: true,
    token: '',
    urlImage: '',
  };

  getLoggedUser() {
    this.securityService.getLoggedUser()?.subscribe(
      (response) => {
        this.userData = response;
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
}
