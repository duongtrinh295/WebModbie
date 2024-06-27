import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Users } from '../../interfaces/users';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Users[] = [];
  currentPage = 1;
  keyword = new FormControl('');

  constructor(
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    this.keyword.valueChanges.pipe(
      debounceTime(300) // wait 300ms after the last event before emitting last event
    ).subscribe((searchTerm) => {
      if (searchTerm) {
        this.searchUsers(searchTerm);
      } else {
        this.loadUsers();
      }
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers(this.currentPage).subscribe(data => {
      this.users = data;
    });
  }

  searchUsers(keyword: string): void {
    this.userService.searchUsers(keyword, this.currentPage).subscribe(data => {
      this.users = data;
    });
  }

  onAddMember(): void {
    this.router.navigate(['/userform'], { queryParams: { user: null } });
  }

  editUser(user: Users): void {
    this.router.navigate(['/userform'], { queryParams: { user: JSON.stringify(user) } });
  }
}
