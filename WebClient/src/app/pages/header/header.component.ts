import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Users } from '../../interfaces/users';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
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
        this.updateUserName(data.userName); // Call to update the username on successful fetch
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

  updateUserName(username: string): void {
    // Assuming you have an element with the id 'userName' to display the username
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
      userNameElement.textContent = username;
    }
  }
}