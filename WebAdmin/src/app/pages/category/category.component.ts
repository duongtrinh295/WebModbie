
import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-category',
  standalone: true,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [
    MatSelectModule,
    AsyncPipe,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink
  ]
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  errorMessage = '';
  categoriesWithParent$: Observable<any[]>;
  categories$: Observable<any[]>;
  snackBar = inject(MatSnackBar);
  categoryService = inject(CategoryService);
  constructor(
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      parent_id: ['']
    });
    this.categoriesWithParent$ = this.categoryService.getCategoriesWithParent();
    this.categories$ = this.categoryService.getAllCategories();
  }
  ngOnInit(): void {
    this.loadCategoriesWithParent();
    this.loadAllCategories();
  }
  loadCategoriesWithParent(): void {
    this.categoriesWithParent$ = this.categoryService.getCategoriesWithParent();
  }
  loadAllCategories(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }
  trackByCategoryId(index: number, category: any): string {
    return category.id;
  }
  addCategory() {
    if (this.categoryForm.valid) {
      const category = {
        name: this.categoryForm.get('name')?.value,
        parent_id: this.categoryForm.get('parent_id')?.value
      };
      this.categoryService.addCategory(category).subscribe({
        next: (response: { message: string }) => {
          this.snackBar.open('Category Created Successfully', 'Ok', {
            duration: 3000,
          });
          this.categoryForm.reset();
          this.loadCategoriesWithParent();
          this.loadAllCategories();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.errorMessage = error.error.detail || 'Validation failed';
          }
        },
      });
    }
  }
  deleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: (response: { message: string }) => {
        this.snackBar.open('Category Deleted Successfully', 'Ok', {
          duration: 3000,
        });
        this.loadAllCategories();
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open('Error deleting category', 'Ok', {
          duration: 3000,
        });
      }
    });
  }
}
