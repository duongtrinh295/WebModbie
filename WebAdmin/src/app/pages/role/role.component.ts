import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar , MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleCreateRequest } from '../../interfaces/role-create-request';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';


@Component({
    selector: 'app-role',
    standalone: true,
    templateUrl: './role.component.html',
    styleUrl: './role.component.css',
    imports: [
        MatSelectModule,
        AsyncPipe,
        MatSnackBarModule,
        MatIconModule,
        ReactiveFormsModule
      ]
})
export class RoleComponent implements OnInit {
  roleForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private snackBar: MatSnackBar
  ) {
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required],
      roleCode: [{ value: '111', disabled: true }, Validators.required]
    });
  }

  ngOnInit() {}

  createRole() {
    if (this.roleForm.valid) {
      const role: RoleCreateRequest = {
        roleName: this.roleForm.get('roleName')?.value,
        roleCode: this.roleForm.get('roleCode')?.value
      };

      this.roleService.createRole(role).subscribe({
        next: (response: { message: string }) => {
          this.snackBar.open('Role Created Successfully', 'Ok', {
            duration: 3000,
          });
          this.roleForm.reset({ roleName: '', roleCode: '111' }); // Reset form with default roleCode
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.errorMessage = error.error.detail || 'Validation failed';
          }
        },
      });
    }
  }
}
