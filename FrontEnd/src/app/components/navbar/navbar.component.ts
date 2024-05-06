import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../user-table/material.module';
import { CommonModule } from '@angular/common';
import { SecurityService } from '../../services/security.service';
import { clockComponent } from './clock.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    [MaterialModule, RouterModule, CommonModule, clockComponent, RouterOutlet],
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private securityService: SecurityService) {}

  logOut() {
    this.securityService.logout();
  }
}
