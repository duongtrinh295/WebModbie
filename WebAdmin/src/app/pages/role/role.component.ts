import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar , MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleCreateRequest } from '../../interfaces/role-create-request';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { Observable, of } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { Users } from '../../interfaces/users';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-role',
    standalone: true,
    templateUrl: './role.component.html',
    styleUrl: './role.component.css',
    imports: [RoleComponent,
        MatSelectModule,
        AsyncPipe,
        MatSnackBarModule,
        MatIconModule,
        ReactiveFormsModule,
        CommonModule ,
        MatFormFieldModule ,
        MatInputModule 
      ]
})
export class RoleComponent implements OnInit {
  roleForm: FormGroup;
  assignRoleForm: FormGroup;
  errorMessage = '';

  selectedUser: string = '';
  selectedRole: string = '';
  users: Users[] = [];
  currentPage = 1;
  roleService = inject(RoleService);
  userService = inject(UsersService);
  
  roles$ = this.roleService.getAllRoles();
  users$ = this.userService.getAllUsers(1)
  roleUser$ = this.roleService.getAllUserRoles();

  snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
  ) {
    this.roleForm = this.fb.group({
      nameRole: ['', Validators.required],
      roleCode: '111'  // default value for roleCode
    });

    this.assignRoleForm = this.fb.group({
      user: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAllRoles();
    this.loadAllUsers();
    this.loadAllRolesUser();
  }

  loadAllRolesUser(): void {
    this.roleUser$ = this.roleService.getAllUserRoles();
  }

  loadAllUsers(): void {
    this.userService.getAllUsers(1).subscribe(data => {
      this.users = data;
    });
  }

  loadAllRoles(): void {
    this.roles$ = this.roleService.getAllRoles();
  }

  trackByRoleId(index: number, role: any): string {
    return role.id;
  }

  createRole() {
    if (this.roleForm.valid) {
      const role: RoleCreateRequest = {
        nameRole: this.roleForm.get('nameRole')?.value,
        roleCode: this.roleForm.get('roleCode')?.value
      };

      this.roleService.createRole(role).subscribe({
        next: (response: { message: string }) => {
          this.snackBar.open('Role Created Successfully', 'Ok', {
            duration: 3000,
          });
          this.roleForm.reset({ nameRole: ''});  // Reset form with default roleCode
          this.loadAllRoles();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.errorMessage = error.error.detail || 'Validation failed';
          }
        },
      });
    }
  }

  assignRole(){
    this.roleService.assignRole(this.selectedUser, this.selectedRole)
    .subscribe({
      next: (response) =>{
        this.roleUser$ = this.roleService.getAllUserRoles();
        this.snackBar.open('Role Assign Successfully', 'Close',{
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) =>{
        this.snackBar.open(error.message, 'Close',{
          duration: 3000,
        });
      },      
    });
  }
}
