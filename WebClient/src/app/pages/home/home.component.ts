import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ProductBoxComponent } from '../product-box/product-box.component';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, 
    RouterOutlet,
    MatButtonModule,
    LoginComponent,
    ProductBoxComponent,
    HeaderComponent
  
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
