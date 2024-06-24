import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UsersComponent } from '../users/users.component';
import { DashboardComponent } from '../dashboard/dashboard.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, 
    MatButtonModule,
    SidebarComponent,
    NavbarComponent,
    UsersComponent,
    RouterOutlet,
    DashboardComponent
   
  ],
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '../../../assets/vendors/css/vendor.bundle.base.css',
    '../../../assets/vendors/font-awesome/css/font-awesome.min.css',
    '../../../assets/vendors/mdi/css/materialdesignicons.min.css',
  ]
})
export class HomeComponent {

}