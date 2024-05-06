import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomTableComponent } from './components/room-table/room-table.component';
import { CommonModule } from '@angular/common';
import { SecurityService } from './services/security.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { UserTableComponent } from './components/user-table/user-table.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    NavbarComponent,
    DashboardComponent,
    UserTableComponent,
    UserProfileComponent,
    RoomTableComponent,
  ],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css',
})
export class RootComponent implements OnInit {
  constructor(
    private router: Router,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    // Check if exist session token for load the account without login in any component
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('token')) {
        this.securityService.getLoggedUser();
      } else {
        // If there are no sesion, go to login
        this.router.navigate(['/']);
      }
    }
  }

  // Check if is login page for dont show navbar
  isLoginPage(): boolean {
    if (this.router.url === '/') {
      return true;
    } else {
      return false;
    }
  }
}
