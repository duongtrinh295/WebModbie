import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule], // Include CommonModule in imports
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const student = params['student'] ? JSON.parse(params['student']) : null;
      if (student) {
        this.isEdit = true;
        this.form.patchValue(student);
      } else {
        this.isEdit = false;
        this.form.reset();
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.isEdit) {
        // Update student logic here
        console.log('Student updated:', this.form.value);
      } else {
        // Add student logic here
        console.log('Student added:', this.form.value);
      }
      this.router.navigate(['/']);
    }
  }
}
