import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomTableComponent } from './components/room-table/room-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserTableComponent,UserProfileComponent,NavbarComponent,DashboardComponent,RoomTableComponent],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent {
  title = 'FrontEnd'; 
  
}
