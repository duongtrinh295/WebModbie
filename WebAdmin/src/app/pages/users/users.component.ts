import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink ,Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { Users } from '../../interfaces/users';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users: Users[] = [];
  currentPage = 1; // Trang hiện tại, có thể được cập nhật trong ứng dụng của bạn

  constructor(private router: Router,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    this.userService.getAllUsers(1).subscribe(data => {
      this.users = data;
    });
  }
  onAddMember(): void {
    this.router.navigate(['/userform'], { queryParams: { student: null } });
  }

  editUser(student: any): void {
    this.router.navigate(['/userform'], { queryParams: { student: JSON.stringify(student) } });
  }
 

}
