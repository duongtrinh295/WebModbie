import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductypeService } from '../../../services/productype.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductType } from '../../../interfaces/product-type';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-type-edit',
  standalone: true,
  imports: [RouterLink,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  templateUrl: './product-type-edit.component.html',
  styleUrl: './product-type-edit.component.css'
})
export class ProductTypeEditComponent implements OnInit {
  productTypeId!: string;
  editForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productTypeService: ProductypeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productTypeId = this.route.snapshot.paramMap.get('id')!;
    this.editForm = this.fb.group({
      tag: ['', Validators.required]
    });
    // Optionally load existing data here
    this.loadProductTypeData();
  }

  loadProductTypeData(): void {
    this.productTypeService.getProductTypeById(this.productTypeId).subscribe({
      next: (data) => {
        this.editForm.patchValue({
          tag: data.tag
        });
      },
      error: (error) => {
        this.snackBar.open('An error occurred: ' + error.error.message, 'OK', { duration: 3000 });
      }
    });
  }

  editProductType(): void {
    if (this.editForm.valid) {
      const updatedProductType = this.editForm.value;

      this.productTypeService.updateProductType(this.productTypeId, updatedProductType).subscribe({
        next: () => {
          this.snackBar.open('Product type updated successfully', 'OK', { duration: 3000 });
          this.router.navigate(['/product-type']); // Navigate back to the list page after successful update
        },
        error: (error: { error: { message: string; }; }) => {
          this.snackBar.open('An error occurred: ' + error.error.message, 'OK', { duration: 3000 });
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/product-type']); // Navigate back to the list page if user cancels
  }
}
