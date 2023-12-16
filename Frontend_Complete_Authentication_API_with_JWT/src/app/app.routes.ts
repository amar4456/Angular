import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';
import { ForgotComponent } from './features/user/forgot/forgot.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'api/user/reset/:userId/:token', component: ForgotComponent },
];
