import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { LoginComponent } from '../login/login.component';
import { ProductBoxComponent } from '../product-box/product-box.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, 
    MatButtonModule,
    NavBarComponent,
    LoginComponent,
    ProductBoxComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
