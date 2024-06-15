import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
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
