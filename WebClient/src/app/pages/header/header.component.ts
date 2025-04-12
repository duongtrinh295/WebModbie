import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { Users } from '../../interfaces/users';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Category } from '../../interfaces/Category';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDetail: Users | null = null;
  fetchUserDetail: boolean = false;

  categories: Category[] = [];
  parentCategories: Category[] = [];
  childCategories: { [key: string]: Category[] } = {};
  openSubMenus: { [key: string]: boolean } = {};
  selectedParentId: string | null = null;

  authService = inject(AuthService);
  categoryService = inject(CategoryService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
      this.buildMenuStructure();
    });
    this.loadUserDetails();
  }

  buildMenuStructure() {
    this.parentCategories = this.categories.filter(cat => !cat.parent_id);
    this.childCategories = this.categories
      .filter(cat => cat.parent_id)
      .reduce((acc, cat) => {
        const parentId = cat.parent_id as string;
        if (!acc[parentId]) {
          acc[parentId] = [];
        }
        acc[parentId].push(cat);
        return acc;
      }, {} as { [key: string]: Category[] });
  }
  
  getChildCategories(parentId: string): Category[] {
    return this.childCategories[parentId] || [];
  }

  setSelectedParentId(parentId: string) {
    this.selectedParentId = parentId;
  }
  
  loadUserDetails(): void {
    try {
      this.authService.getUserInfo().subscribe(data => {
        this.userDetail = data;
        this.fetchUserDetail = true;
        this.updateUserName(data.userName);  // Update the username upon successful fetch
      }, error => {
        console.error('Failed to fetch user details', error);
        this.fetchUserDetail = false;
        this.updateUserName(null);  // Ensure username is reset or set to a default if there's an error
      });
    } catch (error) {
      console.error('Error retrieving token', error);
      this.fetchUserDetail = false;
      this.updateUserName(null);  // Handle exceptions by resetting the username or setting to a default
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  updateUserName(username: string | null): void {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
      userNameElement.textContent = username ? username : 'Đăng nhập';
    }
  }
}
