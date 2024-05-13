import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { SecurityService } from '../../../services/security.service';
import { User } from '../../../models/user.model';
import { NotificationService } from '../../../services/notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  notifications: string[] = [];
  private notificationSubscription: Subscription;

  constructor(private securityService: SecurityService,private notificationService: NotificationService) {
    this.getLoggedUser();
    this.notificationSubscription = this.notificationService.notifications$.subscribe(notification => {
      this.notifications.push(notification);
    });
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
