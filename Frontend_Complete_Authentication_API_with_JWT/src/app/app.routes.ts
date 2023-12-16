import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';
import { ResetPasswordComponent } from './features/user/reset-password/reset-password.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'api/user/reset/:userId/:token', component: ResetPasswordComponent },
];
