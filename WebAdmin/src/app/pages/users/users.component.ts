import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Users } from '../../interfaces/users';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Users[] = [];
  currentPage = 1;

  constructor(
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers(this.currentPage).subscribe(data => {
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
