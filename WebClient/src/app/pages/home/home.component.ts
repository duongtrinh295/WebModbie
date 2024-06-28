import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ProductBoxComponent } from '../product-box/product-box.component';
import { HeaderComponent } from '../header/header.component';
import { SlideComponent } from '../slide/slide.component';
import { ProductBoxPhuKienComponent } from '../product-box-phu-kien/product-box-phu-kien.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, 
    RouterOutlet,
    MatButtonModule,
    LoginComponent,
    ProductBoxComponent,
    HeaderComponent,
    SlideComponent,
    ProductBoxPhuKienComponent
  
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
