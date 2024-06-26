import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { UserDetail } from '../../interfaces/user-detail';
import { Users } from '../../interfaces/users';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,
    RouterLink,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    CommonModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  userDetail: Users | null = null;
  fetchUserDetail: boolean = false;
  
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  constructor() {}

  ngOnInit(): void {
    try {
      this.authService.getUserInfo().subscribe(data => {
        this.userDetail = data;
        this.fetchUserDetail = true;
      }, error => {
        console.error('Failed to fetch user details', error);
        this.fetchUserDetail = false;
      });
    } catch (error) {
      console.error('Error retrieving token', error);
      this.fetchUserDetail = false;
    }
  }

  

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout = () =>{
    this.authService.logout();
    this.matSnackBar.open('Logout success', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
    });
    this.router.navigate(['/login']);
  }
}