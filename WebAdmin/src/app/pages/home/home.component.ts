import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, 
    MatButtonModule

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