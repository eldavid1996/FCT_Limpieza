import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserTableComponent,UserProfileComponent],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent {
  title = 'FrontEnd'; // Varible used for tests only //
}
