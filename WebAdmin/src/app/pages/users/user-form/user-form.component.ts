import { JsonPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { Users } from '../../../interfaces/users';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isEdit = false;
  private subscription: Subscription = new Subscription();
  private userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe(params => {
        const user = JSON.parse(params['user'] || '{}');
        if (user && Object.keys(user).length > 0) {
          this.isEdit = true;
          this.userId = user.userId; // Lưu trữ userId để sử dụng khi chỉnh sửa
          this.form.patchValue({
            userName: user.userName,
            email: user.email,
            password: '' // Clear the password field for security reasons
          });
        } else {
          this.isEdit = false;
          this.form.reset();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const user: Partial<Users> = {
        userId: this.userId,
        userName: this.form.value.userName,
        email: this.form.value.email,
        password: this.form.value.password
      };

      if (this.isEdit) {
        this.usersService.editUser(user as Users).subscribe(
          response => {
            console.log('User updated:', response);
            this.router.navigate(['/users']);
          },
          error => {
            console.error('Error updating user:', error);
          }
        );
      } else {
        // Add user logic here (implement this if necessary)
        console.log('User added:', user);
        this.router.navigate(['/users']);
      }
    }
  }
}
