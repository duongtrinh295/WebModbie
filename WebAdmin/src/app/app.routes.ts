import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductComponent } from './pages/product/product.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { RoleComponent } from './pages/role/role.component';
import { ProductTypeComponent } from './pages/product-type/product-type.component';
import { ProductTypeDeleteComponent } from './pages/product-type/product-type-delete/product-type-delete.component';
import { ProductTypeEditComponent } from './pages/product-type/product-type-edit/product-type-edit.component';
import { CategoryComponent } from './pages/category/category.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path:'users',
                component: UsersComponent
            },
            {
                path:'product',
                component: ProductComponent
            },
            {
                path:'',
                component: DashboardComponent
            },
            {
                path:'roles',
                component: RoleComponent
            },
            {
                path:'userform',
                component: UserFormComponent
            },
            {
                path:'userform/:id',
                component: UserFormComponent
            },
            {
                path:'product-type',
                component: ProductTypeComponent
            },
            {
                path:'product-type-delete/:id',
                component: ProductTypeDeleteComponent
            },
            {
                path:'product-type-edit/:id',
                component: ProductTypeEditComponent
            },
            {
                path:'category',
                component: CategoryComponent
            },
        ]

    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'forget-password',
        component: ForgetPasswordComponent,
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent,
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
    },
    
];

